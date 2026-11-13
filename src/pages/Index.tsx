import { CloudRain, HeartPulse, Instagram, Mail, MapPin, Sprout, Users, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Cabecalho from "@/components/Cabecalho";
import Revela from "@/components/Revela";
import { IconeWhatsApp } from "@/components/Icones";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CONTATO, DADOS_SOBRE, DUVIDAS, ETAPAS, PROFISSIONAL, TEMAS } from "@/data/conteudo";

const ICONES_TEMA: Record<(typeof TEMAS)[number]["icone"], LucideIcon> = {
  ansiedade: Wind,
  humor: CloudRain,
  autoestima: Sprout,
  relacoes: Users,
};

/** O botão da casa: pílula carvão, texto creme. Sempre um link (`asChild`), nunca um <button> que navega. */
const BotaoWhatsApp = ({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) => (
  <Button
    asChild
    size="lg"
    className={
      claro
        ? "h-12 rounded-full bg-papel px-7 font-corpo text-[0.9rem] text-tinta hover:bg-superficie"
        : "h-12 rounded-full bg-tinta px-7 font-corpo text-[0.9rem] text-papel shadow-[0_26px_50px_-30px_rgba(60,50,30,.7)] hover:bg-tinta-2"
    }
  >
    <a href={CONTATO.whatsappLink} target="_blank" rel="noopener noreferrer">
      <IconeWhatsApp className="!size-5" />
      {children}
    </a>
  </Button>
);

const Index = () => (
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
          <div className="order-2 self-center py-10 lg:order-1 lg:py-24">
            <Revela>
              <span className="estrela mb-6" aria-hidden="true" />
              <h1 className="max-w-[17ch] text-[clamp(2.2rem,4.4vw,3.4rem)] font-light leading-[1.12]">
                Escuta e cuidado para <span className="font-manuscrita text-[1.18em] font-normal text-ouro-tinta">adolescentes</span> e pré-adolescentes.
              </h1>
            </Revela>
            <Revela atraso={0.08}>
              <p className="lead mt-6 max-w-[48ch]">
                Atendimento psicológico online, em um espaço seguro e sem julgamentos, com respeito ao ritmo de cada
                jovem e ao papel da família.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <BotaoWhatsApp>Conversar pelo WhatsApp</BotaoWhatsApp>
                <a href="#acompanhamento" className="text-[0.74rem] uppercase tracking-[0.16em] text-tinta-2 underline decoration-ouro decoration-1 underline-offset-8 hover:text-ouro-tinta">
                  Como funciona
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-2 border-t border-fio pt-6 text-[0.68rem] uppercase tracking-[0.16em] text-suave">
                <li className="inline-flex items-center gap-2"><Wind className="h-3.5 w-3.5 text-ouro-tinta" aria-hidden="true" /> Atendimento online</li>
                <li className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-ouro-tinta" aria-hidden="true" /> {CONTATO.localidade}</li>
              </ul>
            </Revela>
          </div>

          <Revela gesto="imagem" className="relative order-1 min-h-[440px] sm:min-h-[560px] lg:order-2 lg:min-h-[580px]">
            <div className="brilho-foto" aria-hidden="true" />
            <img
              src="/ludiane-hero.webp"
              width={960}
              height={1264}
              alt="Ludiane Figueiredo, psicóloga, sorrindo"
              className="foto-fundida absolute inset-0 h-full w-full object-cover object-[50%_0] mix-blend-multiply"
              fetchPriority="high"
              decoding="async"
            />
          </Revela>
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
                Atendo pré-adolescentes e adolescentes de forma online.
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

      {/* ============ DÚVIDAS ============ */}
      <section id="duvidas">
        <div className="container py-20 lg:py-24">
          <Revela className="mx-auto mb-12 max-w-[40rem] text-center">
            <p className="rotulo mb-5">Dúvidas frequentes</p>
            <h2 className="titulo-secao">Antes de começar</h2>
          </Revela>
          <Revela className="mx-auto max-w-[50rem]">
            <Accordion type="single" collapsible className="border-t border-fio">
              {DUVIDAS.map((d, i) => (
                <AccordionItem value={`d${i}`} key={d.p} className="border-b border-fio">
                  <AccordionTrigger className="py-6 text-left font-titulo text-[1.25rem] font-normal text-tinta hover:text-ouro-tinta hover:no-underline">
                    {d.p}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[62ch] pb-6 text-[0.98rem] text-suave">{d.r}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              <BotaoWhatsApp claro>Falar pelo WhatsApp</BotaoWhatsApp>
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

    {/* ============ RODAPÉ ============ */}
    <footer className="bg-tinta text-papel/70">
      <div className="container flex flex-col gap-2 border-t border-papel/15 py-7 text-[0.78rem] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © 2026 {PROFISSIONAL.nome} · {PROFISSIONAL.profissao} · {PROFISSIONAL.crp}
        </span>
        <span>Este site não coleta dados pessoais nem usa cookies.</span>
      </div>
    </footer>
  </>
);

export default Index;
