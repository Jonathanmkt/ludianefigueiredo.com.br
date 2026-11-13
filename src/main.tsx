import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { DadosTextoContext } from "./lib/dados-texto";
import "./index.css";

const raiz = document.getElementById("root")!;
// Nos textos "Para os pais" o build deixa o corpo num JSON inerte (não é script executável): ver `lib/dados-texto.ts`.
const json = document.getElementById("dados-texto");
const dados = json ? JSON.parse(json.textContent ?? "null") : null;
const app = (
  <DadosTextoContext.Provider value={dados}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DadosTextoContext.Provider>
);

// No build, cada rota já vem com o HTML pronto: hidrata. No `npm run dev` a raiz está vazia: monta.
if (raiz.firstElementChild) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
