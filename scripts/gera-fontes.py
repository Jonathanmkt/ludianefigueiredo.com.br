"""Baixa e serve as fontes do site pelo PROPRIO dominio.

Por que existe: o site nao faz nenhuma requisicao a terceiro (nada de Google Fonts em
tempo de execucao) — fonte vinda de fora entrega o IP do visitante, e este site fala
com pais de adolescentes. Entao as fontes sao baixadas UMA vez, subconjuntadas para
o latim (pt-BR) e gravadas em public/fontes/ como woff2.

Fontes (todas SIL OFL, repositorio google/fonts):
  Cormorant Garamond (variavel, 300-700)  titulos  — a mesma do cartao de visita
  Karla (variavel, 300-700)               corpo
  Parisienne                              acento manuscrito (uso raro)

Uso:  python scripts/gera-fontes.py        (gera public/fontes/*.woff2 e src/fontes.css)
"""
import io
import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

RAIZ = Path(__file__).resolve().parent.parent
BASE = "https://raw.githubusercontent.com/google/fonts/main/ofl"
FONTES = [
    # (arquivo de saida, familia, url, peso/intervalo, estilo)
    ("cormorant-garamond", "Cormorant Garamond", f"{BASE}/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf", "300 700", "normal"),
    ("karla", "Karla", f"{BASE}/karla/Karla%5Bwght%5D.ttf", "300 700", "normal"),
    ("parisienne", "Parisienne", f"{BASE}/parisienne/Parisienne-Regular.ttf", "400", "normal"),
]
# latim basico + latim-1 + pontuacao tipografica: tudo o que o pt-BR usa
UNICODES = "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2015,U+2018-201E,U+2022,U+2026,U+2030,U+2039-203A,U+20AC,U+2122,U+2190-2193,U+2212"


def baixa(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def main() -> int:
    saida = RAIZ / "public" / "fontes"
    saida.mkdir(parents=True, exist_ok=True)
    css = ["/* GERADO por scripts/gera-fontes.py — nao edite a mao. */\n"]
    for nome, familia, url, peso, estilo in FONTES:
        dados = baixa(url)
        fonte = TTFont(io.BytesIO(dados))
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["*"]
        opts.notdef_outline = True
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=subset.parse_unicodes(UNICODES))
        sub.subset(fonte)
        fonte.flavor = "woff2"
        destino = saida / f"{nome}.woff2"
        fonte.save(destino)
        print(f"{destino.name}: {destino.stat().st_size / 1024:.1f} KB")
        css.append(
            "@font-face {\n"
            f"  font-family: '{familia}';\n  font-style: {estilo};\n  font-weight: {peso};\n  font-display: swap;\n"
            f"  src: url('/fontes/{nome}.woff2') format('woff2');\n}}\n"
        )
    (RAIZ / "src" / "fontes.css").write_text("\n".join(css), encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
