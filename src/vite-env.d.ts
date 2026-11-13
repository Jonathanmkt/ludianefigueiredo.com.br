/// <reference types="vite/client" />

/** Gerado pelo plugin `scripts/vite-textos.mjs`: minutos de leitura de cada texto, por slug. */
declare module "virtual:textos-tempos" {
  export const TEMPOS: Record<string, number>;
}

/** Um texto "Para os pais" já lido e convertido (ver `scripts/texto-md.mjs`). */
declare module "*.md?texto" {
  const texto: import("@/lib/textos").TextoLido;
  export default texto;
}
