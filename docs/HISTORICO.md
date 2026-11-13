# Histórico do projeto

Append-only, mais recente primeiro.

## 2026-11-13 — Pré-renderização, seção "Para os pais" e ajustes de SEO

**O quê:** o site deixou de ser uma página única entregue vazia ao Google. O build agora pré-renderiza HTML por rota (title, description, canonical, Open Graph, JSON-LD, sitemap gerado, 404 com noindex). Nasceu a seção "Para os pais" com página-lista e 12 textos em Markdown. A home passou a citar "Araruama, RJ" e "online" no primeiro parágrafo; o botão de WhatsApp aceita código de origem de campanha (`?o=G1` → mensagem `A0-G1`); entrou o arquivo de verificação do Search Console. O Accordion do Radix foi removido (dúvidas em `<details>`) e o aviso de urgência do rodapé saiu.
**Por quê:** página única renderizada só no cliente não dava ao Google conteúdo para indexar, e a campanha de anúncios precisa de páginas de destino e de saber de qual campanha veio cada contato, sem instalar rastreador. Os 12 textos foram publicados (`publicada: true`) por aprovação do CEO e da psicóloga, com revisão do Jurídico. Accordion e aviso de urgência saíram por decisão do CEO (motivo não registrado além disso).
**Arquivos-chave:** `scripts/prerender.mjs`, `src/lib/seo.ts`, `src/conteudo/para-os-pais/`, `src/pages/PaginaTexto.tsx`, `.github/workflows/deploy.yml`
