import Cabecalho from "@/components/Cabecalho";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Rodape from "@/components/Rodape";
import { GRUPOS, HOME, LISTA, caminhoDe, dataBR, minutosDe, paginasDaRota } from "@/data/paginas";

const LINK = "underline decoration-fio-2 underline-offset-4 hover:text-ouro-tinta";

/** A página-lista "Para os pais de adolescentes": os textos agrupados por tema, sem filtro em JavaScript. */
const ListaParaOsPais = () => {
  const textos = paginasDaRota();
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-tinta focus:px-4 focus:py-2 focus:text-papel"
      >
        Ir para o conteúdo
      </a>
      <Cabecalho interna />

      <main id="conteudo">
        <div className="container py-12 lg:py-16">
          <nav aria-label="Trilha de navegação" className="mb-8 text-[0.8rem] text-suave">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <a className={LINK} href="/">Início</a>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{LISTA.rotulo}</li>
            </ol>
          </nav>

          <h1 className="max-w-[24ch] text-balance text-[clamp(2rem,4vw,3rem)] font-light leading-[1.15]">{LISTA.h1}</h1>
          <p className="lead mt-5 max-w-[56ch]">{LISTA.abertura}</p>

          {GRUPOS.map((g) => {
            const doGrupo = textos.filter((p) => p.grupo === g);
            if (doGrupo.length === 0) return null;
            return (
              <section key={g} aria-labelledby={`g-${g}`} className="mt-14">
                <h2 id={`g-${g}`} className="rotulo mb-6">{g}</h2>
                <ul className="grid gap-px overflow-hidden rounded-sm border border-fio bg-fio md:grid-cols-2">
                  {doGrupo.map((p) => {
                    const min = minutosDe(p.slug);
                    return (
                      <li key={p.slug} className="bg-superficie p-7">
                        <h3 className="mb-3 text-[1.3rem] leading-snug">
                          <a className="hover:text-ouro-tinta" href={caminhoDe(p)}>{p.h1}</a>
                        </h3>
                        <p className="text-[0.8rem] text-suave">
                          {min !== undefined && <>{min} min de leitura · </>}
                          atualizado em <time dateTime={p.atualizadaEm}>{dataBR(p.atualizadaEm)}</time>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}

          <aside aria-label="Conversar" className="mt-16 bg-tinta px-7 py-9 text-center text-papel">
            <p className="mx-auto mb-6 max-w-[38ch] font-titulo text-[1.5rem] leading-snug">Vamos conversar?</p>
            <BotaoWhatsApp referencia={HOME.ref} claro>Falar pelo WhatsApp</BotaoWhatsApp>
          </aside>
        </div>
      </main>

      <Rodape />
    </>
  );
};

export default ListaParaOsPais;
