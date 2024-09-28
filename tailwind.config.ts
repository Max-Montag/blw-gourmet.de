import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "370px",
        xs: "450px",
      },
      fontSize: {
        xs: "0.6rem",
        "1.5xl": "1.375rem",
        "base+": "1.125rem",
      },
    },
  },
  plugins: [],
};
export default config;
