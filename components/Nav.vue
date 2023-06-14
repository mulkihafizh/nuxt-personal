<script setup lang="ts">
type Theme = "light" | "dark";

const setColorTheme = (newTheme: Theme) => {
  useColorMode().preference = newTheme;
};
</script>
<template>
  <nav
    class="dark:text-white max-sm:text-sm grid grid-cols-3 items-center gap-6 justify-center py-4 fixed w-full backdrop-blur-3xl z-20 px-10 shadow-md bg-gray-100 dark:bg-zinc-950 duration-300"
  >
    <div class="navigator col-start-2 gap-6 flex justify-center">
      <nuxt-link to="/">HOME</nuxt-link>| <nuxt-link to="/me">ME</nuxt-link>|
      <nuxt-link to="/projects">PROJECTS</nuxt-link>
    </div>
    <button
      class="self-end justify-self-end"
      @click="
        setColorTheme(
          ($colorMode.preference =
            $colorMode.preference === 'light' ? 'dark' : 'light')
        )
      "
    >
      <i v-if="$colorMode.preference == 'light'" class="fa-solid fa-moon"></i>
      <i v-else class="fa-solid fa-sun"></i>
    </button>
  </nav>
</template>
