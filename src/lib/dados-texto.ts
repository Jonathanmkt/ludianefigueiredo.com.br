import { createContext } from "react";

export type Fonte = { instituicao: string; titulo: string; url: string; ano?: number | string };

/**
 * O que a página de um texto "Para os pais" recebe do build (corpo já em HTML, sumário, fontes, relacionados).
 *
 * ⚠️ Isto NUNCA fica no JavaScript do navegador. O `prerender.mjs` grava estes dados num
 * `<script type="application/json" id="dados-texto">` dentro de cada HTML, e o `main.tsx` os lê
 * dali para hidratar. Assim o corpo dos 12 textos não engorda o bundle da home.
 */
export type DadosTexto = {
  html: string;
  sumario: { id: string; pergunta: string }[];
  minutos: number;
  fontes: Fonte[];
  relacionados: { slug: string; h1: string }[];
};

export const DadosTextoContext = createContext<DadosTexto | null>(null);
