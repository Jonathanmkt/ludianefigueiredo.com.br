import { PAGINAS, paginasPublicadas } from "@/data/paginas";
import type { Pagina } from "@/data/paginas";
import type { DadosTexto, Fonte } from "@/lib/dados-texto";

/* ===========================================================================
   Os textos "Para os pais": lê os `.md`, confere com o registro e entrega os dados.

   ⚠️ Este módulo importa o CORPO dos textos. Só o build SSR (`entry-server.tsx`) e o
   `npm run dev` (import dinâmico em `PaginaTexto`, dentro de `import.meta.env.DEV`) o
   usam. Se algum dia ele aparecer no bundle do navegador, os 12 textos estão engordando
   o JavaScript da home — confira o tamanho no build.
   =========================================================================== */

export type TextoLido = {
  slug: string;
  titulo: string;
  descricao: string;
  h1: string;
  ref: string;
  grupo: string;
  atualizadaEm: string;
  publicada: boolean;
  fontes: Fonte[];
  relacionados: string[];
  html: string;
  sumario: { id: string; pergunta: string }[];
  minutos: number;
  palavras: number;
};

const arquivos = import.meta.glob<TextoLido>(
  ["../conteudo/para-os-pais/*.md", "!../conteudo/para-os-pais/LEIAME.md", "!../conteudo/para-os-pais/_*.md"],
  { query: "?texto", import: "default", eager: true },
);

const PORSLUG: Record<string, TextoLido> = {};
for (const [caminho, texto] of Object.entries(arquivos)) {
  PORSLUG[caminho.split("/").pop()!.replace(/\.md$/, "")] = texto;
}

const CAMPOS_IGUAIS = ["titulo", "descricao", "h1", "ref", "grupo", "atualizadaEm", "publicada"] as const;

/** Falha o build se um `.md` e o registro (`paginas.ts`) discordam, ou se falta o `.md` de uma página publicada. */
export const verificarTextos = (): void => {
  const erros: string[] = [];
  for (const [slug, t] of Object.entries(PORSLUG)) {
    const p = PAGINAS.find((x) => x.slug === slug);
    if (!p) {
      erros.push(`${slug}.md não tem entrada em src/data/paginas.ts`);
      continue;
    }
    for (const c of CAMPOS_IGUAIS) {
      if (t[c] !== p[c]) erros.push(`${slug}: "${c}" difere entre o .md (${JSON.stringify(t[c])}) e paginas.ts (${JSON.stringify(p[c])})`);
    }
    for (const r of t.relacionados) {
      if (!PAGINAS.some((x) => x.slug === r)) erros.push(`${slug}: relacionado "${r}" não existe em paginas.ts`);
    }
  }
  for (const p of paginasPublicadas()) {
    if (!PORSLUG[p.slug]) erros.push(`${p.slug}: publicada, mas falta src/conteudo/para-os-pais/${p.slug}.md`);
  }
  if (erros.length) throw new Error("[para-os-pais]\n  " + erros.join("\n  "));
};

/** Os dados de uma página. `soPublicados`: nos relacionados, só entram textos publicados (os outros não podem ser linkados). */
export const dadosDoTexto = (pagina: Pagina, soPublicados = true): DadosTexto | null => {
  const t = PORSLUG[pagina.slug];
  if (!t) return null;
  const relacionados = t.relacionados
    .map((s) => PAGINAS.find((p) => p.slug === s))
    .filter((p): p is Pagina => !!p && (!soPublicados || p.publicada))
    .map((p) => ({ slug: p.slug, h1: p.h1 }));
  return { html: t.html, sumario: t.sumario, minutos: t.minutos, fontes: t.fontes, relacionados };
};
