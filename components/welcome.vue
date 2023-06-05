<template>
  <div
    ref="typingEffect"
    class="typing-effect text-2xl max-sm:text-base overflow-hidden whitespace-nowrap w-full"
  ></div>
</template>

<script>
export default {
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const welcomeText = "Welcome to my playground.";
      const typingDelay = 100;
      let index = 0;
      const typingEffect = this.$refs.typingEffect;
      const interval = setInterval(() => {
        typingEffect.textContent = welcomeText.slice(0, index + 1);
        index++;

        if (index === welcomeText.length) {
          clearInterval(interval);
        }
      }, typingDelay);
    },
  },
};
</script>

<style scoped>
.typing-effect {
  white-space: nowrap;
  animation: typing 1s steps(40);
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
