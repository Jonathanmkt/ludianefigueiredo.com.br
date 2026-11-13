import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Index from "./pages/Index";
import NaoEncontrada from "./pages/NaoEncontrada";

/**
 * ⚠️ `LazyMotion` + o componente `m`: carrega só o subconjunto do Framer Motion que
 * o site usa (~34 KB a menos que importar `motion`). Consequência prática: **use `m`
 * no lugar de `motion`** em todo componente — um `motion.div` esquecido reintroduz o
 * pacote inteiro, e nada avisa. `strict` faz o esquecimento falhar alto em desenvolvimento.
 */
const App = () => (
  <LazyMotion features={domAnimation} strict>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </BrowserRouter>
  </LazyMotion>
);

export default App;
