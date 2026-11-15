import { Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Index from "./pages/Index";
import NaoEncontrada from "./pages/NaoEncontrada";
import PaginaTexto from "./pages/PaginaTexto";
import ListaParaOsPais from "./pages/ListaParaOsPais";
import Privacidade from "./pages/Privacidade";
import { LISTA, paginasDaRota } from "./data/paginas";

/**
 * ⚠️ `LazyMotion` + o componente `m`: carrega só o subconjunto do Framer Motion que
 * o site usa (~34 KB a menos que importar `motion`). Consequência prática: **use `m`
 * no lugar de `motion`** em todo componente — um `motion.div` esquecido reintroduz o
 * pacote inteiro, e nada avisa. `strict` faz o esquecimento falhar alto em desenvolvimento.
 *
 * O roteador (`BrowserRouter` no navegador, `StaticRouter` no build) fica fora daqui:
 * `main.tsx` hidrata o HTML pré-renderizado e `entry-server.tsx` o gera.
 */
const App = () => (
  <LazyMotion features={domAnimation} strict>
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Só páginas publicadas existem em produção; `paginasDaRota` abre os rascunhos apenas no `npm run dev`. */}
      {paginasDaRota().length > 0 && <Route path={LISTA.caminho.slice(0, -1)} element={<ListaParaOsPais />} />}
      {paginasDaRota().map((p) => (
        <Route key={p.slug} path={`${LISTA.caminho}${p.slug}`} element={<PaginaTexto pagina={p} />} />
      ))}
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="*" element={<NaoEncontrada />} />
    </Routes>
  </LazyMotion>
);

export default App;
