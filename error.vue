h1
<template>
  <div
    id="background"
    class="bg-zinc-950 [&>*]:duration-300 overflow-hidden flex items-center justify-center relative h-screen"
    @mousemove="createCircle"
    @mouseleave="createCircle"
  >
    <div class="card p-8 rounded-xl z-20">
      <div
        class="card-body flex items-center flex-col gap-10 [&>*]:duration-300"
      >
        <h1 class="font-bold text-white text-9xl max-sm:text-6xl">404</h1>
        <p
          class="text-white text-2xl text-center flex flex-col gap-4 max-sm:text-sm"
        >
          <span class="font-bold">Oops! Seems Like You're Lost in Space.</span>
          Shall I Teleport You Back to Home?
        </p>
        <div class="borderNuxt p-[2px] rounded-lg flex items-center">
          <nuxt-link
            to="/"
            class="btn btn-primary text-white text-xl bg-zinc-800 px-3 py-2 rounded-lg max-sm:text-base"
          >
            Yes, Please
          </nuxt-link>
        </div>
      </div>
    </div>
    <div id="fog" class="absolute w-full"></div>
  </div>
</template>

<script>
export default {
  methods: {
    createCircle(event) {
      const numcircles = 1; // Number of circles to create per mouse move
      const container = document.getElementById("background");

      for (let i = 0; i < numcircles; i++) {
        const circle = document.createElement("div");
        circle.setAttribute("class", "circle");
        circle.style.left = `${event.clientX}px`; // X position of the mouse move
        circle.style.top = `${event.clientY}px`; // Y position of the mouse move

        container.appendChild(circle);

        this.animatecircle(circle);
      }
    },

    animatecircle(circle) {
      const duration = 1000; // Duration of the falling animation in milliseconds
      const circletY = parseInt(circle.style.top);
      const endY = window.innerHeight + 20; // Final position of the circle outside the viewport

      circle.style.animation = `fall ${duration}ms linear`;
      circle.style.animationFillMode = "forwards";
      circle.style.animationPlayState = "running";

      // Remove the circle from the container after the animation finishes
      setTimeout(() => {
        circle.remove();
      }, duration);

      // Reset the animation properties to reuse the circle element
      setTimeout(() => {
        circle.style.top = `${circletY}px`;
        circle.style.animation = "";
      }, duration + 100);
    },
  },
};
</script>

<style>
.circle {
  transform: scale(1.1);
  position: absolute;
  pointer-events: none;
  width: 15px; /* Adjust the width as desired */
  height: 15px; /* Adjust the height as desired */
  background-color: rgb(56, 255, 152);
  border-radius: 50%;
  box-shadow: #00dc82 0px 0px 10px 2px;
}

@keyframes fall {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(120px);
  }
}

#fog {
  background: linear-gradient(45deg, #00dc82, #36e4da 50%, #0047e1);
  bottom: -30vh;
  filter: blur(20vh);
  height: 40vh;
}
</style>
