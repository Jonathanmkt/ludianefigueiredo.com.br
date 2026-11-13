/* ===========================================================================
   Pré-renderização — roda no fim do `npm run build`.

   Por que existe: o site é uma SPA (Vite + React), e o HTML que o Google recebe
   de uma SPA é um <div id="root"></div> vazio. Aqui cada rota ganha o HTML
   pronto, com H1, texto, <title>, description, canonical e JSON-LD próprios;
   o navegador hidrata esse HTML (`main.tsx`) e o resto segue como SPA.

   Passos (o `npm run build` faz os dois primeiros):
     1. `vite build`                      → dist/ (o cliente; o index.html é o molde)
     2. `vite build --ssr entry-server`   → dist-ssr/ (o React rodando em Node)
     3. este script                       → dist/<rota>/index.html, 404.html, sitemap.xml

   ⚠️ Só as páginas `publicada: true` de `src/data/paginas.ts` viram arquivo.
   Zero dependência nova e zero requisição de rede: é `react-dom/server` + `fs`.
   =========================================================================== */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(raiz, "dist");
const ssr = join(raiz, "dist-ssr", "entry-server.js");

if (!existsSync(ssr)) throw new Error(`Falta ${ssr}: rode o build SSR antes (npm run build faz isso).`);

const { renderizar, cabecaDaRota, dadosDaRota, rotasIndexaveis, sitemapXml, ROTA_404 } = await import(pathToFileURL(ssr).href);

const molde = readFileSync(join(dist, "index.html"), "utf8");
const reCabeca = /<!--head-rota-->[\s\S]*?<!--\/head-rota-->/;
if (!reCabeca.test(molde) || !molde.includes("<!--app-->")) {
  throw new Error("O molde dist/index.html perdeu os marcadores <!--head-rota--> / <!--app-->.");
}

// Os dados do corpo dos textos vão num JSON inerte (`type="application/json"` não executa): o navegador os lê para hidratar.
const jsonDe = (dados) =>
  dados
    ? `<script type="application/json" id="dados-texto">${JSON.stringify(dados).replace(/</g, "\\u003c")}</script>`
    : "";

const montar = (rota) => {
  const dados = dadosDaRota(rota);
  return molde
    .replace(reCabeca, () => cabecaDaRota(rota))
    .replace("<!--app-->", () => renderizar(rota.caminho, dados))
    .replace("<!--dados-->", () => jsonDe(dados));
};

const gravar = (arquivo, conteudo) => {
  const destino = join(dist, arquivo);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, conteudo);
  console.log(`  prerender  ${arquivo}`);
};

const rotas = rotasIndexaveis();
for (const rota of rotas) gravar(rota.arquivo, montar(rota));

// 404.html: o GitHub Pages o serve, com status 404, para qualquer rota que não exista.
// ⚠️ Rota inexistente nunca vira 200: o Pages só devolve 200 para arquivo que existe em dist/.
gravar(ROTA_404.arquivo, montar(ROTA_404));

gravar("sitemap.xml", sitemapXml(rotas));
console.log(`✓ ${rotas.length} rota(s) pré-renderizada(s) + 404 + sitemap`);
