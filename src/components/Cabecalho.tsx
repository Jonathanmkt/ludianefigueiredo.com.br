import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAVEGACAO, PROFISSIONAL } from "@/data/conteudo";
import { LISTA, temLista } from "@/data/paginas";
import { CURVA } from "@/lib/movimento";

/** O painel desce a página inteira junto, então o tempo é de bloco grande: 0,4 s. */
const DURACAO_MENU = 0.4;
/** A mesma curva `padrao` do sistema de movimento, em texto de CSS. */
const CURVA_MENU = `cubic-bezier(${CURVA.padrao.join(",")})`;

/**
 * Cabeçalho fixo ao rolar. No celular a navegação vira um painel que empurra a página.
 *
 * ⚠️ O painel do celular fica NO fluxo e anima a ALTURA por CSS: a página desce junto, aos
 * poucos. (Tentei `height: auto` no Framer Motion: sob `LazyMotion` a animação nunca saiu do
 * lugar — painel preso em 1 px e transparente, sem erro algum. CSS não depende disso.) O CEO pediu assim (12/11/2026). Sobreposto ele não empurrava nada; no fluxo e sem
 * animar a altura, empurrava tudo de uma vez — o que é o pior dos dois.
 */
const Cabecalho = ({ interna = false }: { interna?: boolean }) => {
  const [aberto, setAberto] = useState(false);
  // Nas páginas internas as âncoras da home precisam do `/` na frente; na home ficam como estavam.
  const prefixo = interna ? "/" : "";
  const itens: { rotulo: string; href: string }[] = NAVEGACAO.map((item) => ({ rotulo: item.rotulo, href: prefixo + item.href }));
  // "Para os pais" leva à página-lista e só existe quando há texto publicado. Entra depois de "Sobre mim".
  if (temLista()) {
    const depoisDe = itens.findIndex((i) => i.href.endsWith("#sobre"));
    itens.splice(depoisDe + 1, 0, { rotulo: LISTA.rotulo, href: LISTA.caminho });
  }
  const fechar = () => setAberto(false);

  return (
    <header className="sticky top-0 z-40 border-b border-fio bg-superficie/95 backdrop-blur">
      <div className="container flex items-center justify-between gap-6 py-4">
        <a href={interna ? "/" : "#inicio"} className="flex flex-col leading-tight" onClick={fechar} aria-label={`${PROFISSIONAL.nome}, ${PROFISSIONAL.profissao} — início`}>
          <span className="font-titulo text-[1.1rem] uppercase tracking-[0.2em] text-tinta sm:text-[1.22rem]">
            {PROFISSIONAL.nome}
          </span>
          <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.22em] text-suave">
            {PROFISSIONAL.profissao} · {PROFISSIONAL.crp}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {itens.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.72rem] uppercase tracking-[0.16em] text-tinta-2 transition-colors hover:text-ouro-tinta"
            >
              {item.rotulo}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-fio-2 text-tinta lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* O painel fica sempre no DOM e anima a altura por CSS (`grid-template-rows` 0fr → 1fr):
          a página desce junto, aos poucos. `visibility` espera o fim da animação para esconder,
          de modo que o painel fechado não recebe foco por teclado. */}
      <nav
        id="menu-movel"
        aria-label="Principal"
        className="grid bg-superficie lg:hidden"
        style={{
          gridTemplateRows: aberto ? "1fr" : "0fr",
          opacity: aberto ? 1 : 0,
          visibility: aberto ? "visible" : "hidden",
          transition: aberto
            ? `grid-template-rows ${DURACAO_MENU}s ${CURVA_MENU}, opacity ${DURACAO_MENU}s ${CURVA_MENU}`
            : `grid-template-rows ${DURACAO_MENU}s ${CURVA_MENU}, opacity ${DURACAO_MENU * 0.75}s ${CURVA_MENU}, visibility 0s ${DURACAO_MENU}s`,
        }}
      >
        <div className="overflow-hidden">
          <ul className="container flex flex-col border-t border-fio py-2">
            {itens.map((item) => (
              <li key={item.href} className="border-b border-fio last:border-0">
                <a
                  href={item.href}
                  onClick={fechar}
                  className="block py-4 text-[0.78rem] uppercase tracking-[0.18em] text-tinta-2"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Cabecalho;
