// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/image-edge"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Home",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
        },
      ],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [{ src: "~/plugins/aos.ts", mode: "client" }],
  runtimeConfig: {
    spotifyClientId: process.env.CLIENT_ID,
    spotifyClientSecret: process.env.CLIENT_SECRET,
    spotifyRefreshToken: process.env.REFRESH_TOKEN,
  },
});
