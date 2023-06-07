<template>
  <div class="flex flex-col text-xl">
    <p class="max-sm:text-base">
      My Favorite Music Genre is
      <span
        v-bind:class="{
          'opacity-0 hidden': guessed === true,
          'opacity-1 ': guessed === false,
        }"
        >...</span
      >
      <span
        class="duration-1000"
        v-bind:class="{
          'opacity-1 bg-zinc-800 px-1': guessed === true,
          'opacity-0 ': guessed === false,
        }"
      >
        {{ guessed ? "Indie Folk." : "..." }}
      </span>
    </p>
    <p
      class="duration-1000 max-sm:text-sm"
      v-bind:class="{
        'opacity-1': guessed === true,
        'opacity-0 pointer-events-none': guessed === false,
      }"
    >
      I usually and mostly listen to indie folk music, especially when I'm
      studying or working. I also into some other genres like J Pop. <br />
      My favorite indie folk artists are
      <a target="_blank" :href="novoAmor.url" class="bg-zinc-800 px-1">{{
        novoAmor.name
      }}</a
      >,
      <a target="_blank" :href="hollowCoves.url" class="bg-zinc-800 px-1">{{
        hollowCoves.name
      }}</a>
      and
      <a target="_blank" :href="bonIver.url" class="bg-zinc-800 px-1">{{
        bonIver.name
      }}</a>
    </p>
    <p class="py-4">Guess One :</p>
    <div class="options grid grid-rows-4 gap-2 text-lg">
      <div class="flex gap-5 max-sm:gap-2 items-center max-sm:flex-col">
        <button
          @click="guess()"
          v-bind:class="{ 'border-red-600 ': guessed === true }"
          class="border-[1px] min-w-[10%] max-sm:w-full rounded-lg px-2 py-1 duration-500"
        >
          Hip Hop
        </button>
        <p
          class="duration-500 text-base max-sm:text-sm"
          v-bind:class="{
            'opacity-1': guessed === true,
            'opacity-0 pointer-events-none': guessed === false,
          }"
        >
          If its Me back in 2018, then yes. But not anymore.
        </p>
      </div>
      <div class="flex gap-5 max-sm:gap-2 items-center max-sm:flex-col">
        <button
          @click="guess()"
          v-bind:class="{ 'border-green-600 ': guessed === true }"
          class="border-[1px] min-w-[10%] max-sm:w-full rounded-lg px-2 py-1 duration-500"
        >
          Indie Folk
        </button>
        <p
          class="duration-500 text-base max-sm:text-sm"
          v-bind:class="{
            'opacity-1': guessed === true,
            'opacity-0 pointer-events-none': guessed === false,
          }"
        >
          Yes it is. I listen to Indie Folk most of the time.
        </p>
      </div>
      <div class="flex gap-5 max-sm:gap-2 items-center max-sm:flex-col">
        <button
          @click="guess()"
          v-bind:class="{ 'border-red-600 ': guessed === true }"
          class="border-[1px] min-w-[10%] max-sm:w-full rounded-lg px-2 py-1 duration-500"
        >
          J Pop
        </button>
        <p
          class="duration-500 text-base max-sm:text-sm"
          v-bind:class="{
            'opacity-1': guessed === true,
            'opacity-0 pointer-events-none': guessed === false,
          }"
        >
          I also listen to J Pop, but not as much as Indie Folk.
        </p>
      </div>
      <div class="flex gap-5 max-sm:gap-2 items-center max-sm:flex-col">
        <button
          @click="guess()"
          v-bind:class="{ ' border-red-600 ': guessed === true }"
          class="border-[1px] min-w-[10%] max-sm:w-full rounded-lg px-2 py-1 duration-500"
        >
          Rock
        </button>
        <p
          class="duration-500 text-base max-sm:text-sm"
          v-bind:class="{
            'opacity-1': guessed === true,
            'opacity-0 pointer-events-none': guessed === false,
          }"
        >
          No its just doesn't suit my taste.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guessed: false,
      bonIver: {},
      novoAmor: {},
      hollowCoves: {},
    };
  },
  methods: {
    guess() {
      if (this.guessed === false) {
        this.guessed = true;
      }
    },
    async getArtists() {
      const bonIver = await $fetch("/api/artist/4LEiUm1SRbFMgfqnQTwUbQ");
      const novoAmor = await $fetch("/api/artist/0rZp7G3gIH6WkyeXbrZnGi");
      const hollowCoves = await $fetch("/api/artist/7IAFAOtc9kTYNTizhLSWM6");
      this.bonIver = bonIver;
      this.novoAmor = novoAmor;
      this.hollowCoves = hollowCoves;
    },
  },
  mounted() {
    this.getArtists();
  },
};
</script>
