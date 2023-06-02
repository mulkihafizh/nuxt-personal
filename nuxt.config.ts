// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    spotifyClientId: process.env.CLIENT_ID,
    spotifyClientSecret: process.env.CLIENT_SECRET,
    spotifyRefreshToken: process.env.REFRESH_TOKEN,
  },
});
