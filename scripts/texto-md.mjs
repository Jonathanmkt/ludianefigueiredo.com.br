/* ===========================================================================
   Lê um texto "Para os pais" em Markdown e o devolve como dados + HTML.

   Roda SÓ no build (Node): é chamado pelo plugin de `scripts/vite-textos.mjs`.
   `marked` e `js-yaml` são devDependencies e nunca entram no JavaScript do
   navegador — o que o navegador recebe é o HTML já pronto.

   O formato do arquivo está em `src/conteudo/para-os-pais/LEIAME.md`.
   Aqui moram as regras que o build FAZ CUMPRIR: quem escreve um texto que viola
   uma delas vê o erro, com o nome do arquivo, em vez de publicar sem perceber.
   =========================================================================== */

import * as yaml from "js-yaml";
import { Marked } from "marked";

export const GRUPOS = ["Para começar", "Emoções", "Escola", "Em casa", "Terapia"];

const CAMPOS = ["titulo", "descricao", "h1", "ref", "grupo", "atualizadaEm", "publicada", "fontes", "relacionados"];

/** O que não pode aparecer no corpo (Res. CFP 3/2007, arts. 53-58, e o parecer do Jurídico de 13/11/2026). */
const PROIBIDO = [
  [/R\$/i, "preço"],
  [/gr[áa]tis/i, '"grátis"'],
  [/desconto/i, "desconto"],
  [/especialista em/i, '"especialista em"'],
  [/depoimento/i, "depoimento"],
  [/\ba melhor\b/i, '"a melhor"'],
  [/\bgarant(ia|imos|ido|e)\b/i, "garantia / promessa de resultado"],
  [/\bcura\b/i, '"cura"'],
  [/plataforma de relat[óo]rios/i, "a plataforma de relatórios"],
];

/** `{ dados, ... }` ou lança Error com `arquivo` na mensagem. */
export function lerTexto(conteudo, arquivo, slug) {
  const falha = (msg) => {
    throw new Error(`[para-os-pais] ${arquivo}: ${msg}`);
  };

  const m = conteudo.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) falha("falta o front matter (o arquivo precisa começar com uma linha `---`).");

  let meta;
  try {
    // JSON_SCHEMA: a data 2026-11-13 continua texto (o YAML padrão a transformaria em Date).
    meta = yaml.load(m[1], { schema: yaml.JSON_SCHEMA });
  } catch (e) {
    falha(`front matter inválido: ${e.message}`);
  }
  if (!meta || typeof meta !== "object") falha("front matter vazio.");

  for (const k of Object.keys(meta)) if (!CAMPOS.includes(k)) falha(`campo desconhecido no front matter: "${k}".`);
  for (const k of CAMPOS) if (!(k in meta)) falha(`falta o campo "${k}" no front matter.`);

  for (const k of ["titulo", "descricao", "h1", "ref", "grupo", "atualizadaEm"]) {
    if (typeof meta[k] !== "string" || !meta[k].trim()) falha(`"${k}" precisa ser um texto não vazio.`);
  }
  if (meta.descricao.length > 155) falha(`"descricao" tem ${meta.descricao.length} caracteres; o máximo é 155.`);
  if (!/^A\d+$/.test(meta.ref)) falha(`"ref" precisa ser A1, A2… (código neutro) — veio "${meta.ref}".`);
  if (!GRUPOS.includes(meta.grupo)) falha(`"grupo" precisa ser um de: ${GRUPOS.join(" · ")}.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.atualizadaEm) || Number.isNaN(Date.parse(meta.atualizadaEm))) {
    falha('"atualizadaEm" precisa ser uma data AAAA-MM-DD.');
  }
  if (typeof meta.publicada !== "boolean") falha('"publicada" precisa ser true ou false (sem aspas).');
  if (!Array.isArray(meta.fontes)) falha('"fontes" precisa ser uma lista (pode ser vazia enquanto for rascunho).');
  if (!Array.isArray(meta.relacionados) || meta.relacionados.some((r) => typeof r !== "string")) {
    falha('"relacionados" precisa ser uma lista de slugs (pode ser vazia).');
  }
  if (meta.relacionados.includes(slug)) falha('"relacionados" não pode conter o próprio texto.');

  meta.fontes.forEach((f, i) => {
    if (!f || typeof f !== "object") falha(`fontes[${i}] precisa ter instituicao, titulo, url e ano.`);
    for (const k of ["instituicao", "titulo", "url"]) {
      if (typeof f[k] !== "string" || !f[k].trim()) falha(`fontes[${i}].${k} precisa ser um texto não vazio.`);
    }
    if (!/^https:\/\/[^\s]+$/.test(f.url)) falha(`fontes[${i}].url precisa começar com https://.`);
    if (f.ano !== undefined && !(typeof f.ano === "number" || (typeof f.ano === "string" && /^\d{4}$/.test(f.ano)))) {
      falha(`fontes[${i}].ano precisa ser um ano (ex.: 2024).`);
    }
    for (const k of Object.keys(f)) if (!["instituicao", "titulo", "url", "ano"].includes(k)) falha(`fontes[${i}]: campo "${k}" desconhecido.`);
  });

  const corpo = m[2];
  for (const [re, nome] of PROIBIDO) if (re.test(corpo)) falha(`o corpo contém ${nome}, que não pode aparecer em divulgação de psicólogo.`);

  const md = new Marked();
  const sumario = [];
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        if (depth === 2) {
          const id = `p${sumario.length + 1}`;
          sumario.push({ id, pergunta: tokens.map((t) => t.raw ?? t.text ?? "").join("").replace(/[*_`]/g, "").trim() });
          return `<h2 id="${id}">${html}</h2>\n`;
        }
        return `<h${depth}>${html}</h${depth}>\n`;
      },
      link({ href, tokens }) {
        const texto = this.parser.parseInline(tokens);
        const externo = /^https:\/\//.test(href);
        return `<a href="${href}"${externo ? ' target="_blank" rel="noopener noreferrer"' : ""}>${texto}</a>`;
      },
    },
  });

  const tokens = md.lexer(corpo);
  md.walkTokens(tokens, (t) => {
    if (t.type === "html") falha("o corpo tem HTML cru (`" + t.raw.trim().slice(0, 40) + "`). Use só Markdown.");
    if (t.type === "image") falha("imagem no corpo não é suportada (nenhum arquivo externo entra no site).");
    if (t.type === "heading" && t.depth === 1) falha("o corpo não pode ter H1 (`# `): o H1 vem do front matter.");
    if (t.type === "heading" && t.depth > 3) falha("use no máximo H2 (pergunta) e H3 no corpo.");
    if (t.type === "link" && !/^(https:\/\/|\/|#)/.test(t.href)) falha(`link inválido "${t.href}": use https://, um caminho / ou uma âncora #.`);
  });
  const html = md.parser(tokens);

  const palavras = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const minutos = Math.max(1, Math.ceil(palavras / 200));

  if (meta.publicada) {
    if (sumario.length === 0) falha("texto publicado precisa de ao menos um H2 (pergunta).");
    if (meta.fontes.length === 0) falha("texto publicado precisa de ao menos uma fonte.");
  }

  return { slug, ...meta, html, sumario, minutos, palavras };
}
