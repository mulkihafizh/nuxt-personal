<template>
  <div id="body" class="dark:text-white min-h-screen">
    <balls />
    <div
      id="header"
      v-if="isLoaded === true && isUserLoaded === true"
      class="h-screen grid max-sm:grid-cols-1 grid-cols-2 px-[10%] z-10 relative"
    >
      <div
        class="headerText flex flex-col justify-center gap-5 max-sm:order-2 max-sm:text-center max-sm:items-center"
      >
        <p class="text-6xl max-sm:text-2xl font-bold">
          Hi, I am {{ user.name }}
        </p>
        <welcome class="h-8" />
        <p class="text-xl max-sm:text-sm font-medium max-w-2xl leading-10">
          I'm a passionate individual with a diverse range of interests and
          hobbies. <br />
          I enjoy exploring new technologies and building web applications.
        </p>
        <div class="buttonLearn flex">
          <div
            class="borderNuxt p-[3px] rounded-3xl hover:-translate-y-3 duration-300 shadow hover:shadow-white"
          >
            <nuxt-link to="/me">
              <button
                class="dark:bg-zinc-900 bg-gray-200 px-12 py-5 text-xl rounded-3xl max-sm:px-6 max-sm:py-3 max-sm:text-base"
              >
                Learn More About Me
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div
        class="headerProfile flex items-center justify-center max-sm:order-1"
      >
        <div class="profileImage">
          <nuxt-img
            placeholder
            loading="lazy"
            v-if="isLoaded === true && isUserLoaded === true"
            alt="Profile Image"
            class="rounded-full w-full h-full"
            :src="user.image"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
useSeoMeta({
  title: "Mulki Hafizh | Home",
  description: "Mulki Hafizh | Home",
});
</script>

<script>
export default {
  name: "Index",

  data() {
    return {
      isLoaded: false,
      user: null,
      isUserLoaded: false,
    };
  },
  methods: {
    async getUser() {
      const user = await $fetch("/api/me");
      this.user = user;
      this.isUserLoaded = true;
      this.isLoaded = true;
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>
