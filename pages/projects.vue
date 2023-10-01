<template>
  <div
    id="projects"
    class="px-[5%] py-16 h-min-screen xl:h-screen gap-5 flex flex-col justify-between overflow-hidden"
  >
    <div class="project flex flex-col gap-2">
      <h1 class="text-4xl">Projects</h1>
      <div class="navigateButton flex justify-between">
        <button
          @click="previousPage"
          class="bg-gray-200 dark:bg-zinc-800 rounded-xl px-4 py-1 text-xl duration-300"
          :disabled="!hasPreviousPage"
          :class="!hasPreviousPage ? 'opacity-0 pointer-none' : ''"
        >
          Back
        </button>
        <button
          @click="nextPage"
          class="bg-gray-200 dark:bg-zinc-800 rounded-xl px-4 py-1 text-xl duration-500"
          :disabled="!hasNextPage"
          :class="!hasNextPage ? 'opacity-0 pointer-none' : ''"
        >
          Next Page
        </button>
      </div>
      <div class="grid gap-4 grid-cols-2 max-lg:grid-cols-1">
        <transition-group name="project-transition" mode="out-in">
          <div
            v-for="project in displayedProjects"
            :key="project.name"
            class="bg-gray-200 dark:bg-zinc-900 min-h-[230px] p-4 rounded-xl shadow-lg grid grid-cols-2 max-sm:grid-cols-1 gap-4 items-center"
          >
            <div class="projectImg overflow-hidden">
              <nuxt-img
                placeholder
                loading="lazy"
                alt="Project Image"
                class="rounded-xl w-full max-h-[180px] object-cover"
                :src="project.image"
              />
            </div>
            <div class="projectText flex flex-col justify-between gap-2">
              <div class="textWrap flex flex-col gap-2">
                <p class="text-2xl">{{ project.name }}</p>
                <p>{{ project.description }}</p>
                <div class="flex flex-wrap">
                  <div v-for="tech in project.tech">
                    <div
                      :key="tech"
                      class="dark:bg-zinc-800 bg-gray-300 rounded-xl px-2 py-1 text-sm mr-2"
                    >
                      {{ tech }}
                    </div>
                  </div>
                </div>
                <div class="contribution flex">
                  <p
                    class="dark:bg-zinc-800 bg-gray-300 rounded-xl px-2 py-1 text-sm mr-2"
                  >
                    {{ project.contribution }}
                  </p>
                </div>
              </div>
              <div class="linkWrap flex gap-4 items-center">
                <a
                  v-if="project.github && project.github.trim() !== '-'"
                  :href="project.github"
                >
                  <i
                    class="fa-brands fa-github text-xl hover:text-zinc-400 duration-300"
                  ></i>
                </a>
                <i
                  v-else
                  class="fa-brands fa-github cursor-pointer text-xl hover:text-zinc-400 duration-300"
                ></i>
                <a
                  v-if="project.url && project.url.trim() !== '-'"
                  :href="project.url"
                >
                  <i
                    class="fa-solid fa-link hover:text-zinc-400 duration-300"
                  ></i>
                </a>
                <i
                  v-else
                  class="fa-solid fa-link cursor-pointer hover:text-zinc-400 duration-300"
                ></i>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script setup>
useSeoMeta({
  title: "Mulki Hafizh | Projects",
  description: "Mulki Hafizh | Projects",
});
</script>

<script>
import { projects } from "~/data/project.ts";

export default {
  head() {
    return {
      title: "Projects",
    };
  },
  data() {
    return {
      currentPage: 1,
      projectsPerPage: 4,
      allProjects: projects,
    };
  },
  computed: {
    displayedProjects() {
      const start = (this.currentPage - 1) * this.projectsPerPage;
      const end = start + this.projectsPerPage;
      return this.allProjects.slice(start, end);
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      const totalPages = Math.ceil(
        this.allProjects.length / this.projectsPerPage
      );
      return this.currentPage < totalPages;
    },
  },
  methods: {
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
  },
};
</script>

<style scoped>
.project-transition-enter-active {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-transition-leave-active {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-transition-leave-to {
  opacity: 0;
}
</style>
