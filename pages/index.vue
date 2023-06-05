<template>
  <div id="body" class="text-white min-h-screen">
    <div
      id="header"
      v-if="isLoaded === true && isUserLoaded === true"
      class="h-screen grid max-sm:grid-cols-1 grid-cols-2 px-[10%]"
    >
      <div
        class="headerText flex flex-col justify-center gap-5 max-sm:order-2 max-sm:text-center max-sm:items-center"
      >
        <p class="text-6xl max-sm:text-2xl font-bold">
          Hi, I am {{ user.name }}
        </p>
        <p class="text-xl max-sm:text-sm font-medium max-w-2xl leading-10">
          I'm a passionate individual with a diverse range of interests and
          hobbies. <br />
          I enjoy exploring new technologies and building web applications.
        </p>
        <div class="buttonLearn flex">
          <div
            class="borderNuxt p-[3px] rounded-3xl hover:-translate-y-3 duration-300 shadow hover:shadow-white"
          >
            <button
              class="bg-zinc-900 px-12 py-5 text-xl rounded-3xl max-sm:px-6 max-sm:py-3 max-sm:text-base"
            >
              Learn More About Me
            </button>
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
            :src="user.img"
          />
        </div>
      </div>
    </div>
    <div class="nowPlaying">
      <div
        v-if="
          isLoaded === true &&
          isTopArtistLoaded &&
          isNowPlayingLoaded &&
          isTopTrackLoaded
        "
        class="px-[10%] py-5"
      >
        <div
          class="wrapSpotify bg-zinc-900 p-[5%] rounded-3xl grid grid-cols-3 gap-5 max-md:grid-cols-2"
        >
          <a
            :href="song.url"
            target="_blank"
            class="wrapSong hover:bg-zinc-800 flex flex-col duration-300 rounded-3xl p-[5%] relative overflow-hidden max-sm:col-span-2"
            v-if="isPlaying === true"
          >
            <p
              class="text-3xl max-lg:text-2xl max-sm:text-2xl font-bold pb-4 z-10"
            >
              Now Playing :
            </p>
            <div class="imageWrap relative flex max-sm:justify-center">
              <nuxt-img
                placeholder
                loading="lazy"
                :src="song.img"
                alt=""
                class="w-3/4"
              />
              <div
                class="visualizer absolute h-8 w-8 p-2 rounded-lg self-center opacity-60 bg-white left-2 bottom-2 z-10 flex items-end gap-1 max-sm:left-10"
              >
                <div class="bar1 animate-visual-bar w-2 bg-gray-800 z-10"></div>
                <div class="bar2 animate-visual-bar w-2 bg-gray-800 z-10"></div>
                <div class="bar3 animate-visual-bar w-2 bg-gray-800 z-10"></div>
              </div>
            </div>
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
          </a>
          <a
            :href="lastPlayed.url"
            target="_blank"
            v-else-if="isPlaying === false && isLastPlayedLoaded === true"
            class="hover:bg-zinc-800 duration-300 rounded-3xl p-[5%] relative overflow-hidden max-sm:col-span-2 flex flex-col"
          >
            <p
              class="text-3xl max-lg:text-2xl max-sm:text-2xl font-bold pb-4 z-10"
            >
              Last Played :
            </p>
            <nuxt-img
              placeholder
              loading="lazy"
              :src="lastPlayed.img"
              alt=""
              class="w-3/4 max-sm:self-center z-10"
            />
            <p class="text-2xl font-bold pt-4">
              {{ lastPlayed.name }}
            </p>
            <p class="text-xl font-medium">
              {{ lastPlayed.artist }}
            </p>
            <p class="text-l">
              {{ formatDuration(currentTime) }} /
              {{ formatDuration(lastPlayed.duration) }}
            </p>
            <div class="duration w-full h-1 bg-white mt-2">
              <div
                class="durationBar h-full bg-green-500"
                :style="`width: ${progress}%`"
              ></div>
            </div>
          </a>
          <a
            :href="topArtist.url"
            target="_blank"
            class="wrapTopArtist hover:bg-zinc-800 rounded-3xl max-md:order-3 max-sm:order-2 max-md:col-span-2 duration-300 p-[5%] flex flex-col items-center max-sm:items-start max-sm:col-span-1"
          >
            <p
              class="text-3xl max-lg:text-2xl text-center max-sm:text-start max-sm:text-sm font-bold pb-4"
            >
              Top Artist This Month
            </p>
            <nuxt-img
              placeholder
              loading="lazy"
              :src="topArtist.img"
              alt=""
              class="w-3/4 self-center rounded-full"
            />
            <p class="text-2xl max-sm:text-base font-bold pt-4">
              {{ topArtist.name }}
            </p>
            <p class="text-xl font-medium max-sm:text-base max-sm:text-start">
              {{ topArtist.genre }}
            </p>
          </a>
          <a
            :href="topTrack.url"
            target="_blank"
            class="wrapSong hover:bg-zinc-800 rounded-3xl max-sm:order-3 duration-300 p-[5%] flex flex-col items-end"
          >
            <p
              class="text-3xl max-lg:text-2xl max-sm:text-sm font-bold pb-4 text-end"
            >
              Top Song This Month
            </p>
            <nuxt-img
              placeholder
              loading="lazy"
              :src="topTrack.img"
              alt=""
              class="w-3/4"
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
</template>
<script>
import axios from "axios";

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
      lastPlayed: null,
      isTopTrackLoaded: false,
      isUserLoaded: false,
      isTopArtistLoaded: false,
      isNowPlayingLoaded: false,
      isLastPlayedLoaded: false,
    };
  },
  mounted: function () {
    axios.get("/api/me").then((res) => {
      const data = res.data;
      this.user = { name: data.name, img: data.image, url: data.url };
      this.isUserLoaded = true;
    });
    axios.get("/api/now-playing").then((res) => {
      const data = res.data;
      this.isPlaying = data.isPlaying;
      if (this.isPlaying == true) {
        this.currentTime = data.progress;
        this.song = {
          name: data.title,
          img: data.image,
          artist: data.artist,
          duration: data.duration,
          url: data.url,
        };
      }

      this.isNowPlayingLoaded = true;
    });
    axios.get("/api/top-artist").then((res) => {
      const data = res.data;
      this.topArtist = {
        name: data.name,
        img: data.image,
        genre: data.genre,
        url: data.url,
      };
      this.isTopArtistLoaded = true;
    });
    axios.get("/api/tracks").then((res) => {
      const data = res.data;
      this.topTrack = {
        name: data.name,
        img: data.image,
        artist: data.artist,
        duration: data.duration,
        url: data.url,
      };
      this.isTopTrackLoaded = true;
    });
    axios.get("/api/last-played").then((res) => {
      const data = res.data;
      if (this.isPlaying == false) {
        this.lastPlayed = {
          name: data.name,
          img: data.image,
          artist: data.artist,
          url: data.url,
          duration: data.duration,
        };
        this.currentTime = data.duration;
        this.progress = 100;
        this.isLastPlayedLoaded = true;
      }
    });
    this.isLoaded = true;
    this.startFetching();
  },
  methods: {
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
      if (this.isLoaded === true) {
        axios.get("/api/now-playing").then((res) => {
          const data = res.data;
          this.isPlaying = data.isPlaying;

          if (this.isPlaying == true) {
            this.song = {
              name: data.title,
              img: data.albumImageUrl,
              artist: data.artist,
              url: data.url,
              duration: data.duration,
            };
            this.currentTime = data.progress;
          }

          this.isNowPlayingLoaded = true;
        });
      }
    },
    async getLastPlayed() {
      if (this.isLoaded === true && this.isPlaying === false) {
        axios.get("/api/last-played").then((res) => {
          const data = res.data;
          if (this.isPlaying == false) {
            this.lastPlayed = {
              name: data.name,
              img: data.image,
              artist: data.artist,
              url: data.url,
              duration: data.duration,
            };
            this.currentTime = data.duration;
            this.progress = 100;
            this.isLastPlayedLoaded = true;
          }
        });
      }
    },

    startFetching() {
      this.loading = true;
      this.getNowPlaying();
      this.intervalId = setInterval(() => {
        this.getNowPlaying();
        this.songProgress();
        this.getLastPlayed();
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
