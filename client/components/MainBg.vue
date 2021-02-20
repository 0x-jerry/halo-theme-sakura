<template>
  <div class="main-bg">
    <div
      class="bg-fixed bg-cover bg-center flex items-center justify-center h-screen"
    >
      <random-image class="absolute z-0" random-id="main" />
      <div class="absolute z-10 w-full h-full bg-gray-400 bg-opacity-25"></div>
      <div class="block relative z-20">
        <h1 class="text-center glitch" data-text="Hi, Friend">Hi, Friend</h1>
        <p
          class="desc bg-black bg-opacity-25 rounded-3xl text-white text-center py-5"
        >
          {{ userInfo.description }}
        </p>
      </div>
      <div
        class="arrow-animation transform absolute z-20 bottom-10 animate-bounce cursor-pointer w-full text-center"
      >
        <span @click="scrollOnePage">
          <f-icon fas name="chevron-down" class="text-white text-6xl" />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FIcon from './FIcon.vue'

export default Vue.extend({
  components: { FIcon },
  props: ['userInfo'],
  methods: {
    scrollOnePage() {
      window.scrollTo(0, window.innerHeight)
    },
  },
})
</script>

<style scoped>
.arrow-animation {
  animation-duration: 3s;
}

.glitch {
  margin: auto;
  font-family: Ubuntu, sans-serif;
  font-size: 80px;
  transition: background 1s;
  font-weight: 900;

  position: relative;
  color: #fff;
  mix-blend-mode: lighten;
  overflow: hidden;
  white-space: nowrap;
}

.glitch:before,
.glitch:after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  clip: rect(0, 0, 0, 0);
}

.glitch:before {
  left: -1px;
  text-shadow: 1px 0 #ff3f1a;
}

.glitch:after {
  left: 1px;
  text-shadow: -1px 0 #00a7e0;
}

.glitch:hover:before {
  text-shadow: 4px 0 #ff3f1a;
  animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
}

.glitch:hover:after {
  text-shadow: -5px 0 #00a7e0;
  animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
}

@-webkit-keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }

  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }

  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }

  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }

  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }

  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }

  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }

  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }

  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@-webkit-keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}

@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }

  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }

  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }

  75% {
    top: 0;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }

  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}

.desc {
  width: 600px;
}
</style>
