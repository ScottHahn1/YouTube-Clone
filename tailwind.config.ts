import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      spacing: {
        '40%': '40%',
        '55%': '55%',
        '56%': '56.25%',
        '60%': '60%',
        '80%': '80%',
        '90%': '90%',
      }
    },
  },
  plugins: [],
};
export default config;