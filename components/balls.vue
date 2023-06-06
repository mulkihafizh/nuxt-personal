<template>
  <div class="ball-background">
    <div
      class="text-2xl text-white right-0 flex bottom-0 justify-end p-3 absolute items-center gap-2"
    >
      <p
        class="text-base duration-300 removeText opacity-0"
        :class="{ 'opacity-100': toggleMessage }"
      >
        Offended by the floating balls? click to hide them.
      </p>
      <div
        class="rounded-full removeBalls cursor-pointer z-20"
        @click="removeBalls"
        @mouseover="toggleMessage = true"
        @mouseout="toggleMessage = false"
      >
        <p class="px-4 py-1 bg-zinc-900 rounded-full">!</p>
      </div>
    </div>
    <div
      v-for="ball in balls"
      :key="ball.id"
      class="ball"
      :style="{
        left: ball.x + 'px',
        top: ball.y + 'px',
        width: ball.size + 'px',
        height: ball.size + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      balls: [],
      nextBallId: 1,
      maxBalls: 10,
      toggleMessage: false,
    };
  },
  mounted() {
    this.createBall();
    this.animateBalls();
  },
  methods: {
    removeBalls() {
      this.balls = [];
    },
    createBall() {
      if (this.balls.length >= this.maxBalls) {
        this.balls.shift(); // Remove the oldest ball
      }
      const newBall = {
        id: this.nextBallId++,
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
        dx: (Math.random() - 0.5) * 10,
        dy: (Math.random() - 0.5) * 10,
        size: 40,
        lifespan: 0,
      };

      // Ensure the ball's initial position is within the screen boundaries
      newBall.x = Math.max(newBall.x, 0);
      newBall.x = Math.min(newBall.x, window.innerWidth - newBall.size);
      newBall.y = Math.max(newBall.y, 0);
      newBall.y = Math.min(newBall.y, window.innerHeight - newBall.size);

      this.balls.push(newBall);
    },
    animateBalls() {
      setInterval(() => {
        this.balls.forEach((ball) => {
          ball.x += ball.dx;
          ball.y += ball.dy;
          ball.lifespan++;

          if (ball.x <= 0 || ball.x >= window.innerWidth - ball.size) {
            ball.dx *= -1;
            if (ball.lifespan > 10) {
              this.splitBall(ball);
            }
          }
          if (ball.y <= 0 || ball.y >= window.innerHeight - ball.size) {
            ball.dy *= -1;
            if (ball.lifespan > 10) {
              this.splitBall(ball);
            }
          }

          // Ensure the ball stays within the screen boundaries
          ball.x = Math.max(ball.x, 0);
          ball.x = Math.min(ball.x, window.innerWidth - ball.size);
          ball.y = Math.max(ball.y, 0);
          ball.y = Math.min(ball.y, window.innerHeight - ball.size);
        });
      }, 30);
    },
    splitBall(ball) {
      const ballIndex = this.balls.findIndex((b) => b.id === ball.id);
      if (ballIndex !== -1) {
        if (this.balls.length >= this.maxBalls) {
          return; // Stop splitting if the maximum number of balls is reached
        }

        const newBalls = [];
        for (let i = 0; i < 2; i++) {
          const newBall = {
            id: this.nextBallId++,
            x: ball.x + i * 10,
            y: ball.y + i * 10,
            dx: (Math.random() - 0.5) * 10,
            dy: (Math.random() - 0.5) * 10,
            size: ball.size / 1.2,
            lifespan: 0,
          };
          newBalls.push(newBall);
        }
        this.balls.splice(ballIndex, 1, ...newBalls);
      }
    },
  },
};
</script>

<style scoped>
.ball-background {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.ball {
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: rgb(107, 255, 179);
  box-shadow: #00dc82 0px 0px 10px 2px;
  opacity: 0.8;
}
</style>
