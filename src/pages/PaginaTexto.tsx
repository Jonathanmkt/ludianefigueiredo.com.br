import { useContext, useEffect, useState } from "react";
import Cabecalho from "@/components/Cabecalho";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Rodape from "@/components/Rodape";
import { PROFISSIONAL, CONTATO } from "@/data/conteudo";
import { LISTA, caminhoDe, dataBR } from "@/data/paginas";
import type { Pagina } from "@/data/paginas";
import { DadosTextoContext } from "@/lib/dados-texto";
import type { DadosTexto } from "@/lib/dados-texto";

const LINK = "underline decoration-fio-2 underline-offset-4 hover:text-ouro-tinta";
/** Link de texto com área de toque de pelo menos 44 px de altura (revisão de 17/11/2026: alvos pequenos nos textos). */
const LINK_TOQUE = `${LINK} inline-flex min-h-11 items-center`;

/**
 * O gabarito de um texto "Para os pais": trilha · H1 · autoria · sumário · corpo (HTML do Markdown) ·
 * fontes · WhatsApp · "Leia também".
 *
 * Os dados vêm do build (`DadosTextoContext`, ver `lib/dados-texto.ts`); o corpo NÃO está no bundle.
 * ⚠️ Só os textos `publicada: true` chegam ao build. O aviso de RASCUNHO e a leitura direta do `.md`
 * existem apenas no `npm run dev`, onde os rascunhos abrem para revisão.
 */
const PaginaTexto = ({ pagina }: { pagina: Pagina }) => {
  const doBuild = useContext(DadosTextoContext);
  const [doDev, setDoDev] = useState<DadosTexto | null>(null);

  useEffect(() => {
    // Em produção `import.meta.env.DEV` é `false`: o ramo (e o `lib/textos`, com o Markdown) some do bundle.
    if (import.meta.env.DEV && !doBuild) {
      import("@/lib/textos").then((m) => setDoDev(m.dadosDoTexto(pagina, false)));
    }
  }, [doBuild, pagina]);

  const dados = doBuild ?? doDev;

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
        <article className="container max-w-[46rem] py-12 lg:py-16">
          {!pagina.publicada && (
            <p role="note" className="mb-8 border border-ouro-tinta px-4 py-3 text-[0.85rem] text-ouro-tinta">
              <strong>RASCUNHO — texto não publicado.</strong> O texto clínico é da psicóloga e depende da aprovação dela.
            </p>
          )}

          <nav aria-label="Trilha de navegação" className="mb-8 text-[0.8rem] text-suave">
            <ol className="flex flex-wrap items-center gap-x-2">
              <li>
                <a className={LINK_TOQUE} href="/">Início</a>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <a className={LINK_TOQUE} href={LISTA.caminho}>{LISTA.rotulo}</a>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{pagina.h1}</li>
            </ol>
          </nav>

          <h1 className="text-balance text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-[1.15]">{pagina.h1}</h1>

          <p className="mt-5 border-y border-fio py-3 text-[0.85rem] text-suave">
            Por {PROFISSIONAL.nome}, psicóloga · {CONTATO.localidade} · {PROFISSIONAL.crp} · atualizado em{" "}
            <time dateTime={pagina.atualizadaEm}>{dataBR(pagina.atualizadaEm)}</time>
            {dados && <> · {dados.minutos} min de leitura</>}
          </p>

          {dados ? (
            <>
              <nav aria-label="Sumário" className="mt-8">
                <p className="rotulo mb-4">Neste texto</p>
                <ol className="list-decimal space-y-1.5 pl-5 text-[0.95rem] text-tinta-2">
                  {dados.sumario.map((q) => (
                    <li key={q.id}>
                      <a className={LINK_TOQUE} href={`#${q.id}`}>{q.pergunta}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="texto-corpo mt-10" dangerouslySetInnerHTML={{ __html: dados.html }} />

              {dados.fontes.length > 0 && (
                <section id="fontes" className="mt-14 border-t border-fio pt-8">
                  <h2 className="mb-4 text-[1.4rem]">Fontes</h2>
                  <ul className="list-disc space-y-1.5 pl-5 text-[0.95rem] text-suave">
                    {dados.fontes.map((f) => (
                      <li key={f.url}>
                        {f.instituicao}.{" "}
                        <a className={`${LINK} inline-block py-2`} href={f.url} target="_blank" rel="noopener noreferrer">{f.titulo}</a>.{f.ano ? ` ${f.ano}.` : ""}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          ) : (
            <p className="mt-10 text-suave">RASCUNHO — o texto ainda não foi escrito (falta o arquivo .md).</p>
          )}

          <aside aria-label="Conversar" className="mt-14 bg-tinta px-7 py-9 text-center text-papel">
            <p className="mx-auto mb-6 max-w-[38ch] font-titulo text-[1.5rem] leading-snug">Vamos conversar?</p>
            <BotaoWhatsApp referencia={pagina.ref} posicao="pagina_texto" claro>Falar pelo WhatsApp</BotaoWhatsApp>
          </aside>

          {dados && dados.relacionados.length > 0 && (
            <nav aria-label="Leia também" className="mt-14">
              <p className="rotulo mb-4">Leia também</p>
              <ul className="space-y-2 text-[0.95rem]">
                {dados.relacionados.map((r) => (
                  <li key={r.slug}>
                    <a className={LINK_TOQUE} href={caminhoDe(r)}>{r.h1}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </main>

      <Rodape />
    </>
  );
};

export default PaginaTexto;
