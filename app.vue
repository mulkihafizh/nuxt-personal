<template>
  <div class="font-main bg-zinc-950 min-h-screen text-white">
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
