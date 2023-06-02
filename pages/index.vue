<template>
  <div id="body" class="bg-zinc-950">
    <div id="header" class="h-screen grid grid-cols-2 px-20">
      <div class="headerText flex flex-col justify-center gap-5">
        <p
          v-if="isLoaded === true && isUserLoaded === true"
          class="text-6xl text-white font-bold"
        >
          Hi, I am {{ user.name }}
        </p>
        <p class="text-xl text-white font-medium max-w-2xl leading-10">
          I'm a passionate individual with a diverse range of interests and
          hobbies. <br />
          I enjoy exploring new technologies and building web applications.
        </p>
        <div class="buttonLearn flex">
          <div
            class="borderNuxt rounded-3xl hover:-translate-y-3 duration-300 shadow hover:shadow-white"
          >
            <button
              class="bg-zinc-900 text-white px-12 py-5 text-xl rounded-3xl"
            >
              Learn More About Me
            </button>
          </div>
        </div>
      </div>
      <div class="headerProfile flex items-center justify-center">
        <div class="profileImage">
          <img
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
        class="px-20 py-5"
      >
        <div
          class="wrapSpotify bg-zinc-900 p-10 rounded-3xl grid grid-cols-3 gap-5"
        >
          <a
            :href="song.url"
            target="_blank"
            class="wrapSong hover:bg-zinc-800 duration-300 rounded-3xl p-10 relative overflow-hidden"
            v-if="isPlaying === true"
          >
            <p class="text-white text-3xl font-bold pb-4 z-10">Now Playing:</p>
            <img :src="song.img" alt="" class="w-60 h-60 z-10 relative" />
            <p class="text-white text-2xl font-bold pt-4">{{ song.name }}</p>
            <p class="text-white text-xl font-medium">{{ song.artist }}</p>
            <p class="text-white text-l">
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
            class="hover:bg-zinc-800 duration-300 rounded-3xl p-10 relative overflow-hidden"
          >
            <p class="text-white text-3xl font-bold pb-4 z-10">Last Played:</p>
            <img :src="lastPlayed.img" alt="" class="w-60 h-60 z-10 relative" />
            <p class="text-white text-2xl font-bold pt-4">
              {{ lastPlayed.name }}
            </p>
            <p class="text-white text-xl font-medium">
              {{ lastPlayed.artist }}
            </p>
          </a>
          <a
            :href="topArtist.url"
            target="_blank"
            class="wrapTopArtist hover:bg-zinc-800 rounded-3xl duration-300 p-10 flex flex-col items-center"
          >
            <p class="text-white text-3xl font-bold pb-4">
              Top Artist This Month
            </p>
            <img :src="topArtist.img" alt="" class="w-60 h-60 rounded-full" />
            <p class="text-white text-2xl font-bold pt-4">
              {{ topArtist.name }}
            </p>
            <p class="text-white text-xl font-medium">{{ topArtist.genre }}</p>
          </a>
          <a
            :href="topTrack.url"
            target="_blank"
            class="wrapSong hover:bg-zinc-800 rounded-3xl duration-300 p-10 flex flex-col items-end"
          >
            <p class="text-white text-3xl font-bold pb-4">
              Top Song This Month
            </p>
            <img :src="topTrack.img" alt="" class="w-60 h-60" />
            <p class="text-white text-2xl font-bold pt-4">
              {{ topTrack.name }}
            </p>
            <p class="text-white text-xl font-medium">{{ topTrack.artist }}</p>
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
      this.song = {
        name: data.name,
        img: data.image,
        artist: data.artist,
        duration: data.duration,
        url: data.url,
      };
      this.isPlaying = data.isPlaying;
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
      this.lastPlayed = {
        name: data.name,
        img: data.image,
        artist: data.artist,
        url: data.url,
      };
      this.isLastPlayedLoaded = true;
    });
    this.isLoaded = true;
    this.startFetching();
  },
  methods: {
    songProgress() {
      if (this.isLoaded === true && this.isNowPlayingLoaded === true) {
        const progress = (this.currentTime / this.song.duration) * 100;
        this.progress = progress;
      }
    },
    async getNowPlaying() {
      if (this.isLoaded === true) {
        axios.get("/api/now-playing").then((res) => {
          const data = res.data;
          this.song = {
            name: data.name,
            img: data.albumImageUrl,
            artist: data.artist,
            url: data.url,
            duration: data.duration,
          };
          this.isPlaying = data.isPlaying;
          this.isNowPlayingLoaded = true;
        });
      }
    },
    async getLastPlayed() {
      if (this.isLoaded === true) {
        axios.get("/api/last-played").then((res) => {
          const data = res.data;
          this.lastPlayed = {
            name: data.name,
            img: data.image,
            artist: data.artist,
            duration: data.duration,
            url: data.url,
          };
          this.isLastPlayedLoaded = true;
        });
      }
    },
    async getCurrentTime() {
      if (this.isLoaded === true) {
        axios.get("/api/now-playing").then((res) => {
          const data = res.data;
          this.currentTime = data.progress;
        });
      }
    },
    startFetching() {
      this.loading = true;
      this.getNowPlaying();
      this.intervalId = setInterval(() => {
        this.getNowPlaying();
        this.getCurrentTime();
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
