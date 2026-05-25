import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // Uses prefers-color-scheme
  theme: {
    extend: {
      colors: {
        primary: "#5B48BD",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
        ],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
      },
      fontSize: {
        h1: ["28px", { lineHeight: "1.2", fontWeight: "500" }],
        h2: ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        h3: ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        label: ["12px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        button: "6px",
        card: "12px",
        container: "16px",
      },
      boxShadow: {
        subtle: "1px 3px 0px rgba(0, 0, 0, 0.05)",
        hover: "4px 12px 0px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        // Tailwind's default spacing is already a base 8px grid (0.5rem = 8px = spacing 2)
        // No overrides needed, just stick to even numbers (2, 4, 6, 8, etc.) for 8px increments
      },
    },
  },
  plugins: [],
};

export default config;
