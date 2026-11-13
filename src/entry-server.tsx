/* eslint-disable react-refresh/only-export-components -- módulo de build (SSR), não de componentes: não passa por Fast Refresh. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { DadosTextoContext } from "./lib/dados-texto";
import type { DadosTexto } from "./lib/dados-texto";
import { dadosDoTexto, verificarTextos } from "./lib/textos";
import type { Rota } from "./lib/seo";

export { ROTA_404, cabecaDaRota, rotasIndexaveis, sitemapXml } from "./lib/seo";

// Falha o build se algum .md e o registro discordam, ou se falta o .md de uma página publicada.
verificarTextos();

/** Os dados do corpo da rota (só os textos têm). Vão para o HTML num JSON inerte; o navegador os lê ali. */
export const dadosDaRota = (rota: Rota): DadosTexto | null => (rota.pagina ? dadosDoTexto(rota.pagina) : null);

/** O HTML do `<div id="root">` de uma rota. Chamado pelo `scripts/prerender.mjs`, nunca no navegador. */
export const renderizar = (caminho: string, dados: DadosTexto | null = null): string =>
  renderToString(
    <DadosTextoContext.Provider value={dados}>
      <StaticRouter location={caminho}>
        <App />
      </StaticRouter>
    </DadosTextoContext.Provider>,
  );
