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
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      keyframes: {
        "visual-bar": {
          "0%, 100%": { height: "20%", opacity: 0.5 },
          "50%": { height: "100%", opacity: 1 },
        },
      },
      animation: {
        "visual-bar": "visual-bar 1.5s ease-in-out infinite",
      },
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
