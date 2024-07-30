import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import defaultColors from "tailwindcss/colors";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        neutral: {
          ...defaultColors.neutral,
          700: "#414141",
        },
        "watched-color": "rgba(79 155 144 / <alpha-value>)",
        "unwatched-color": {
          default: "rgba(208 54 76 / <alpha-value>)",
          light: "rgba(245 214 218 / <alpha-value>)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
