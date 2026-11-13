/* ===========================================================================
   O conteúdo do site — fonte única. Trocar texto, contato ou CRP é aqui.

   ⚠️ Os dados de contato e o CRP foram conferidos com a psicóloga em 12/11/2026
   (mesmos do cartão de visita). Se mudar um, mude aqui: a página, o rodapé, o
   JSON-LD do index.html e o <noscript> usam estes valores — e os dois últimos
   moram em HTML puro, então precisam ser alterados à mão no `index.html`.

   ⚠️ Texto de divulgação de psicólogo é regulado (Código de Ética, Res. CFP
   3/2007, arts. 53 a 58). O que NÃO entra, e por quê:
     · depoimento, antes e depois, número de pacientes   → vedado
     · promessa de resultado, "garantia", "cura"          → vedado
     · preço, desconto, "primeira sessão grátis"          → vedado em divulgação
     · "especialista em Psicologia Clínica"               → sugere título que
                                                            o Conselho confere
     · menção à plataforma de relatórios                  → só depois da consulta
                                                            ao CRP-RJ
   Toda peça leva nome completo, "psicóloga" e o CRP.
   =========================================================================== */

export const PROFISSIONAL = {
  nome: "Ludiane Figueiredo",
  profissao: "Psicóloga",
  crp: "CRP 05/56264",
} as const;

export const CONTATO = {
  whatsappRotulo: "(22) 98829-4387",
  telefoneLink: "tel:+5522988294387",
  instagramRotulo: "@ludianebfigueiredo",
  instagramLink: "https://www.instagram.com/ludianebfigueiredo/",
  email: "contato@ludianefigueiredo.com.br",
  emailLink: "mailto:contato@ludianefigueiredo.com.br",
  site: "ludianefigueiredo.com.br",
  localidade: "Araruama, RJ",
  endereco: "Edifício Delfim Carvalho, Avenida Brasil, 10, sala 514, Centro, Araruama, RJ",
  horarioPresencial: "Terça a quinta, das 13h às 17h",
} as const;

/** O número de WhatsApp, só os dígitos, no formato do `wa.me`. */
const WHATSAPP_NUMERO = "5522988294387";

/**
 * O link de WhatsApp de uma página, com a mensagem pronta e o código de origem (`ref`) dentro dela.
 * É a medição sem tag: o código chega na primeira mensagem e a psicóloga sabe de qual página veio.
 *
 * ⚠️ O código é NEUTRO: `A0` é a home e `A1…An` são as páginas internas (ver `data/paginas.ts`).
 * Ele nunca nomeia tema, sintoma nem condição — a mensagem de um adolescente não pode revelar
 * por si só o assunto da família (parecer do Jurídico de 13/11/2026).
 */
export const whatsappLink = (ref: string): string =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=` +
  encodeURIComponent(`Olá, Ludiane! Vim pelo site (ref. ${ref}) e gostaria de conversar sobre o atendimento.`);


export const NAVEGACAO = [
  { rotulo: "Início", href: "#inicio" },
  { rotulo: "Como posso ajudar", href: "#ajuda" },
  { rotulo: "Acompanhamento", href: "#acompanhamento" },
  { rotulo: "Sobre mim", href: "#sobre" },
  { rotulo: "Dúvidas", href: "#duvidas" },
  { rotulo: "Contato", href: "#contato" },
] as const;

export const TEMAS = [
  {
    icone: "ansiedade",
    titulo: "Ansiedade",
    texto: "Preocupação constante, medo e tensão que atrapalham o dia a dia, a escola e o sono.",
  },
  {
    icone: "humor",
    titulo: "Humor e desânimo",
    texto: "Tristeza, irritação e falta de energia ou de interesse pelo que antes fazia sentido.",
  },
  {
    icone: "autoestima",
    titulo: "Autoestima",
    texto: "Autocrítica dura, insegurança com a própria imagem e dificuldade de se reconhecer.",
  },
  {
    icone: "relacoes",
    titulo: "Relações e escola",
    texto: "Conflitos com família e amigos, pressão escolar e as mudanças próprias da idade.",
  },
] as const;

export const ETAPAS = [
  {
    n: "01",
    titulo: "Primeira conversa",
    texto: "Conhecemos a história, a queixa e as expectativas, com a participação dos responsáveis.",
  },
  {
    n: "02",
    titulo: "Escuta e cuidado",
    texto: "Sessões presenciais ou online, com escuta atenta, no ritmo de cada jovem, em um ambiente seguro e sigiloso.",
  },
  {
    n: "03",
    titulo: "Acompanhamento",
    texto:
      "O processo é revisto ao longo do tempo. Aos responsáveis compartilho o essencial, respeitando o sigilo profissional.",
  },
] as const;

export const DADOS_SOBRE = [
  { rotulo: "Registro", valor: PROFISSIONAL.crp },
  { rotulo: "Formação", valor: "Pós-graduação em Psicologia Baseada em Evidências" },
  { rotulo: "Público", valor: "Pré-adolescentes e adolescentes" },
  { rotulo: "Atendimento", valor: "Presencial e online" },
  { rotulo: "Endereço", valor: CONTATO.endereco },
  { rotulo: "Horário presencial", valor: CONTATO.horarioPresencial },
] as const;

export const DUVIDAS = [
  {
    p: "Onde é o atendimento presencial?",
    r: `No Centro de Araruama, no Edifício Delfim Carvalho (Avenida Brasil, 10, sala 514). ${CONTATO.horarioPresencial}. Para marcar, é só falar pelo WhatsApp.`,
  },
  {
    p: "Como funciona o atendimento online?",
    r: "As sessões acontecem por videochamada, em horário combinado. Basta um lugar tranquilo e privado e uma boa conexão com a internet.",
  },
  {
    p: "Qual a faixa etária atendida?",
    r: "Atendo pré-adolescentes e adolescentes. Se tiver dúvida sobre a idade, é só me escrever pelo WhatsApp.",
  },
  {
    p: "Os pais ou responsáveis participam?",
    r: "Participam da primeira conversa e autorizam o atendimento por escrito, como pede a ética profissional. O que acontece nas sessões é sigiloso: aos responsáveis compartilho apenas o essencial para o cuidado.",
  },
  {
    p: "Como agendo uma conversa?",
    r: "Pelo WhatsApp. Os horários disponíveis e os valores são informados diretamente, antes de começarmos.",
  },
  {
    p: "O que é conversado nas sessões online é sigiloso?",
    r: "Sim. O sigilo profissional vale no atendimento online da mesma forma. Aos responsáveis compartilho apenas o essencial para o cuidado, e é importante que o jovem tenha um lugar tranquilo e privado durante a sessão.",
  },
] as const;
