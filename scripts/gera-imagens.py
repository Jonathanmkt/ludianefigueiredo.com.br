"""Gera as imagens do site a partir dos MESTRES versionados em scripts/marca/.

  scripts/marca/logo-lf.path           o monograma "lf" em vetor (caminho SVG, 'M..Z' + centro)
  scripts/marca/ludiane-hero-origem.jpg a foto do ensaio de 09/11/2026 (1000x1316)

Saidas (public/):
  ludiane-hero.webp        foto do heroi, 960 px de largura
  marca-ludiane.svg        o monograma dourado em selo creme — favicon
  marca-ludiane.png        512x512, o 'apple-touch-icon' do iOS (nao aceita SVG)
  og-ludiane.png           1200x630, o card que WhatsApp e redes mostram ao compartilhar

Trocou a marca ou a foto? Substitua o mestre e rode:  python scripts/gera-imagens.py
"""
import io
import re
import sys
import urllib.request
from pathlib import Path

import fitz  # PyMuPDF — rasteriza o SVG
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
MARCA = RAIZ / "scripts" / "marca"
PUBLIC = RAIZ / "public"
OURO = "#B99A62"
CREME = "#F3EEE2"
CARVAO = "#33352F"
CORM = "https://raw.githubusercontent.com/google/fonts/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf"


def monograma():
    d, centro = (MARCA / "logo-lf.path").read_text().strip().split("\n")[:2]
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", d)]
    xs, ys = nums[0::2], nums[1::2]
    return d, (min(xs), min(ys), max(xs), max(ys))


def svg_selo(d, bb, tam=512, borda=0.0):
    x0, y0, x1, y1 = bb
    w, h = x1 - x0, y1 - y0
    lado = max(w, h) * 1.55
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cx - lado/2:.1f} {cy - lado/2:.1f} {lado:.1f} {lado:.1f}" width="{tam}" height="{tam}">'
        f'<rect x="{cx - lado/2:.1f}" y="{cy - lado/2:.1f}" width="{lado:.1f}" height="{lado:.1f}" rx="{lado*0.18:.1f}" fill="{CREME}"/>'
        f'<path d="{d}" fill="{OURO}" fill-rule="evenodd"/></svg>'
    )


def raster(svg: str, largura: int, altura: int) -> Image.Image:
    doc = fitz.open(stream=svg.encode(), filetype="svg")
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(largura / doc[0].rect.width, altura / doc[0].rect.height), alpha=True)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")


def fonte_cormorant(peso: int, tam: int) -> ImageFont.FreeTypeFont:
    cache = RAIZ / "scripts" / "fonte"
    cache.mkdir(exist_ok=True)
    ttf = cache / f"CormorantGaramond-{peso}.ttf"
    if not ttf.exists():
        req = urllib.request.Request(CORM, headers={"User-Agent": "Mozilla/5.0"})
        var = TTFont(io.BytesIO(urllib.request.urlopen(req, timeout=60).read()))
        instancer.instantiateVariableFont(var, {"wght": peso}).save(ttf)
    return ImageFont.truetype(str(ttf), tam)


def main() -> int:
    PUBLIC.mkdir(exist_ok=True)
    d, bb = monograma()

    # --- foto do heroi
    foto = Image.open(MARCA / "ludiane-hero-origem.jpg").convert("RGB")
    foto = foto.resize((960, round(960 * foto.height / foto.width)), Image.LANCZOS)
    foto.save(PUBLIC / "ludiane-hero.webp", "WEBP", quality=82, method=6)

    # --- favicon e apple-touch-icon
    svg = svg_selo(d, bb)
    (PUBLIC / "marca-ludiane.svg").write_text(svg, encoding="utf-8")
    raster(svg, 512, 512).save(PUBLIC / "marca-ludiane.png")

    # --- card de compartilhamento 1200x630
    og = Image.new("RGB", (1200, 630), CREME)
    dr = ImageDraw.Draw(og)
    x0, y0, x1, y1 = bb
    larg = 540
    alt = round(larg * (y1 - y0) / (x1 - x0))
    mono = raster(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:.1f} {y0:.1f} {x1-x0:.1f} {y1-y0:.1f}" width="{larg}" height="{alt}"><path d="{d}" fill="{OURO}" fill-rule="evenodd"/></svg>',
        larg, alt,
    )
    og.paste(mono, (60, 90), mono)
    nome = fonte_cormorant(400, 64)
    dr.text((66, 392), "Ludiane Figueiredo", font=nome, fill=CARVAO)
    sub = fonte_cormorant(500, 30)
    dr.text((68, 486), "P S I C Ó L O G A   ·   C R P  0 5 / 5 6 2 6 4", font=sub, fill="#8A6B33")
    fo = foto.resize((500, round(500 * foto.height / foto.width)), Image.LANCZOS).crop((0, 0, 500, 630))
    mascara = Image.new("L", (500, 630), 255)
    md = ImageDraw.Draw(mascara)
    for i in range(140):  # esmaece so a borda esquerda da foto no creme
        md.line([(i, 0), (i, 630)], fill=int(255 * i / 140))
    og.paste(fo, (700, 0), mascara)
    og.save(PUBLIC / "og-ludiane.png", optimize=True)
    for f in ("ludiane-hero.webp", "marca-ludiane.svg", "marca-ludiane.png", "og-ludiane.png"):
        print(f, f"{(PUBLIC / f).stat().st_size / 1024:.1f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
