import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#282C20",
        foreground: "#F3F2EC",
        accent: "#D4FF3A",
        "accent-foreground": "#282C20",
        muted: "#6E7364",
        "muted-foreground": "#6E7364",
        border: "#282C20",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          '"Source Han Sans SC"',
          "sans-serif",
        ],
        display: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
      },
      maxWidth: {
        frame: "95vw",
      },
    },
  },
  plugins: [],
};

export default config;
