<template>
  <div v-if="isLoaded === true" class="px-20 py-5">
    <p class="text-white text-3xl font-bold pb-4">Now Playing:</p>
    <img :src="song.img" alt="" class="w-60 h-60" />
    <p class="text-white text-2xl font-bold pt-4">{{ song.name }}</p>
    <p class="text-white text-xl font-medium">{{ song.artist }}</p>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      required: true,
    },
  },

  data() {
    return {
      isLoaded: false,
    };
  },
  watch: function () {
    if (this.song !== null) {
      this.isLoaded = true;
    }
  },
};
</script>
