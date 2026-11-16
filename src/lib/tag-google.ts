/* ===========================================================================
   A tag de conversão do Google Ads — SÓ na home (rota "/").

   Decisão do CEO em 15/11/2026: sem banner de consentimento, a tag dispara sempre.
   As proteções que o parecer do Jurídico aponta (administrativo/assessor-juridico/
   analises/psicologa-clinica-tag-de-conversao-e-imagem-no-anuncio.md) ficam:
     · nunca nas páginas "Para os pais" (o tema da leitura não chega ao Google);
     · sem personalização: `ad_personalization` e `ad_user_data` negados,
       `allow_ad_personalization_signals:false`, sem remarketing nem listas;
     · um único evento, no clique do WhatsApp, sem valor e sem dado nenhum.

   ⚠️ O snippet é injetado pelo `seo.ts` no <head> da home, no build. Nunca no
   `index.html` (que é o molde de todas as rotas).
   =========================================================================== */

export const GOOGLE_ADS_TAG = "AW-18573150048";
export const GOOGLE_ADS_CONVERSAO = `${GOOGLE_ADS_TAG}/TzA9CJ3ZibkdEOCOr5hF`;

/** Google Analytics 4 — propriedade "ludianefigueiredo.com.br", fluxo "Site Ludiane". Todas as rotas, menos a 404. */
export const GA4_ID = "G-VH28PF2KG4";

/** Sem sinais do Google, sem personalização de anúncio, IP anonimizado, sem User-ID. */
const CONFIG_GA4 = `{allow_google_signals:false,allow_ad_personalization_signals:false,anonymize_ip:true}`;

/**
 * O HTML do Google para o <head>. Na home carrega o gtag.js uma vez só (pelo id do Ads) e configura Ads + GA4;
 * nas demais rotas carrega o gtag.js pelo id do GA4 e configura só ele. A 404 não chama esta função.
 */
export const tagGoogleHtml = (home: boolean): string => {
  const carga = home ? GOOGLE_ADS_TAG : GA4_ID;
  const consent = home
    ? `{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'}`
    : `{ad_storage:'denied',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'}`;
  return [
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${carga}"></script>`,
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
      `gtag('consent','default',${consent});` +
      `gtag('js',new Date());` +
      (home ? `gtag('config','${GOOGLE_ADS_TAG}',{allow_ad_personalization_signals:false});` : ``) +
      `gtag('config','${GA4_ID}',${CONFIG_GA4});</script>`,
  ].join("\n    ");
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * No clique do WhatsApp: (1) evento GA4 `clique_whatsapp`, em todas as rotas, com a origem de campanha (`G1`, `IG`…) — nada pessoal;
 * (2) a conversão do Google Ads, só na home (detectada pelo caminho; nas outras rotas o Ads não está carregado).
 */
export const registrarCliqueWhatsApp = (origem: string): void => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "clique_whatsapp", { send_to: GA4_ID, origem: origem || "direto" });
  if (window.location.pathname === "/") window.gtag("event", "conversion", { send_to: GOOGLE_ADS_CONVERSAO });
};
