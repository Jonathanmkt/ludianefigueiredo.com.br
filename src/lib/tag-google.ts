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

/** Onde o botão de WhatsApp está na página — vai no evento `clique_whatsapp` como parâmetro `posicao`. */
export type PosicaoWhatsApp = "topo" | "meio" | "rodape" | "pagina_texto";

/**
 * O HTML do Google para o <head>. Na home carrega o gtag.js uma vez só (pelo id do Ads) e configura Ads + GA4;
 * nas demais rotas carrega o gtag.js pelo id do GA4 e configura só ele. A 404 não chama esta função.
 *
 * ⚠️ O COMPORTAMENTO (desde 17/11/2026, pacote 1 do desempenho da página de destino):
 *  1. O script inline (minúsculo) roda no <head>: cria `dataLayer`/`gtag` e ENFILEIRA o consentimento, o `js` e os `config`.
 *     Não baixa nada.
 *  2. O `gtag.js` (~150–200 KB, de terceiro) só é baixado DEPOIS do evento `load` e quando o navegador está ocioso
 *     (`requestIdleCallback`, limite de 3 s; sem ele, 2 s). Antes, ele disputava rede e processador com a página.
 *     Quando chega, o `gtag.js` esvazia a fila na ordem: o `page_view` só sai nesse momento (segundos depois do primeiro desenho).
 *     Custo aceito: quem sai antes do `load`/da ociosidade não gera `page_view`.
 *  3. O clique no WhatsApp é capturado por um ouvinte de documento (fase de captura) neste mesmo script, e não pelo React:
 *     funciona antes de o JavaScript do React hidratar e antes de o `gtag.js` carregar. O evento entra na fila (não se perde)
 *     e o clique também FORÇA o carregamento do `gtag.js` na hora. O link abre em outra aba (`target=_blank`), então a página
 *     de origem continua viva e a fila é enviada. Os botões se marcam com `data-wa` e `data-posicao`.
 *  4. Eventos: GA4 `clique_whatsapp` {origem, posicao} em todas as rotas; conversão do Ads só na home. Sem valor, nada pessoal.
 */
export const tagGoogleHtml = (home: boolean): string => {
  const carga = home ? GOOGLE_ADS_TAG : GA4_ID;
  const consent = home
    ? `{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'}`
    : `{ad_storage:'denied',analytics_storage:'granted',ad_user_data:'denied',ad_personalization:'denied'}`;
  const carregador =
    `(function(){var c=0;` +
    `function carregar(){if(c)return;c=1;var s=document.createElement('script');s.async=true;` +
    `s.src='https://www.googletagmanager.com/gtag/js?id=${carga}';document.head.appendChild(s);}` +
    `function ocioso(){if(window.requestIdleCallback)requestIdleCallback(carregar,{timeout:3000});else setTimeout(carregar,2000);}` +
    `if(document.readyState==='complete')ocioso();else addEventListener('load',ocioso);` +
    `document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[data-wa]');if(!a)return;` +
    `var o=new URLSearchParams(location.search).get('o')||'';o=/^[A-Za-z0-9]{1,6}$/.test(o)?o.toUpperCase():'';` +
    `gtag('event','clique_whatsapp',{send_to:'${GA4_ID}',origem:o||'direto',posicao:a.getAttribute('data-posicao')||'nao_informada'});` +
    (home ? `gtag('event','conversion',{send_to:'${GOOGLE_ADS_CONVERSAO}'});` : ``) +
    `carregar();},true);})();`;
  return (
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}` +
    `gtag('consent','default',${consent});` +
    `gtag('js',new Date());` +
    (home ? `gtag('config','${GOOGLE_ADS_TAG}',{allow_ad_personalization_signals:false});` : ``) +
    `gtag('config','${GA4_ID}',${CONFIG_GA4});` +
    carregador +
    `</script>`
  );
};
