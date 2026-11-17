import { TEMPOS } from "virtual:textos-tempos";

/* ===========================================================================
   O registro de páginas — a fonte única do que existe no site além da home.

   A seção "Para os pais" tem uma página-lista (`/para-os-pais/`) e 12 textos
   (`/para-os-pais/<slug>/`). Aqui moram os METADADOS de cada texto; o CORPO é
   Markdown em `src/conteudo/para-os-pais/<slug>.md` (formato no LEIAME dessa pasta).

   ⚠️ SÓ `publicada: true` entra no build (HTML em dist/), no sitemap, no menu
   e nos links. Todos nascem `false`. O `.md` tem o seu próprio `publicada`, e o
   build FALHA se os dois discordarem — publicar é gesto deliberado, nos dois lugares.

   ⚠️ NINGUÉM muda `publicada` para `true` sem a aprovação da psicóloga. O texto
   clínico é dela: a casa não publica texto de saúde sem revisão (parecer do
   Jurídico de 13/11/2026 — *scaled content abuse* e Res. CFP 3/2007).

   ℹ️ Desde 13/11/2026 ela atende também presencialmente no Centro de Araruama (sala 514, Edifício Delfim Carvalho),
   então "Araruama" no título não exige mais a palavra "online" (era regra do Jurídico enquanto ela atendia só online).

   O que NÃO entra em página nenhuma: depoimento · antes e depois · número de
   pacientes · promessa de resultado · preço · desconto · "primeira sessão
   grátis" · "especialista em Psicologia Clínica" · plataforma de relatórios ·
   formação, título ou método (ainda não informados) · uma página por bairro.
   =========================================================================== */

/** A ordem dos grupos na página-lista. */
export const GRUPOS = ["Para começar", "Emoções", "Escola", "Em casa", "Terapia"] as const;
export type Grupo = (typeof GRUPOS)[number];

export type Pagina = {
  /** O caminho: `/para-os-pais/<slug>/`. Também é o nome do `.md`. */
  slug: string;
  /** O `<title>` da página (sem o sufixo, que o `seo.ts` acrescenta). ⚠️ CURTO de propósito (≤ ~38 caracteres): o Google corta o título em ~60; o H1 é que leva o texto longo. */
  titulo: string;
  /** Até 155 caracteres; sem promessa e sem medo. */
  descricao: string;
  h1: string;
  /** O código neutro de WhatsApp (`A1…An`). Nunca nomeia tema, sintoma nem condição. */
  ref: string;
  grupo: Grupo;
  publicada: boolean;
  /** AAAA-MM-DD. Vira o "atualizado em" da página e o `lastmod` do sitemap. */
  atualizadaEm: string;
};

/** A home não é uma `Pagina` (tem desenho próprio), mas o sitemap precisa da data dela. */
export const HOME = {
  ref: "A0",
  /** ⚠️ Mexeu no texto ou no desenho da home? Atualize esta data: ela é o `lastmod` do sitemap. */
  atualizadaEm: "2026-11-17",
} as const;

/** A página-lista e a faixa da home. Só existem com ao menos um texto publicado. */
export const LISTA = {
  rotulo: "Para os pais",
  /** Código neutro de WhatsApp da página-lista (a home é A0). */
  ref: "L0",
  caminho: "/para-os-pais/",
  titulo: "Para os pais de adolescentes",
  h1: "Para os pais de adolescentes",
  abertura:
    "Textos da psicóloga Ludiane Figueiredo, CRP 05/56264, para entender a adolescência e saber quando buscar ajuda.",
} as const;

/** A página de privacidade: curta, honesta, no rodapé de toda página. ⚠️ Mudou o que o site mede? Atualize o texto e esta data. */
export const PRIVACIDADE = {
  caminho: "/privacidade/",
  rotulo: "Privacidade",
  titulo: "Privacidade",
  h1: "Privacidade",
  descricao: "O que o site de Ludiane Figueiredo, psicóloga, mede, o que o Google recebe e como falar sobre isso.",
  ref: "P0",
  atualizadaEm: "2026-11-16",
} as const;

const NASCE = { publicada: true, atualizadaEm: "2026-11-13" } as const;

export const PAGINAS: readonly Pagina[] = [
  {
    ...NASCE,
    slug: "meu-filho-adolescente-precisa-de-psicologo",
    ref: "A1",
    grupo: "Para começar",
    titulo: "Meu filho precisa de psicólogo?",
    h1: "Meu filho adolescente precisa de psicólogo? Sinais e quando buscar ajuda",
    descricao: "Como saber se seu filho adolescente precisa de um psicólogo: o que é da idade, o que merece atenção e como começar essa conversa em casa.",
  },
  {
    ...NASCE,
    slug: "ansiedade-na-adolescencia",
    ref: "A2",
    grupo: "Emoções",
    titulo: "Ansiedade na adolescência: sinais",
    h1: "Ansiedade na adolescência: sinais e quando procurar ajuda",
    descricao: "Ansiedade em adolescentes: o que é esperado, que sinais merecem atenção, como ajudar seu filho em casa e quando procurar um psicólogo.",
  },
  {
    ...NASCE,
    slug: "terapia-online-para-adolescentes",
    ref: "A3",
    grupo: "Terapia",
    titulo: "Terapia online para adolescentes",
    h1: "Terapia online funciona para adolescentes? Como é na prática",
    descricao: "Um adolescente pode fazer terapia online? Veja como funciona, o que a regra do Conselho exige, como fica a privacidade e para quem o formato serve.",
  },
  {
    ...NASCE,
    slug: "psicologo-para-adolescente-em-araruama-como-escolher",
    ref: "A4",
    grupo: "Para começar",
    // Só este texto cita a cidade no título e no slug.
    titulo: "Psicólogo para adolescente em Araruama",
    h1: "Psicólogo para adolescente em Araruama: como escolher, inclusive online",
    descricao: "Como escolher um psicólogo para o seu filho adolescente: o que conferir no CRP, o que perguntar e o que muda entre atendimento presencial e online.",
  },
  {
    ...NASCE,
    slug: "tristeza-irritacao-e-desanimo-na-adolescencia",
    ref: "A5",
    grupo: "Emoções",
    titulo: "Tristeza e irritação na adolescência",
    h1: "Tristeza, irritação e desânimo na adolescência: o que é esperado e o que merece atenção",
    descricao: "O que deixa um adolescente triste, irritado ou desanimado, o que é da idade e quando a tristeza que dura merece a atenção de um profissional.",
  },
  {
    ...NASCE,
    slug: "escola-provas-e-enem-quando-a-pressao-vira-sofrimento",
    ref: "A6",
    grupo: "Escola",
    titulo: "Pressão da escola e do Enem",
    h1: "Escola, provas e Enem: quando a pressão vira sofrimento",
    descricao: "Ansiedade com o Enem e com as provas é comum na adolescência. Veja quando passa do esperado, como falar com a escola e o que fazer em casa.",
  },
  {
    ...NASCE,
    slug: "meu-filho-nao-quer-fazer-terapia-como-propor",
    ref: "A7",
    grupo: "Terapia",
    titulo: "Filho não quer terapia: como propor",
    h1: "Meu filho não quer fazer terapia: como propor",
    descricao: "O adolescente não quer ir ao psicólogo? Entenda por que ele resiste, o que ajuda e o que atrapalha na hora de propor a terapia, sem forçar.",
  },
  {
    ...NASCE,
    slug: "sigilo-e-participacao-dos-pais-na-terapia-do-adolescente",
    ref: "A8",
    grupo: "Terapia",
    titulo: "Sigilo na terapia do adolescente",
    h1: "O que os pais podem saber sobre a terapia do adolescente? Sigilo e participação",
    descricao: "Os pais podem saber o que o filho fala na terapia? Entenda o sigilo do adolescente, a autorização dos responsáveis e como a família participa.",
  },
  {
    ...NASCE,
    slug: "adolescente-isolado-no-quarto-e-no-celular",
    ref: "A9",
    grupo: "Em casa",
    titulo: "Adolescente isolado no quarto",
    h1: "Adolescente isolado no quarto e no celular: normal ou sinal de alerta?",
    descricao: "Adolescente isolado no quarto e só no celular? Veja o que é próprio da idade, o que merece atenção e como combinar o uso do celular em casa.",
  },
  {
    ...NASCE,
    slug: "pre-adolescente-dos-10-aos-13-anos-o-que-muda",
    ref: "A10",
    grupo: "Em casa",
    titulo: "Pré-adolescência: o que muda",
    h1: "Pré-adolescente, dos 10 aos 13 anos: o que muda e quando buscar ajuda",
    descricao: "O que muda na pré-adolescência, dos 10 aos 13 anos, o que é esperado e quando buscar ajuda de um psicólogo. Um guia calmo para pais.",
  },
  {
    ...NASCE,
    slug: "autoestima-e-imagem-corporal-na-adolescencia",
    ref: "A11",
    grupo: "Emoções",
    titulo: "Autoestima e corpo na adolescência",
    h1: "Autoestima e imagem corporal na adolescência",
    descricao: "Por que a autoestima e a imagem do corpo pesam tanto na adolescência, o que a pesquisa mostra e como conversar em casa sem reforçar o problema.",
  },
  {
    ...NASCE,
    slug: "como-conversar-com-o-adolescente-que-nao-fala",
    ref: "A12",
    grupo: "Em casa",
    titulo: "Como conversar com o adolescente",
    h1: "Como conversar com o adolescente que não fala",
    descricao: "Adolescente não conversa com os pais? Veja por que ele se cala, o que ajuda a começar um diálogo e quando a conversa pede apoio profissional.",
  },
];

/** As páginas que entram no build, no sitemap, no menu e nos links. */
export const paginasPublicadas = (): readonly Pagina[] => PAGINAS.filter((p) => p.publicada);

/** Em desenvolvimento os rascunhos abrem (para revisão do gabarito); no build, nunca. */
export const paginasDaRota = (): readonly Pagina[] => (import.meta.env.DEV ? PAGINAS : paginasPublicadas());

/** A lista, o item de menu e a faixa da home só existem com ao menos um texto publicado. */
export const temLista = (): boolean => paginasPublicadas().length > 0;

/** `/para-os-pais/<slug>/` — com barra final: é a URL que o GitHub Pages serve de fato (`<slug>/index.html`). */
export const caminhoDe = (p: Pick<Pagina, "slug">): string => `${LISTA.caminho}${p.slug}/`;

/** Minutos de leitura, calculados no build a partir do `.md` (ausente se o arquivo ainda não existe). */
export const minutosDe = (slug: string): number | undefined => TEMPOS[slug];

/** AAAA-MM-DD → dd/mm/aaaa, sem passar por `Date` (fuso não pode mudar o dia). */
export const dataBR = (iso: string): string => iso.split("-").reverse().join("/");
