<template>
  <div id="body" class="text-white min-h-screen" v-if="isLoaded === true">
    <div
      id="header"
      v-if="isUserLoaded === true"
      class="h-screen grid max-sm:grid-cols-1 grid-cols-2 px-[10%] py-3 gap-5 max-h-screen overflow-hidden"
    >
      <div
        class="headerProfile flex flex-col justify-center max-sm:order-1 h-full"
      >
        <div class="profileImage flex items-center gap-5">
          <nuxt-img
            placeholder
            loading="lazy"
            v-if="isLoaded === true && isUserLoaded === true"
            alt="Profile Image"
            class="rounded-full h-3/4"
            :src="user.image"
          />
        </div>
        <div class="descText">
          <p class="text-xl font-thin max-sm:text-base">
            <span class="text-3xl"> mulkihafizh</span>.
            <br />
            a passionate individual with a diverse range of interests and
            hobbies. <br />
            I enjoy exploring new technologies and building web applications.
          </p>
        </div>
      </div>
      <div
        class="favTech flex flex-col items-center justify-center h-full gap-6 max-sm:order-2"
      >
        <p class="text-4xl font-bold max-sm:text-2xl">Favorite Technologies</p>
        <div class="grid grid-cols-3 gap-4">
          <div
            class="techItem flex flex-col gap-2 items-center justify-between"
          >
            <nuxt-img class="w-3/4" src="/images/js.png" />
            <p class="text-2xl max-sm:text-lg text-center">Javascript</p>
          </div>
          <div
            class="techItem flex flex-col gap-2 items-center justify-between"
          >
            <nuxt-img class="w-3/4" src="/images/vue.png" />
            <p class="text-2xl max-sm:text-lg text-center">Vue.js</p>
          </div>
          <div
            class="techItem flex flex-col gap-2 items-center justify-between"
          >
            <nuxt-img class="w-3/4" src="/images/react.png" />
            <p class="text-2xl max-sm:text-lg text-center">React.js</p>
          </div>
        </div>
      </div>
    </div>
    <div class="nowPlaying px-[10%]" v-if="isUserLoaded === true">
      <p class="text-bold text-4xl max-sm:text-3xl pb-5">Music Profile</p>
      <question />
      <div
        v-if="
          isLoaded === true &&
          isTopArtistLoaded &&
          isNowPlayingLoaded &&
          isTopTrackLoaded
        "
        class="py-5"
      >
        <div
          class="wrapSpotify rounded-3xl grid gap-5 grid-cols-3 max-md:grid-cols-2"
        >
          <a
            :href="song.url"
            target="_blank"
            class="wrapSong col-span-2 flex flex-col duration-300 justify-center rounded-3xl p-[5%] relative overflow-hidden"
            v-if="isPlaying === true"
          >
            <p
              class="text-3xl max-lg:text-2xl max-sm:text-2xl font-bold pb-4 z-10"
            >
              Now Playing :
            </p>
            <div
              class="nowPlayingWrap grid grid-cols-2 max-sm:justify-center gap-4 max-sm:grid-cols-1"
            >
              <div class="wrapImage relative">
                <nuxt-img placeholder loading="lazy" :src="song.img" alt="" />

                <div
                  class="visualizer absolute h-8 w-8 p-2 rounded-lg self-center opacity-60 bg-white left-2 bottom-2 z-10 flex items-end gap-1 max-sm:left-4"
                >
                  <div
                    class="bar1 animate-visual-bar w-2 bg-gray-800 z-10"
                  ></div>
                  <div
                    class="bar2 animate-visual-bar w-2 bg-gray-800 z-10"
                  ></div>
                  <div
                    class="bar3 animate-visual-bar w-2 bg-gray-800 z-10"
                  ></div>
                </div>
              </div>

              <div class="songInfo flex flex-col justify-end">
                <p class="text-2xl max-sm:text-xl font-bold pt-4">
                  {{ song.name }}
                </p>
                <p class="text-xl max-sm:text-l font-medium">
                  {{ song.artist }}
                </p>
                <p class="text-l">
                  {{ formatDuration(currentTime) }} /
                  {{ formatDuration(song.duration) }}
                </p>
                <div class="duration w-full h-1 bg-white mt-2">
                  <div
                    class="durationBar h-full bg-green-500"
                    :style="`width: ${progress}%`"
                  ></div>
                </div>
              </div>
            </div>
          </a>
          <a
            :href="song.url"
            target="_blank"
            class="wrapSong col-span-2 flex flex-col duration-300 justify-center rounded-3xl p-[5%] relative overflow-hidden"
            v-if="isPlaying === false"
          >
            <p
              class="text-3xl max-lg:text-2xl max-sm:text-2xl font-bold pb-4 z-10"
            >
              Last Played :
            </p>
            <div
              class="nowPlayingWrap grid grid-cols-2 max-sm:justify-center gap-4 max-sm:grid-cols-1"
            >
              <div class="wrapImage relative">
                <nuxt-img placeholder loading="lazy" :src="song.img" alt="" />
              </div>

              <div class="songInfo flex flex-col justify-end">
                <p class="text-2xl max-sm:text-xl font-bold pt-4">
                  {{ song.name }}
                </p>
                <p class="text-xl max-sm:text-l font-medium">
                  {{ song.artist }}
                </p>
                <p class="text-l">
                  {{ formatDuration(currentTime) }} /
                  {{ formatDuration(song.duration) }}
                </p>
                <div class="duration w-full h-1 bg-white mt-2">
                  <div
                    class="durationBar h-full bg-green-500"
                    :style="`width: ${progress}%`"
                  ></div>
                </div>
              </div>
            </div>
          </a>

          <div
            class="wrapTops grid max-md:grid-cols-2 max-lg:grid-rows-2 max-md:col-span-2 gap-3"
          >
            <a
              :href="topArtist.url"
              target="_blank"
              class="wrapTopArtist hover:bg-zinc-800 rounded-3xl duration-300 p-[5%] flex flex-col items-center max-sm:col-span-1"
            >
              <p
                class="text-3xl max-lg:text-2xl text-center max-sm:text-sm font-bold pb-4"
              >
                Top Artist This Month
              </p>
              <nuxt-img
                placeholder
                loading="lazy"
                :src="topArtist.img"
                alt=""
                class="w-1/2 self-center rounded-full"
              />
              <p class="text-2xl max-sm:text-base font-bold pt-4">
                {{ topArtist.name }}
              </p>
              <p class="text-xl font-medium max-sm:text-base">
                {{ topArtist.genre }}
              </p>
            </a>
            <a
              :href="topTrack.url"
              target="_blank"
              class="wrapSong hover:bg-zinc-800 rounded-3xl max-sm:order-3 duration-300 p-[5%] flex flex-col items-center"
            >
              <p
                class="text-3xl max-lg:text-2xl max-sm:text-sm font-bold pb-4 text-center"
              >
                Top Song This Month
              </p>
              <nuxt-img
                placeholder
                loading="lazy"
                :src="topTrack.img"
                alt=""
                class="w-1/2"
              />
              <p class="text-2xl max-sm:text-base font-bold pt-4">
                {{ topTrack.name }}
              </p>
              <p class="text-xl max-sm:text-base font-medium">
                {{ topTrack.artist }}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  data() {
    return {
      isLoaded: false,
      user: null,
      song: null,
      topArtist: null,
      topTrack: null,
      isPlaying: false,
      currentTime: null,
      progress: 0,
      isTopTrackLoaded: false,
      isUserLoaded: false,
      isTopArtistLoaded: false,
      isNowPlayingLoaded: false,
    };
  },
  mounted: function () {
    this.getMe();
    this.getNowPlaying();
    this.getTopArtists();
    this.getTopTrack();
    this.isLoaded = true;
    this.startFetching();
  },
  methods: {
    async getMe() {
      const data = await $fetch("/api/me");
      this.user = data;
      this.isUserLoaded = true;
    },
    songProgress() {
      if (
        this.isLoaded === true &&
        this.isNowPlayingLoaded === true &&
        this.isPlaying === true
      ) {
        const progress = (this.currentTime / this.song.duration) * 100;
        this.progress = progress;
      }
    },
    async getNowPlaying() {
      const data = await $fetch("/api/now-playing");
      this.song = {
        name: data.title,
        img: data.image,
        artist: data.artist,
        url: data.url,
        duration: data.duration,
      };
      this.isPlaying = data.isPlaying;
      if (this.isPlaying === true) {
        this.currentTime = data.progress;
      } else {
        this.currentTime = data.duration;
        this.progress = 100;
      }

      this.isNowPlayingLoaded = true;
    },

    async getTopArtists() {
      const data = await $fetch("/api/top-artist");
      this.topArtist = {
        name: data.name,
        img: data.image,
        genre: data.genre,
        url: data.url,
      };
      this.isTopArtistLoaded = true;
    },
    async getTopTrack() {
      const data = await $fetch("/api/tracks");
      this.topTrack = {
        name: data.name,
        img: data.image,
        artist: data.artist,
        duration: data.duration,
        url: data.url,
      };
      this.isTopTrackLoaded = true;
    },
    startFetching() {
      this.loading = true;
      this.getNowPlaying();
      this.intervalId = setInterval(() => {
        this.getNowPlaying();
        this.songProgress();
      }, 1000);
    },
    formatDuration(duration) {
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>
