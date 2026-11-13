import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NaoEncontrada = () => {
  useEffect(() => {
    document.title = "Página não encontrada · Ludiane Figueiredo";
  }, []);
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <span className="estrela mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-light">Página não encontrada</h1>
        <p className="lead mx-auto mt-4 max-w-[40ch]">O endereço que você abriu não existe neste site.</p>
        <Button asChild size="lg" className="mt-8 h-12 rounded-full bg-tinta px-7 text-papel hover:bg-tinta-2">
          <a href="/">Voltar ao início</a>
        </Button>
      </div>
    </main>
  );
};

export default NaoEncontrada;
