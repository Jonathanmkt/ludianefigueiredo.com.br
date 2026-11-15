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

/** O HTML da tag, para o <head> da home. */
export const tagGoogleHtml = (): string =>
  [
    `<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG}"></script>`,
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
      `gtag('consent','default',{ad_storage:'granted',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});` +
      `gtag('js',new Date());` +
      `gtag('config','${GOOGLE_ADS_TAG}',{allow_ad_personalization_signals:false});</script>`,
  ].join("\n    ");

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Dispara a conversão "Clique no WhatsApp". Sem a tag na página (todas menos a home), não faz nada. */
export const registrarCliqueWhatsApp = (): void => {
  if (typeof window.gtag === "function") window.gtag("event", "conversion", { send_to: GOOGLE_ADS_CONVERSAO });
};
