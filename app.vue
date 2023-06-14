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
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
