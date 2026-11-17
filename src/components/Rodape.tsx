import { PROFISSIONAL } from "@/data/conteudo";
import { LISTA, caminhoDe, paginasPublicadas } from "@/data/paginas";

/** O rodapé de toda página: leituras publicadas (se houver) e a frase de privacidade. Sem aviso de urgência (decisão do CEO, 13/11/2026). */
const Rodape = () => {
  const leituras = paginasPublicadas();
  return (
    <footer className="bg-tinta text-papel/70">
      <div className="container border-t border-papel/15 py-7 text-[0.78rem]">
        {leituras.length > 0 && (
          <nav aria-label={LISTA.rotulo}>
            <p className="mb-2">
              <a className="inline-block py-3 font-semibold text-papel/90 underline decoration-papel/30 underline-offset-4 hover:text-ouro" href={LISTA.caminho}>{LISTA.rotulo}</a>
            </p>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6">
              {leituras.map((p) => (
                <li key={p.slug}>
                  <a className="inline-block py-3 underline decoration-papel/30 underline-offset-4 hover:text-ouro" href={caminhoDe(p)}>
                    {p.h1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="mt-6 flex flex-col gap-2 border-t border-papel/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 {PROFISSIONAL.nome} · {PROFISSIONAL.profissao} · {PROFISSIONAL.crp}
          </span>
          <span>
            Este site usa o Google Analytics para medir visitas, sem identificar pessoas; na página inicial, o Google Ads também mede conversões.{" "}
            <a className="inline-block py-3 underline decoration-papel/30 underline-offset-4 hover:text-ouro" href="/privacidade/">Privacidade</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
