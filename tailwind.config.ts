import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        accent: "#dfe104",
        "accent-foreground": "#000000",
        muted: "#27272a",
        "muted-foreground": "#a1a1aa",
        border: "#3f3f46",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "Inter", "sans-serif"],
      },
      maxWidth: {
        frame: "95vw",
      },
    },
  },
  plugins: [],
};

export default config;
