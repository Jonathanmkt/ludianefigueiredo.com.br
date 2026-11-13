# Como escrever um texto "Para os pais"

Cada texto é **um arquivo Markdown nesta pasta**, com o nome igual ao `slug` do texto:
`src/conteudo/para-os-pais/<slug>.md`. A lista dos 12 textos, com os slugs, está em `src/data/paginas.ts`.
Um arquivo pronto para copiar é o [`_exemplo.md`](_exemplo.md) (arquivos que começam com `_` são ignorados pelo build).

## O front matter

O arquivo começa com um bloco entre duas linhas `---`, em YAML. **Todos os campos são obrigatórios.**

| Campo | Tipo | Regra |
|---|---|---|
| `titulo` | texto | O `<title>` da página. **Igual ao de `paginas.ts`.** |
| `descricao` | texto | Até **155 caracteres**. Sem promessa e sem medo. **Igual ao de `paginas.ts`.** |
| `h1` | texto | O título que aparece na página. **Igual ao de `paginas.ts`.** |
| `ref` | texto | Código neutro do WhatsApp: `A1` … `A12`. Nunca nomeia tema. **Igual ao de `paginas.ts`.** |
| `grupo` | texto | `Para começar` · `Emoções` · `Escola` · `Em casa` · `Terapia`. **Igual ao de `paginas.ts`.** |
| `atualizadaEm` | texto `"AAAA-MM-DD"` | Data da revisão. Aparece como "atualizado em" e vira o `lastmod` do sitemap. |
| `publicada` | `true` ou `false` | **Sem aspas.** Fica `false` até a psicóloga aprovar. Precisa ser igual ao de `paginas.ts`. |
| `fontes` | lista | Cada item: `instituicao`, `titulo`, `url` (**https**), `ano`. Pode ser `[]` enquanto for rascunho; **texto publicado exige ao menos 1**. |
| `relacionados` | lista de slugs | Os "Leia também". Pode ser `[]`. Só os já publicados aparecem. |

Nenhum outro campo é aceito. Se o `.md` e o `paginas.ts` discordarem em `titulo`, `descricao`, `h1`, `ref`, `grupo`,
`atualizadaEm` ou `publicada`, **o build falha** dizendo qual — assim ninguém publica por engano.

## O corpo

- **Markdown puro. Sem HTML cru** (o build recusa), sem imagem, sem `# ` (o H1 vem do front matter).
- Cada **seção começa com um `##` em forma de pergunta** ("Quando vale buscar ajuda?"). Os `##` viram o sumário da página.
  Dentro da seção, `###` é opcional. Não use `####`.
- Parágrafos curtos, listas e **negrito** para o que o pai precisa guardar. Alvo: **800 a 1.200 palavras**.
- Links: `https://…` (fonte externa), um caminho do site (`/para-os-pais/…`) ou uma âncora (`#…`).
- O **tempo de leitura** é calculado sozinho (200 palavras por minuto).
- O **bloco "Fontes"**, o botão de WhatsApp, e os relacionados são montados pela
  página — **não os escreva no corpo**.

## O que o build recusa no corpo

Preço (`R$`), "grátis", desconto, "especialista em", depoimento, "a melhor", garantia/promessa de resultado, "cura" e a
plataforma de relatórios. É a regra do Jurídico para divulgação de psicólogo (Res. CFP 3/2007) — o texto clínico é da psicóloga
e **nada é publicado sem a aprovação dela**. Não invente formação, título, método, caso real nem número.

## Como ver o resultado

`npm run dev` abre os rascunhos (com o aviso RASCUNHO) em `/para-os-pais/<slug>/`. `npm run build` só gera o que está
`publicada: true` **nos dois lugares**.
