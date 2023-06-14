<template>
  <footer
    class="b border-t-[0.2px] py-2 dark:border-zinc-700 dark:bg-zinc-950 text-center fixed w-full z-50 bottom-0 duration-300"
    :class="{ 'opacity-100': isAtBottom, 'opacity-0': !isAtBottom }"
  >
    <p>mulkihafizh ©{{ new Date().getFullYear() }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      isAtBottom: false,
    };
  },
  mounted() {
    this.handleScroll();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.$router.afterEach((this.isAtBottom = false));
  },
  watch: {
    $route(to, from) {
      setTimeout(() => {
        this.handleScroll();
      }, 500);
    },
  },
  methods: {
    handleScroll() {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.body.offsetHeight;

      this.isAtBottom = windowHeight + scrollY + 1 >= documentHeight;
      return this.isAtBottom;
    },
  },
};
</script>

<style lang="scss" scoped></style>
