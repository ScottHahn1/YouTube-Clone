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
      colors: {
        charcoal: 'rgb(20, 20, 20)',
        darkGray: 'rgb(50, 50, 50)'
      },
      fontFamily: {
        roboto: "var(--font-roboto), sans-serif",
      },
      spacing: {
        '30%': '30%',
        '35%': '35%',
        '38%': '38%',
        '40%': '40%',
        '55%': '55%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
export default config;