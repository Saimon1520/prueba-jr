import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme"; // Asegúrate de importar correctamente el plugin

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Asegúrate de incluir la ruta de los componentes de NextUI
    "./node_modules/@nextui-org/theme/dist/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class", // Para manejar el modo oscuro
  plugins: [nextui()], // Añadir el plugin de NextUI
} satisfies Config;

