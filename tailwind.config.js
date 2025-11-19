/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ✅ class-based dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        brand2: "var(--brand2)",
        nav: "var(--nav-color)",
        pg: "var(--pg-color)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};