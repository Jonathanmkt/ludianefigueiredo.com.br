# AGENTS.md — ludianefigueiredo.com.br

Site de página única da psicóloga **Ludiane Figueiredo** (CRP 05/56264): atendimento online para
pré-adolescentes e adolescentes. Montado em 12/11/2026 a partir da prévia "Marca" aprovada pelo CEO
(`comunicacao/editor-de-video/apresentacoes/ludiane-figueiredo-home/`) e da identidade do cartão de visita.

**Estado: pronto para publicar, ainda NÃO publicado.** O deploy espera o CEO comprar o domínio e pedir.

## Stack — a mesma do `virtuetech.com.br`

- **Vite 5** + **React 18** + **TypeScript**, **pré-renderizado no build** (ver "Pré-renderização")
- **Tailwind CSS 3** + **shadcn/ui** (Radix) — só o que a página usa: `Button`. As dúvidas são `<details>` nativo (o Radix só monta a resposta aberta, e ela precisa estar no HTML)
- **Framer Motion** sob `LazyMotion` (use `m`, **nunca** `motion` — ver `src/App.tsx`)
- **lucide-react** para ícones; o logotipo do WhatsApp é SVG próprio (`src/components/Icones.tsx`)
- `react-router-dom` para as rotas (`BrowserRouter` no navegador, `StaticRouter` no build). Alias `@` → `./src`.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento, porta 8080
npm run build    # tsc + vite build + build SSR + scripts/prerender.mjs → dist/ com o HTML de cada rota
npm run lint
```

## O que está onde

| Arquivo | O que responde |
|---|---|
| [src/data/conteudo.ts](src/data/conteudo.ts) | **todo o texto, o CRP e os contatos** — trocar conteúdo é aqui |
| [src/data/paginas.ts](src/data/paginas.ts) | **o registro dos 12 textos "Para os pais"** (metadados: slug, título, descrição, H1, `ref`, grupo, `publicada`, `atualizadaEm`) e a `LISTA` (rótulo, caminho, abertura). Só `publicada: true` entra no build, no sitemap, no menu e nos links |
| [src/conteudo/para-os-pais/](src/conteudo/para-os-pais/LEIAME.md) | **o corpo de cada texto, em Markdown** (`<slug>.md`, com front matter). Formato e regras no [LEIAME](src/conteudo/para-os-pais/LEIAME.md); modelo em `_exemplo.md` |
| [src/lib/seo.ts](src/lib/seo.ts) | o que vai no `<head>` de cada rota: título, descrição, canonical, Open Graph, **JSON-LD** (`@graph`: WebSite, Person, ProfessionalService, BreadcrumbList) e o sitemap |
| [scripts/texto-md.mjs](scripts/texto-md.mjs), [scripts/vite-textos.mjs](scripts/vite-textos.mjs) | lêem os `.md` no build (`marked` + `js-yaml`, só devDependencies): validam o front matter, recusam HTML cru e termos proibidos, calculam o tempo de leitura |
| [src/lib/textos.ts](src/lib/textos.ts), [src/lib/dados-texto.ts](src/lib/dados-texto.ts) | confere `.md` × registro (o build falha se discordam) e leva o corpo ao HTML. **`textos.ts` nunca pode entrar no bundle do navegador** |
| [src/pages/Index.tsx](src/pages/Index.tsx) | a home: seções e ordem |
| [src/pages/PaginaTexto.tsx](src/pages/PaginaTexto.tsx), [ListaParaOsPais.tsx](src/pages/ListaParaOsPais.tsx) | o gabarito de um texto (trilha, H1, autoria, sumário, corpo, fontes, WhatsApp, "Leia também") e a página-lista `/para-os-pais/`, agrupada por tema |
| [src/entry-server.tsx](src/entry-server.tsx), [scripts/prerender.mjs](scripts/prerender.mjs) | a pré-renderização (abaixo) |
| [src/components/BotaoWhatsApp.tsx](src/components/BotaoWhatsApp.tsx), [Rodape.tsx](src/components/Rodape.tsx) | o botão (leva o `ref` da página) e o rodapé (leituras publicadas, frase de privacidade) |
| [src/components/Cabecalho.tsx](src/components/Cabecalho.tsx) | cabeçalho e menu do celular |
| [src/components/Revela.tsx](src/components/Revela.tsx), [src/lib/movimento.ts](src/lib/movimento.ts) | o sistema de movimento (mesmo da VirtueTech): entrada ao rolar, tempos e curvas |
| [src/index.css](src/index.css) | tokens do design system e a máscara da foto |
| [index.html](index.html) | o molde de todas as rotas: só o que é comum. Entre `<!--head-rota-->` e `<!--/head-rota-->` o build injeta o `<head>` da rota; `<!--app-->` recebe o HTML do React. **Não escreva título nem JSON-LD aqui** |

⚠️ O CRP e os contatos agora vêm **só de `conteudo.ts`** (o JSON-LD é gerado por `seo.ts`). O domínio ainda
mora em `public/robots.txt`, `public/CNAME` e no `SITE` de `seo.ts` (derivado de `CONTATO.site`).
O telefone do JSON-LD está escrito em `seo.ts` (`+55 22 98829-4387`): mudou o número? Mude lá também.

## Pré-renderização (o HTML que o Google recebe)

`npm run build` roda três passos: `vite build` (cliente, `dist/`) → `vite build --ssr src/entry-server.tsx`
(`dist-ssr/`, ignorado pelo git) → `node scripts/prerender.mjs`. O script renderiza cada rota com
`react-dom/server` e grava `dist/<slug>/index.html` (a home em `dist/index.html`), `dist/404.html` e `dist/sitemap.xml`.
O `main.tsx` **hidrata** esse HTML (`hydrateRoot`); no `npm run dev` a raiz está vazia e ele monta normalmente.

- **Texto novo ou publicação:** metadados em `paginas.ts` + o `.md` em `src/conteudo/para-os-pais/`. Ambos nascem `publicada: false`;
  o build **falha** se `.md` e registro discordam em qualquer campo. Rascunhos abrem no `npm run dev` (com aviso) e **não** saem no build.
  **Só vira `true` com a aprovação da psicóloga**, nos dois lugares. O `ref` de WhatsApp é neutro (`A1…A12`; `A0` é a home) e **nunca nomeia tema**.
- **O corpo dos textos não vai no JavaScript.** O `prerender.mjs` grava os dados do texto num `<script type="application/json" id="dados-texto">`
  (inerte) e o `main.tsx` os lê dali para hidratar. A home só carrega números (`TEMPOS`, minutos de leitura). Conferir o tamanho do JS no build.
- **Lista, item de menu e faixa da home** ("Para os pais") só existem com ao menos um texto publicado.
- **URLs com barra final** (`/slug/`): é o que o GitHub Pages serve de `slug/index.html`; canonical, sitemap e links usam isso.
- **`lastmod`** do sitemap vem de `atualizadaEm` (a da home é `HOME.atualizadaEm` em `paginas.ts` — **atualize ao mexer na home**).
- **404:** `dist/404.html` tem `noindex` e é gerado pelo build. O workflow **não** o sobrescreve (a cópia `index.html → 404.html` saiu).
- **Sem JavaScript:** `Revela` nasce com opacidade 0; um `<noscript><style>` em `index.html` revela tudo (`[data-revela]`).
- **`fetchpriority` em minúsculas** na foto do herói: o React 18 descarta `fetchPriority`.
- **Search Console:** `public/google105ec52e2c3d93b0.html` verifica o domínio. **Não remover nunca.**

## Os arquivos gerados, e como regerá-los

Nenhum se edita à mão; cada script explica no cabeçalho por que existe.

```bash
python scripts/gera-fontes.py    # public/fontes/*.woff2 e src/fontes.css (Cormorant Garamond, Karla, Parisienne)
python scripts/gera-imagens.py   # public/ludiane-hero.webp, marca-ludiane.{svg,png}, og-ludiane.png
```

**Os mestres versionados estão em `scripts/marca/`**: `logo-lf.path` (o monograma em vetor) e
`ludiane-hero-origem.jpg` (a foto do ensaio de 09/11/2026). Trocou a foto ou a marca? Substitua o
mestre e rode o script. `scripts/fonte/` é cache e não entra no git.

## Decisões que não são óbvias pelo código

- **Medição sem tag:** o link de WhatsApp (`whatsappLink(ref)` em `conteudo.ts`) leva um código neutro na mensagem pronta.
- **Origem de campanha (`?o=`):** quem chega por anúncio traz `?o=G1` no endereço (só letras e números, até 6). O
  `BotaoWhatsApp` lê isso **no navegador, depois de montar** (o HTML pré-renderizado sai sem origem, para a hidratação não
  divergir) e põe `A0-G1` na mensagem. Nada é gravado nem enviado a terceiro. **Os códigos das campanhas moram em
  `marketing/gestor-de-trafego-google/campanhas/`**; o código nunca nomeia tema, sintoma nem condição.
- **JSON-LD por rota:** o texto leva também um `Article` (autoria da `Person`, `datePublished`/`dateModified` = `atualizadaEm`)
  e `og:type=article`. Mexeu no texto? Atualize `atualizadaEm` no `.md` **e** em `paginas.ts` (o build falha se divergirem).
- **A home cita "Araruama, RJ" já no primeiro parágrafo**, junto de "online": é a página de destino do anúncio de busca, e a
  relevância da página pesa na qualidade do anúncio.
- **Nenhuma requisição a terceiro.** Fontes servidas pelo próprio domínio, sem analytics, sem
  cookie, sem formulário. É o que sustenta a frase do rodapé *"não coleta dados pessoais nem usa
  cookies"* — **acrescentar qualquer script de terceiro exige tirar essa frase e rever a LGPD**.
- **O dourado do cartão é `ouro` (#B99A62) e só decora.** Sobre o creme ele dá 2,3:1 e reprova;
  texto dourado usa `ouro-tinta`. Sobre o carvão (`bg-tinta`) o `ouro` passa (4,65:1).
- **Sem `scroll-behavior: smooth`**, de propósito. Movimento reduzido TROCA o gesto por esmaecer
  puro; não o remove.
- **O pedido da página é um só: conversar pelo WhatsApp.** O link já leva a mensagem pronta.
- **Números em algarismos alinhados** (`lining-nums`), como no cartão de visita.

## ⚠️ Conteúdo regulado — leia antes de mudar texto

Divulgação de psicólogo segue o Código de Ética e a Res. CFP 3/2007 (arts. 53–58). Parecer do
Jurídico: `administrativo/assessor-juridico/analises/psicologa-clinica-publicidade-e-captacao.md`.
**Não entra no site:** depoimento · antes e depois · número de pacientes · promessa de resultado ·
**preço** · desconto ou "primeira sessão grátis" · "especialista em Psicologia Clínica" ·
**qualquer menção à plataforma de relatórios** (só depois da consulta ao CRP-RJ). **Toda página leva
nome completo, "psicóloga" e o CRP.**

## Pendências de conteúdo (não bloqueiam o deploy, mas o CEO e a Ludiane decidem)

| Item | Situação |
|---|---|
| **Formação / bio** | a seção "Sobre mim" não cita formação: o nome exato do curso e da instituição ainda não foi informado. A prévia citava "TCC", que **não foi confirmado** e saiu |
| **Localidade** | "Araruama, RJ" vem da estratégia do CEO (06/11/2026). Confirmar se é o endereço que ela quer divulgar |
| **Textos** | redigidos a partir da prévia, ajustados para o público real (adolescentes, não adultos) e para as regras acima. Validar a voz com a Ludiane |
| **Abordagem terapêutica** | em aberto (decisão dela); o site não nomeia nenhuma |

## Deploy — GitHub Pages (padrão da casa), quando o CEO pedir

Igual ao `virtuetech.com.br`: **GitHub Actions → GitHub Pages**, definido em
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). Todo push na `main` publica.

1. Criar o repositório remoto e apontar o `origin` (CEO/devops) — **ainda não existe**.
2. Settings → Pages → *Build and deployment* = **GitHub Actions**.
3. `public/CNAME` já contém `ludianefigueiredo.com.br` — **não apagar**.
4. DNS na **Cloudflare**, com o proxy **desligado (DNS only)** no apex e no `www`: apex para os 4 IPs do Pages
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`); `www` como CNAME para `<usuario>.github.io`. **É do `devops-infra`.**
5. Depois do certificado emitido, ligar *Enforce HTTPS*.

## Convenções

- Interface em **pt-BR**, `lang="pt-BR"` no `<html>`.
- O que o site promete, para quem e a oferta é decisão de negócio: **não se inventa aqui**.
