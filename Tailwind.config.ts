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
        // Deep navy — premium, not flat black
        primary: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
        },
        // Warm amber gold — premium accent for CTAs/highlights
        secondary: {
          DEFAULT: "#f59e0b",
          light: "#fbbf24",
        },
        // Rich violet — used for gradients / interactive elements
        accent: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
        },
        // Neutral off-white — never pure white, feels premium
        neutral: {
          DEFAULT: "#f8fafc",
          dark: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;