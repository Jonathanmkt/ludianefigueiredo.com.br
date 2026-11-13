import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: { center: true, padding: "1.25rem", screens: { "2xl": "1180px" } },
		extend: {
			fontFamily: {
				titulo: ["'Cormorant Garamond'", "Georgia", "serif"],
				corpo: ["Karla", "'Segoe UI'", "system-ui", "sans-serif"],
				manuscrita: ["Parisienne", "cursive"],
			},
			colors: {
				// tokens do shadcn (Button, Accordion) — apontam para a paleta da marca
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
				secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
				muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
				accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
				destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
				// a paleta da marca, pelo nome que o site usa
				papel: "hsl(var(--papel))",
				superficie: "hsl(var(--superficie))",
				tinta: { DEFAULT: "hsl(var(--tinta))", 2: "hsl(var(--tinta-2))" },
				suave: "hsl(var(--suave))",
				ouro: { DEFAULT: "hsl(var(--ouro))", tinta: "hsl(var(--ouro-tinta))" },
				fio: { DEFAULT: "hsl(var(--fio))", 2: "hsl(var(--fio-2))" },
			},
			borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
			keyframes: {
				"accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
				"accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
