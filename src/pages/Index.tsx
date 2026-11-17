import { ChevronDown, CloudRain, Instagram, Mail, MapPin, Sprout, Users, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Cabecalho from "@/components/Cabecalho";
import Revela from "@/components/Revela";
import { IconeWhatsApp } from "@/components/Icones";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Rodape from "@/components/Rodape";
import { CONTATO, DADOS_SOBRE, DUVIDAS, ETAPAS, PROFISSIONAL, TEMAS } from "@/data/conteudo";
import { HOME, LISTA, caminhoDe, paginasPublicadas } from "@/data/paginas";

const ICONES_TEMA: Record<(typeof TEMAS)[number]["icone"], LucideIcon> = {
  ansiedade: Wind,
  humor: CloudRain,
  autoestima: Sprout,
  relacoes: Users,
};

const Index = () => {
  const leituras = paginasPublicadas();
  return (
  <>
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-tinta focus:px-4 focus:py-2 focus:text-papel"
    >
      Ir para o conteúdo
    </a>
    <Cabecalho />

    <main id="conteudo">
      {/* ============ INÍCIO ============ */}
      <section id="inicio" className="overflow-hidden border-b border-fio">
        <div className="container grid lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
          {/* ⚠️ A primeira dobra NÃO usa `Revela`: H1, lead e botão nascem visíveis no HTML (sem opacity:0 antes do JS).
              No celular o texto vem ANTES da foto, e a foto é mais baixa — o botão de WhatsApp cabe na primeira tela.
              (17/11/2026: o CEO testou um retrato redondo pequeno acima do título e preferiu manter a foto abaixo do texto.) */}
          <div className="self-center pb-6 pt-8 lg:py-24">
            <span className="estrela mb-4 lg:mb-6" aria-hidden="true" />
            <h1 className="max-w-[24ch] text-balance text-[clamp(2.05rem,4vw,3.1rem)] font-light leading-[1.14]">
              Psicóloga em Araruama · terapia para <span className="font-manuscrita text-[1.18em] font-normal text-ouro-tinta">adolescentes</span> e pré-adolescentes
            </h1>
            <p className="mt-4 font-titulo text-[clamp(1.2rem,2vw,1.5rem)] italic leading-snug text-tinta-2">
              Escuta e cuidado para adolescentes e pré-adolescentes.
            </p>
            <p className="lead mt-5 max-w-[48ch]">
              Atendimento psicológico presencial no Centro de Araruama e online, em um espaço seguro e sem
              julgamentos, com respeito ao ritmo de cada jovem e ao papel da família.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 lg:mt-9 lg:gap-y-4">
              <BotaoWhatsApp referencia={HOME.ref} posicao="topo">Conversar pelo WhatsApp</BotaoWhatsApp>
              <a href="#acompanhamento" className="inline-flex min-h-11 items-center text-[0.74rem] uppercase tracking-[0.16em] text-tinta-2 underline decoration-ouro decoration-1 underline-offset-8 hover:text-ouro-tinta">
                Como funciona
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-2 border-t border-fio pt-5 text-[0.68rem] uppercase tracking-[0.16em] text-suave lg:mt-10 lg:pt-6">
              <li className="inline-flex items-center gap-2"><Wind className="h-3.5 w-3.5 text-ouro-tinta" aria-hidden="true" /> Presencial e online</li>
              <li className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-ouro-tinta" aria-hidden="true" /> Centro · {CONTATO.localidade}</li>
            </ul>
          </div>

          {/* Celular: a foto (a mesma, sem alteração) vem PRIMEIRO no hero, logo abaixo do cabeçalho — decisão do CEO em 17/11/2026,
              ciente de que isso empurra o título e o botão de WhatsApp para baixo da primeira tela (ver medição no AGENTS/registro). */}
          <div className="relative order-first min-h-[300px] sm:min-h-[460px] lg:order-none lg:min-h-[580px]">
            <div className="brilho-foto" aria-hidden="true" />
            <img
              src="/ludiane-hero.webp"
              width={960}
              height={1264}
              alt="Ludiane Figueiredo, psicóloga, sorrindo"
              className="foto-fundida absolute inset-0 h-full w-full object-cover object-[50%_0] mix-blend-multiply"
              {...{ fetchpriority: "high" }} // React 18 só repassa o atributo em minúsculas (`fetchPriority` é descartado)
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ============ COMO POSSO AJUDAR ============ */}
      <section id="ajuda" className="border-y border-fio bg-superficie">
        <div className="container py-20 lg:py-24">
          <Revela className="mx-auto mb-14 max-w-[40rem] text-center">
            <p className="rotulo mb-5">Como posso ajudar</p>
            <h2 className="titulo-secao">Temas que costumam chegar ao consultório</h2>
            <p className="lead mt-5">
              Se você, ou o seu filho, se reconhece em algum deles, uma conversa pode ser um bom ponto de partida.
            </p>
          </Revela>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-fio bg-fio sm:grid-cols-2 lg:grid-cols-4">
            {TEMAS.map((t, i) => {
              const Icone = ICONES_TEMA[t.icone];
              return (
                <Revela como="li" gesto="cartao" atraso={i * 0.06} key={t.titulo} className="bg-superficie p-8">
                  <Icone className="mb-5 h-7 w-7 text-ouro-tinta" strokeWidth={1.3} aria-hidden="true" />
                  <h3 className="mb-2 text-[1.35rem]">{t.titulo}</h3>
                  <p className="text-[0.93rem] leading-relaxed text-suave">{t.texto}</p>
                </Revela>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ============ ACOMPANHAMENTO ============ */}
      <section id="acompanhamento">
        <div className="container py-20 lg:py-24">
          <Revela className="mb-14 max-w-[40rem]">
            <p className="rotulo mb-5">O acompanhamento</p>
            <h2 className="titulo-secao">Como o cuidado acontece</h2>
          </Revela>
          <ol className="grid border-t border-fio md:grid-cols-3">
            {ETAPAS.map((e, i) => (
              <Revela
                como="li"
                atraso={i * 0.06}
                key={e.n}
                className="border-fio py-8 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
              >
                <span className="titulo-num mb-4 block font-titulo text-[2.6rem] leading-none text-ouro">{e.n}</span>
                <h3 className="mb-2 text-[1.4rem]">{e.titulo}</h3>
                <p className="max-w-[34ch] text-[0.95rem] text-suave">{e.texto}</p>
              </Revela>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ SOBRE ============ */}
      <section id="sobre" className="border-y border-fio bg-superficie">
        <div className="container grid gap-12 py-20 lg:grid-cols-[1fr_.85fr] lg:gap-20 lg:py-24">
          <Revela>
            <p className="rotulo mb-5">Sobre mim</p>
            <h2 className="titulo-secao mb-7">Uma escuta que começa pela história de cada jovem</h2>
            <div className="max-w-[56ch] space-y-5 text-suave">
              <p>
                Sou <strong className="font-semibold text-tinta">{PROFISSIONAL.nome}</strong>, psicóloga ({PROFISSIONAL.crp}).
                Atendo pré-adolescentes e adolescentes, presencialmente em Araruama e online.
              </p>
              <p>
                Meu trabalho parte da escuta: entender a história de cada jovem antes de propor qualquer caminho,
                sempre em diálogo com a família e com respeito ao sigilo.
              </p>
            </div>
          </Revela>
          <Revela atraso={0.08}>
            <dl className="divide-y divide-fio border-y border-fio">
              {DADOS_SOBRE.map((d) => (
                <div key={d.rotulo} className="grid grid-cols-[8.5rem_1fr] gap-4 py-4">
                  <dt className="text-[0.68rem] uppercase tracking-[0.2em] text-suave">{d.rotulo}</dt>
                  <dd className="font-titulo text-[1.2rem] text-tinta">{d.valor}</dd>
                </div>
              ))}
            </dl>
          </Revela>
        </div>
      </section>

      {/* ============ PARA OS PAIS (só existe com texto publicado) ============ */}
      {leituras.length > 0 && (
        <section id="para-os-pais" className="border-b border-fio">
          <div className="container py-20 lg:py-24">
            <Revela className="mb-10 max-w-[40rem]">
              <p className="rotulo mb-5">{LISTA.rotulo}</p>
              <h2 className="titulo-secao">{LISTA.titulo}</h2>
              <p className="lead mt-5">{LISTA.abertura}</p>
            </Revela>
            <ul className="grid gap-px overflow-hidden rounded-sm border border-fio bg-fio md:grid-cols-2">
              {leituras.slice(0, 6).map((p) => (
                <li key={p.slug} className="relative bg-superficie p-7">
                  <h3 className="text-[1.3rem] leading-snug">
                    <a className="after:absolute after:inset-0 hover:text-ouro-tinta" href={caminhoDe(p)}>{p.h1}</a>
                  </h3>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <a
                href={LISTA.caminho}
                className="inline-flex min-h-11 items-center text-[0.74rem] uppercase tracking-[0.16em] text-tinta-2 underline decoration-ouro decoration-1 underline-offset-8 hover:text-ouro-tinta"
              >
                Ver todos os textos
              </a>
            </p>
          </div>
        </section>
      )}

      {/* ============ DÚVIDAS ============ */}
      <section id="duvidas">
        <div className="container py-20 lg:py-24">
          <Revela className="mx-auto mb-12 max-w-[40rem] text-center">
            <p className="rotulo mb-5">Dúvidas frequentes</p>
            <h2 className="titulo-secao">Antes de começar</h2>
          </Revela>
          <Revela className="mx-auto max-w-[50rem]">
            {/* <details> em vez de Accordion do Radix: a resposta fica no HTML mesmo fechada
                (o Radix só monta o conteúdo aberto), e o Google e o leitor sem JS a enxergam.
                `name` torna o grupo exclusivo: abrir uma fecha a outra. */}
            <div className="border-t border-fio">
              {DUVIDAS.map((d) => (
                <details key={d.p} name="duvidas" className="group border-b border-fio">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-titulo text-[1.25rem] font-normal text-tinta hover:text-ouro-tinta [&::-webkit-details-marker]:hidden">
                    {d.p}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="max-w-[62ch] pb-6 text-[0.98rem] text-suave">{d.r}</p>
                </details>
              ))}
            </div>
          </Revela>
        </div>
      </section>

      {/* ============ CONTATO ============ */}
      <section id="contato" className="bg-tinta text-papel">
        <div className="container py-20 text-center lg:py-24">
          <Revela>
            <span className="estrela mx-auto mb-6" aria-hidden="true" />
            <h2 className="mx-auto max-w-[20ch] text-[clamp(1.9rem,3.6vw,2.9rem)] font-light leading-[1.15] !text-papel">
              Vamos conversar?
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-papel/80">
              Envie uma mensagem. Respondo para combinarmos a primeira conversa.
            </p>
            <div className="mt-9 flex justify-center">
              <BotaoWhatsApp referencia={HOME.ref} posicao="rodape" claro>Falar pelo WhatsApp</BotaoWhatsApp>
            </div>
            <ul className="mt-12 flex flex-col items-center justify-center gap-x-10 gap-y-3 text-[0.95rem] text-papel/85 sm:flex-row sm:flex-wrap">
              <li>
                <a className="inline-flex items-center gap-2 hover:text-ouro" href={CONTATO.telefoneLink}>
                  <IconeWhatsApp className="h-4 w-4" /> {CONTATO.whatsappRotulo}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-ouro" href={CONTATO.instagramLink} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" aria-hidden="true" /> {CONTATO.instagramRotulo}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2 hover:text-ouro" href={CONTATO.emailLink}>
                  <Mail className="h-4 w-4" aria-hidden="true" /> {CONTATO.email}
                </a>
              </li>
            </ul>
          </Revela>
        </div>
      </section>
    </main>

    <Rodape />
  </>
  );
};

export default Index;
