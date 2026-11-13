import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { IconeWhatsApp } from "@/components/Icones";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/conteudo";

/**
 * A origem de campanha que vem no endereço (`?o=G1`): só letras e números, até 6.
 * É lida no navegador e vai apenas para a mensagem pronta do WhatsApp. Nada é gravado,
 * nada é enviado a terceiro, nenhum cookie: é a medição sem tag que o Jurídico aprovou.
 */
const origemDaUrl = (): string => {
  const o = new URLSearchParams(window.location.search).get("o") ?? "";
  return /^[A-Za-z0-9]{1,6}$/.test(o) ? o.toUpperCase() : "";
};

/**
 * O botão da casa: pílula carvão, texto creme. Sempre um link (`asChild`), nunca um <button> que navega.
 * `referencia` é o código neutro de origem (`A0` na home, `A1…An` nas páginas) que vai na mensagem pronta;
 * quando o visitante chega por anúncio (`?o=G1`), o código da campanha vem junto (`A0-G1`).
 */
const BotaoWhatsApp = ({
  children,
  referencia,
  claro = false,
}: {
  children: ReactNode;
  referencia: string;
  claro?: boolean;
}) => {
  // Começa vazio para o HTML pré-renderizado e a hidratação serem idênticos.
  const [origem, setOrigem] = useState("");
  useEffect(() => setOrigem(origemDaUrl()), []);
  return (
    <Button
      asChild
      size="lg"
      className={
        claro
          ? "h-12 rounded-full bg-papel px-7 font-corpo text-[0.9rem] text-tinta hover:bg-superficie"
          : "h-12 rounded-full bg-tinta px-7 font-corpo text-[0.9rem] text-papel shadow-[0_26px_50px_-30px_rgba(60,50,30,.7)] hover:bg-tinta-2"
      }
    >
      <a href={whatsappLink(origem ? `${referencia}-${origem}` : referencia)} target="_blank" rel="noopener noreferrer">
        <IconeWhatsApp className="!size-5" />
        {children}
      </a>
    </Button>
  );
};

export default BotaoWhatsApp;
