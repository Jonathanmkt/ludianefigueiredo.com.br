import type { Transition, Variants } from "framer-motion";

/* ===========================================================================
   O sistema de movimento do site — a fonte única dos tempos e das curvas.

   Tudo aqui saiu do dossiê `2026-08-19-sistema-de-movimento-framer-motion-site-
   premium.md` (cópia em `estudos/`), levantado contra fonte oficial: tokens do
   Material Design 3, IBM Carbon, Apple HIG e a prática documentada do Linear e
   do Emil Kowalski. Os números NÃO são gosto; cada um tem procedência.

   ⚠️ A régua que atravessa tudo:
     micro-interação      100–150 ms
     componente de UI     150–300 ms
     entrada de bloco     300–500 ms
     acima disso          a interface começa a parecer pesada

   E a curva nunca é `ease-in` nem as nativas do CSS: entrada desacelera
   (`ease-out`/`decelerate`), porque é isso que lê como resposta.
   =========================================================================== */

/** Durações, em segundos (a unidade do Framer Motion). */
export const TEMPO = {
  /** Hover, foco, troca de cor. Material `short3`. */
  micro: 0.15,
  /** Estado de componente: cabeçalho que muda ao rolar. Material `short4`. */
  ui: 0.2,
  /** Entrada de bloco de conteúdo. Material `medium2`. */
  bloco: 0.3,
  /** Entrada de cartão e de imagem — elemento maior pede mais tempo. */
  grande: 0.4,
} as const;

/* As curvas, em coordenadas de Bézier.
   `padrao` e `enfatica` são tokens publicados do Material 3; `entrada` é o
   `entrance` do IBM Carbon, para o que chega à tela. */
export const CURVA = {
  padrao: [0.2, 0, 0, 1],
  entrada: [0, 0, 0.25, 1],
  enfatica: [0.05, 0.7, 0.1, 1],
} as const;

/** Deslocamento de entrada, em pixels.
 *  ⚠️ Nenhuma fonte oficial publica esse número — é a prática convergente
 *  (8–24px, nunca acima de ~40). Quanto maior o bloco, mais a entrada se
 *  aproxima de puro esmaecer. */
export const DESLOCA = { pequeno: 8, medio: 12, cartao: 16 } as const;

/** Escalonamento entre irmãos.
 *  ⚠️ Teto prático de 6 a 8 itens: acima disso o atraso acumulado passa de
 *  400 ms e o visitante deixa de ler coreografia e começa a esperar. */
export const CASCATA = 0.06;

/** A transição de entrada padrão de um bloco. */
export const entrada = (duracao: number = TEMPO.bloco, atraso = 0): Transition => ({
  duration: duracao,
  ease: CURVA.entrada,
  delay: atraso,
});

/** Mola crítica — sem quique. Para o que responde a gesto contínuo.
 *  Quique elástico é anti-padrão em UI formal; fica reservado a feedback lúdico
 *  deliberado, que não é o caso deste site. */
export const mola: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

/**
 * As variantes de entrada de um bloco.
 *
 * ⚠️ Com movimento reduzido a animação NÃO é removida — ela é TROCADA por
 * esmaecer puro, com metade da duração e sem cascata. A norma (WCAG 2.1,
 * entendimento do 2.3.3) pede alternativa, não ausência: o objetivo continua
 * sendo comunicar que algo mudou.
 */
export const revelacao = (
  semMovimento: boolean,
  deslocamento: number = DESLOCA.medio,
  duracao: number = TEMPO.bloco
): Variants => ({
  parado: { opacity: 0, y: semMovimento ? 0 : deslocamento },
  visivel: {
    opacity: 1,
    y: 0,
    transition: {
      duration: semMovimento ? duracao / 2 : duracao,
      ease: CURVA.entrada,
    },
  },
});

/** Container que escalona os filhos. Sem cascata quando o movimento é reduzido. */
export const cascata = (semMovimento: boolean, atrasoInicial = 0): Variants => ({
  parado: {},
  visivel: {
    transition: {
      staggerChildren: semMovimento ? 0 : CASCATA,
      delayChildren: atrasoInicial,
    },
  },
});

/** A janela de observação da rolagem: entra uma vez, e termina com o bloco
 *  confortavelmente na tela em vez de no fio da dobra. */
export const JANELA = { once: true, margin: "0px 0px -12% 0px" } as const;
