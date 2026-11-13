# ludianefigueiredo.com.br

Site da psicóloga Ludiane Figueiredo (psicologia para adolescentes, Araruama, RJ, e online). Publicado no GitHub Pages.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # tsc + build do cliente + build SSR + pré-renderização
npm run lint
```

## O que o site tem

- Página inicial e página 404 (com `noindex`).
- Seção **Para os pais**: página-lista e 12 textos educativos em Markdown (`src/conteudo/para-os-pais/`). Cada texto tem `publicada: true|false` no cabeçalho; só os publicados entram no site e no sitemap.
- **Pré-renderização no build**: `scripts/prerender.mjs` gera um HTML pronto por rota, com title, description, canonical, Open Graph e JSON-LD vindos de `src/lib/seo.ts`; o `sitemap.xml` também é gerado no build.
- Botão de WhatsApp com código de origem de campanha: `?o=G1` na URL vira a mensagem `A0-G1`. Não há rastreador.
- Verificação do Search Console em `public/google105ec52e2c3d93b0.html`.

O workflow `.github/workflows/deploy.yml` roda o build completo e publica `dist/`.
