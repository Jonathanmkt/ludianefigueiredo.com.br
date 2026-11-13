/* ===========================================================================
   Plugin do Vite: transforma os `.md` de `src/conteudo/para-os-pais/` em módulos.

   - `import x from "./arquivo.md?texto"`  → { slug, titulo, ..., html, sumario, minutos }
   - `virtual:textos-tempos`              → { [slug]: minutos de leitura } — só números,
                                            é o único dado dos textos que a home e a lista
                                            carregam no JavaScript

   ⚠️ O corpo dos textos NUNCA entra no JavaScript do navegador: só o build SSR
   (`entry-server.tsx`) e o servidor de desenvolvimento importam `?texto`.
   =========================================================================== */

import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { lerTexto } from "./texto-md.mjs";

const VIRTUAL = "virtual:textos-tempos";
const RESOLVIDO = "\0" + VIRTUAL;

export default function textosParaOsPais({ pasta }) {
  const arquivos = () =>
    readdirSync(pasta).filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "LEIAME.md");

  return {
    name: "textos-para-os-pais",
    resolveId(id) {
      if (id === VIRTUAL) return RESOLVIDO;
    },
    load(id) {
      if (id === RESOLVIDO) {
        const tempos = {};
        for (const f of arquivos()) {
          const slug = basename(f, ".md");
          tempos[slug] = lerTexto(readFileSync(join(pasta, f), "utf8"), f, slug).minutos;
        }
        return `export const TEMPOS = ${JSON.stringify(tempos)};`;
      }
      const m = id.match(/([^/\\]+)\.md\?texto$/);
      if (m) {
        const arquivo = id.split("?")[0];
        this.addWatchFile(arquivo);
        return `export default ${JSON.stringify(lerTexto(readFileSync(arquivo, "utf8"), basename(arquivo), m[1]))};`;
      }
    },
  };
}
