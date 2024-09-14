import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xxs: "370px",
        xs: "450px",
      },
      fontSize: {
        xs: "0.6rem",
        "1.5xl": "1.375rem",
        "md+": "1.125rem",
      },
      padding: {
        header: "var(--header-height)",
      },
      height: {
        header: "var(--header-height)",
      },
    },
  },
  plugins: [],
};
export default config;
