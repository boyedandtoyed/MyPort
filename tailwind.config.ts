import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      colors: {
        space: {
          950: "#03040b",
          900: "#080a18",
          800: "#0d1024"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(253, 184, 19, 0.28)",
        cyan: "0 0 32px rgba(125, 232, 232, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
