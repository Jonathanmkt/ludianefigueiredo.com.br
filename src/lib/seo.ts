import { CONTATO, PROFISSIONAL } from "@/data/conteudo";
import { tagGoogleHtml } from "@/lib/tag-google";
import { HOME, LISTA, PRIVACIDADE, caminhoDe, paginasPublicadas, temLista } from "@/data/paginas";
import type { Pagina } from "@/data/paginas";

/* ===========================================================================
   SEO técnico — o que vai no <head> de cada rota, gerado no build.

   Fonte única: os dados vêm de `conteudo.ts` e `paginas.ts`. Não há mais
   título, descrição nem JSON-LD escritos à mão no `index.html`.

   ⚠️ Única requisição a terceiro: a tag do Google Ads, só no <head> da home
   (`tag-google.ts`). O `sameAs` do Instagram é dado estruturado, não requisição.
   =========================================================================== */

export const SITE = `https://${CONTATO.site}`;
const IMAGEM_OG = `${SITE}/og-ludiane.png`;
const LOGO = `${SITE}/marca-ludiane.png`;
const NOME_SERVICO = `${PROFISSIONAL.nome} · ${PROFISSIONAL.profissao}`;
const CRP_NUMERO = PROFISSIONAL.crp.replace("CRP ", "");

export const HOME_TITULO = `${PROFISSIONAL.nome} · Psicóloga para adolescentes · ${CONTATO.localidade} · ${PROFISSIONAL.crp}`;
export const HOME_DESCRICAO = `Psicóloga para pré-adolescentes e adolescentes em ${CONTATO.localidade}: atendimento presencial no Centro e online. Contato inicial pelo WhatsApp. ${PROFISSIONAL.crp}.`;

/** Uma rota a pré-renderizar. `caminho` é o que o navegador pede; o arquivo sai de `arquivo`. */
export type Rota = {
  caminho: string;
  arquivo: string;
  titulo: string;
  descricao: string;
  /** `true` na 404: sem canonical, com `noindex`. */
  naoIndexar?: boolean;
  pagina?: Pagina;
  /** Os degraus da trilha (BreadcrumbList), do mais alto ao atual. Ausente na home. */
  trilha?: { nome: string; caminho: string }[];
  /** AAAA-MM-DD — só para o sitemap. */
  atualizadaEm?: string;
};

export const ROTA_404: Rota = {
  caminho: "/404",
  arquivo: "404.html",
  titulo: `Página não encontrada · ${PROFISSIONAL.nome}`,
  descricao: "O endereço que você abriu não existe neste site.",
  naoIndexar: true,
};

const SUFIXO = ` · ${PROFISSIONAL.nome} · ${PROFISSIONAL.crp}`;
const maisRecente = (datas: string[]): string => [...datas].sort().at(-1)!;

/** Todas as rotas indexáveis: a home, a lista "Para os pais" (se houver texto publicado) e os textos publicados. A 404 vai à parte. */
export const rotasIndexaveis = (): Rota[] => {
  const publicadas = paginasPublicadas();
  const rotas: Rota[] = [
    { caminho: "/", arquivo: "index.html", titulo: HOME_TITULO, descricao: HOME_DESCRICAO, atualizadaEm: HOME.atualizadaEm },
  ];
  if (temLista()) {
    rotas.push({
      caminho: LISTA.caminho,
      arquivo: "para-os-pais/index.html",
      titulo: `${LISTA.titulo}${SUFIXO}`,
      descricao: LISTA.abertura,
      trilha: [{ nome: LISTA.rotulo, caminho: LISTA.caminho }],
      atualizadaEm: maisRecente(publicadas.map((p) => p.atualizadaEm)),
    });
  }
  for (const p of publicadas) {
    rotas.push({
      caminho: caminhoDe(p),
      arquivo: `para-os-pais/${p.slug}/index.html`,
      titulo: `${p.titulo}${SUFIXO}`,
      descricao: p.descricao,
      pagina: p,
      trilha: [
        { nome: LISTA.rotulo, caminho: LISTA.caminho },
        { nome: p.h1, caminho: caminhoDe(p) },
      ],
      atualizadaEm: p.atualizadaEm,
    });
  }
  rotas.push({
    caminho: PRIVACIDADE.caminho,
    arquivo: "privacidade/index.html",
    titulo: `${PRIVACIDADE.titulo}${SUFIXO}`,
    descricao: PRIVACIDADE.descricao,
    trilha: [{ nome: PRIVACIDADE.rotulo, caminho: PRIVACIDADE.caminho }],
    atualizadaEm: PRIVACIDADE.atualizadaEm,
  });
  return rotas;
};

const esc = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** O `@graph` da rota: Person + ProfessionalService + WebSite, e a trilha nas páginas internas. */
const grafo = (rota: Rota) => {
  const url = SITE + rota.caminho;
  const nos: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#site`,
      url: `${SITE}/`,
      name: NOME_SERVICO,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE}/#ludiane` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#ludiane`,
      name: PROFISSIONAL.nome,
      jobTitle: PROFISSIONAL.profissao,
      identifier: { "@type": "PropertyValue", name: "CRP", value: CRP_NUMERO },
      url: `${SITE}/`,
      image: IMAGEM_OG,
      sameAs: [CONTATO.instagramLink],
      worksFor: { "@id": `${SITE}/#servico` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#servico`,
      name: NOME_SERVICO,
      url: `${SITE}/`,
      logo: LOGO,
      image: IMAGEM_OG,
      description: HOME_DESCRICAO,
      serviceType: "Psicoterapia para pré-adolescentes e adolescentes, presencial e online",
      telephone: "+55 22 98829-4387",
      email: CONTATO.email,
      // O endereço é o da sala de atendimento (Edifício Delfim Carvalho), divulgado por decisão do CEO em 13/11/2026.
      address: {
        "@type": "PostalAddress",
        streetAddress: "Avenida Brasil, 10, sala 514 (Edifício Delfim Carvalho)",
        addressLocality: "Araruama",
        addressRegion: "RJ",
        postalCode: "28970-000",
        addressCountry: "BR",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "13:00",
        closes: "17:00",
      },
      areaServed: { "@type": "City", name: "Araruama" },
      availableLanguage: "pt-BR",
      sameAs: [CONTATO.instagramLink],
      provider: { "@id": `${SITE}/#ludiane` },
    },
  ];
  if (rota.pagina) {
    // O texto como Article, com autoria e datas: ajuda o Google (e os resumos por IA) a saber quem escreveu e quando.
    nos.push({
      "@type": "Article",
      "@id": `${url}#texto`,
      headline: rota.pagina.h1,
      description: rota.descricao,
      inLanguage: "pt-BR",
      url,
      mainEntityOfPage: url,
      datePublished: rota.pagina.atualizadaEm,
      dateModified: rota.pagina.atualizadaEm,
      image: IMAGEM_OG,
      author: { "@id": `${SITE}/#ludiane` },
      publisher: { "@id": `${SITE}/#ludiane` },
      isPartOf: { "@id": `${SITE}/#site` },
    });
  }
  if (rota.trilha) {
    nos.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#trilha`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
        ...rota.trilha.map((d, i) => ({ "@type": "ListItem", position: i + 2, name: d.nome, item: SITE + d.caminho })),
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": nos };
};

/** O trecho do <head> que muda por rota: título, descrição, canonical, Open Graph e JSON-LD. */
export const cabecaDaRota = (rota: Rota): string => {
  const url = SITE + rota.caminho;
  const linhas: string[] = [
    `<title>${esc(rota.titulo)}</title>`,
    `<meta name="description" content="${esc(rota.descricao)}" />`,
  ];
  if (rota.naoIndexar) {
    linhas.push(`<meta name="robots" content="noindex" />`);
    return linhas.join("\n    ");
  }
  linhas.push(
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${rota.pagina ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${esc(NOME_SERVICO)}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(rota.titulo)}" />`,
    `<meta property="og:description" content="${esc(rota.descricao)}" />`,
    `<meta property="og:image" content="${IMAGEM_OG}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(`${PROFISSIONAL.nome}, psicóloga, ao lado do monograma dourado lf e do ${PROFISSIONAL.crp}.`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(rota.titulo)}" />`,
    `<meta name="twitter:description" content="${esc(rota.descricao)}" />`,
    `<meta name="twitter:image" content="${IMAGEM_OG}" />`,
    // `<` escapado: o JSON nunca consegue fechar o <script> por acidente.
    `<script type="application/ld+json">${JSON.stringify(grafo(rota)).replace(/</g, "\\u003c")}</script>`,
  );
  // Só na home: a foto do topo (candidata a LCP no computador, onde ela está na primeira tela) e a fonte manuscrita do H1.
  // No celular a foto fica abaixo do texto, por isso o preload da imagem só vale a partir de 1024 px.
  if (rota.caminho === "/") {
    linhas.push(
      `<link rel="preload" as="image" href="/ludiane-hero.webp" type="image/webp" media="(min-width: 1024px)" fetchpriority="high" />`,
      `<link rel="preload" href="/fontes/parisienne.woff2" as="font" type="font/woff2" crossorigin />`,
    );
  }
  // Google: Ads + GA4 na home, só GA4 nas demais rotas, nada na 404 (ver `lib/tag-google.ts`).
  if (!rota.naoIndexar) linhas.push(tagGoogleHtml(rota.caminho === "/"));
  return linhas.join("\n    ");
};

/** O sitemap: só as rotas publicadas, cada uma com `lastmod`. */
export const sitemapXml = (rotas: Rota[]): string =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  rotas
    .map((r) => `  <url><loc>${SITE}${r.caminho}</loc><lastmod>${r.atualizadaEm}</lastmod></url>`)
    .join("\n") +
  `\n</urlset>\n`;
