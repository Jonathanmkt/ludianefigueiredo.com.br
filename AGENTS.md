# AGENTS.md — ludianefigueiredo.com.br

Site de página única da psicóloga **Ludiane Figueiredo** (CRP 05/56264): atendimento online para
pré-adolescentes e adolescentes. Montado em 12/11/2026 a partir da prévia "Marca" aprovada pelo CEO
(`comunicacao/editor-de-video/apresentacoes/ludiane-figueiredo-home/`) e da identidade do cartão de visita.

**Estado: pronto para publicar, ainda NÃO publicado.** O deploy espera o CEO comprar o domínio e pedir.

## Stack — a mesma do `virtuetech.com.br`

- **Vite 5** + **React 18** + **TypeScript**
- **Tailwind CSS 3** + **shadcn/ui** (Radix) — só o que a página usa: `Button` e `Accordion`
- **Framer Motion** sob `LazyMotion` (use `m`, **nunca** `motion` — ver `src/App.tsx`)
- **lucide-react** para ícones; o logotipo do WhatsApp é SVG próprio (`src/components/Icones.tsx`)
- `react-router-dom` só para a rota de erro. Alias `@` → `./src`.

## Comandos

```bash
npm run dev      # servidor de desenvolvimento, porta 8080
npm run build    # tsc + vite build → dist/
npm run lint
```

## O que está onde

| Arquivo | O que responde |
|---|---|
| [src/data/conteudo.ts](src/data/conteudo.ts) | **todo o texto, o CRP e os contatos** — trocar conteúdo é aqui |
| [src/pages/Index.tsx](src/pages/Index.tsx) | a página: seções e ordem |
| [src/components/Cabecalho.tsx](src/components/Cabecalho.tsx) | cabeçalho e menu do celular |
| [src/components/Revela.tsx](src/components/Revela.tsx), [src/lib/movimento.ts](src/lib/movimento.ts) | o sistema de movimento (mesmo da VirtueTech): entrada ao rolar, tempos e curvas |
| [src/index.css](src/index.css) | tokens do design system e a máscara da foto |
| [index.html](index.html) | título, descrição, canônico, Open Graph, **JSON-LD** e o `<noscript>` |

⚠️ O CRP e os contatos também moram em **HTML puro** no `index.html` (JSON-LD e `<noscript>`) e no
`public/robots.txt`/`sitemap.xml` (domínio). Mudou um dado em `conteudo.ts`? Confira o `index.html`.

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

1. Criar o repositório e apontar o `origin` (CEO/devops) — **ainda não existe**; esta pasta não é um repositório git.
2. Settings → Pages → *Build and deployment* = **GitHub Actions**.
3. `public/CNAME` já contém `ludianefigueiredo.com.br` — **não apagar**.
4. DNS na **Cloudflare**, com o proxy **desligado (DNS only)** no apex e no `www`: apex para os 4 IPs do Pages
   (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`); `www` como CNAME para `<usuario>.github.io`. **É do `devops-infra`.**
5. Depois do certificado emitido, ligar *Enforce HTTPS*.

## Convenções

- Interface em **pt-BR**, `lang="pt-BR"` no `<html>`.
- O que o site promete, para quem e a oferta é decisão de negócio: **não se inventa aqui**.
