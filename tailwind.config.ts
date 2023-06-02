/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#1A202C",
        "dark-text": "#F7FAFC",
      },
      fontFamily: {
        main: ["programmeregular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
