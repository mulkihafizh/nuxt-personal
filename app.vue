<script setup>
useHead({
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-1V9QGGNH8E",
      async: true,
      children: `        
      window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-1V9QGGNH8E");`,
    },
  ],
});
</script>
<template>
  <div
    class="font-main duration-300 dark:bg-zinc-950 min-h-screen dark:text-white bg-gray-100"
  >
    <Nav />
    <Footer />
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
