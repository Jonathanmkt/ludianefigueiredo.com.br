import Cabecalho from "@/components/Cabecalho";
import BotaoWhatsApp from "@/components/BotaoWhatsApp";
import Rodape from "@/components/Rodape";
import { CONTATO, PROFISSIONAL } from "@/data/conteudo";
import { PRIVACIDADE, dataBR } from "@/data/paginas";

const LINK = "underline decoration-fio-2 underline-offset-4 hover:text-ouro-tinta";

/**
 * A página de privacidade. Curta e honesta: diz só o que o site de fato faz.
 * ⚠️ Mudou a medição (tag, evento, rota da tag)? Mude este texto junto — ele é a promessa do rodapé.
 */
const Privacidade = () => (
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
            <li aria-current="page">{PRIVACIDADE.rotulo}</li>
          </ol>
        </nav>

        <h1 className="max-w-[24ch] text-balance text-[clamp(2rem,4vw,3rem)] font-light leading-[1.15]">{PRIVACIDADE.h1}</h1>
        <p className="lead mt-5 max-w-[56ch]">
          Este site é de {PROFISSIONAL.nome}, {PROFISSIONAL.profissao.toLowerCase()}, {PROFISSIONAL.crp}. Aqui está, sem rodeio, o que ele mede.
        </p>

        <div className="mt-10 flex max-w-[62ch] flex-col gap-4 leading-relaxed">
          <h2 className="rotulo mt-6">O que o site mede</h2>
          <p>
            Em todas as páginas o site usa o Google Analytics para medir as visitas: quais páginas foram vistas, de onde veio o clique
            (o código curto da origem, como o de um anúncio) e quantas vezes o botão do WhatsApp foi tocado. Isso é contado sem identificar
            pessoas: sem nome, sem telefone e sem o que você escreve na conversa. O endereço IP é anonimizado.
          </p>
          <p>
            Só na página inicial o Google Ads também mede conversões, para saber quantas visitas vindas de anúncio tocam no botão do
            WhatsApp.
          </p>
          <p>
            A personalização de anúncios está desligada: o site não cria listas de visitantes nem faz remarketing. Para fazer a medição, o Google
            pode gravar um cookie no seu navegador; você pode bloquear ou apagar cookies nas configurações dele.
          </p>

          <h2 className="rotulo mt-6">Fora do Brasil</h2>
          <p>
            O Google pode tratar os dados dessas medições em servidores fora do Brasil, conforme as próprias regras dele.
          </p>

          <h2 className="rotulo mt-6">Quem hospeda</h2>
          <p>
            O site fica no GitHub Pages, que registra o endereço IP de quem acessa, como todo servidor de internet faz. Ele não tem formulário nem
            conta, e as fontes vêm do próprio endereço do site.
          </p>

          <h2 className="rotulo mt-6">O WhatsApp</h2>
          <p>
            Ao tocar no botão, você abre uma conversa direta comigo. A mensagem já vem pronta, com um código curto que me diz de qual página
            você veio. A conversa segue as regras do WhatsApp e o sigilo profissional da Psicologia.
          </p>

          <h2 className="rotulo mt-6">Dúvidas</h2>
          <p>
            Qualquer dúvida sobre isto, ou sobre os seus dados, é só falar comigo pelo WhatsApp, {CONTATO.whatsappRotulo}.
          </p>
          <p className="text-[0.8rem] text-suave">
            Atualizado em <time dateTime={PRIVACIDADE.atualizadaEm}>{dataBR(PRIVACIDADE.atualizadaEm)}</time>.
          </p>
        </div>

        <aside aria-label="Conversar" className="mt-16 bg-tinta px-7 py-9 text-center text-papel">
          <p className="mx-auto mb-6 max-w-[38ch] font-titulo text-[1.5rem] leading-snug">Ficou com alguma dúvida?</p>
          <BotaoWhatsApp referencia={PRIVACIDADE.ref} posicao="pagina_texto" claro>Falar pelo WhatsApp</BotaoWhatsApp>
        </aside>
      </div>
    </main>

    <Rodape />
  </>
);

export default Privacidade;
