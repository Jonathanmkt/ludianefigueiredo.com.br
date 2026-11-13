import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DESLOCA, JANELA, TEMPO, revelacao } from "@/lib/movimento";

/* ===========================================================================
   Revela — o bloco que entra ao chegar à vista, uma vez só.

   Os tempos e as curvas vêm de `lib/movimento`, que é a fonte única do sistema.
   Aqui só se escolhe QUAL gesto cada tipo de bloco recebe — e essa escolha
   segue a tabela de recomendação do dossiê:

     texto/bloco   esmaece subindo 12px em 300 ms
     cartão        esmaece subindo 16px em 400 ms
     imagem        esmaece SEM deslocamento, em 400 ms
     rodapé        esmaece sem deslocamento, em 300 ms

   ⚠️ Imagem não desliza. Elemento grande em movimento disputa a atenção com o
   texto ao lado e, quando é muito grande, vira gatilho vestibular — a Apple
   nomeia "objeto grande voando" como desconforto, não como estilo.

   ⚠️ Movimento reduzido TROCA o gesto, não o remove: vira esmaecer puro, com
   metade da duração e sem cascata. A norma pede alternativa, não ausência.
   =========================================================================== */

type Gesto = "texto" | "cartao" | "imagem" | "discreto";

type Props = {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos, para irmãos entrarem em cascata. */
  atraso?: number;
  gesto?: Gesto;
  /** Tag renderizada — o que a semântica pedir. */
  como?: "div" | "section" | "article" | "header" | "footer" | "li";
};

const GESTOS: Record<Gesto, { desloca: number; duracao: number }> = {
  texto: { desloca: DESLOCA.medio, duracao: TEMPO.bloco },
  cartao: { desloca: DESLOCA.cartao, duracao: TEMPO.grande },
  imagem: { desloca: 0, duracao: TEMPO.grande },
  discreto: { desloca: 0, duracao: TEMPO.bloco },
};

const Revela = ({
  children,
  className,
  atraso = 0,
  gesto = "texto",
  como = "div",
}: Props) => {
  const semMovimento = useReducedMotion() ?? false;
  const Tag = m[como];
  const { desloca, duracao } = GESTOS[gesto];

  return (
    <Tag
      className={className}
      data-revela=""
      variants={revelacao(semMovimento, desloca, duracao)}
      initial="parado"
      whileInView="visivel"
      viewport={JANELA}
      transition={{ delay: semMovimento ? 0 : atraso }}
    >
      {children}
    </Tag>
  );
};

export default Revela;
