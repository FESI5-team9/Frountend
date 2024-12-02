import type { Config } from "tailwindcss";

const config: Config = {
  safelist: ["bg-yellow-primary", "bg-orange-primary", "bg-red-primary"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      desktop: "1200px",
      tablet: "768px",
    },
    extend: {
      colors: {
        "yellow-primary": "#FFE55D",
        "orange-primary": "#FF9E48",
        "red-primary": "#FF573B",
        "gray-backgroundBright": "##F3F4F6",
        "gray-background": "#F9FAFB",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
