<script lang="ts" setup>
const imgEl = ref<HTMLDivElement | null>(null);

export interface HeroImageProps {
  description?: string;
  title?: string;
}

const props = defineProps<HeroImageProps>();

function scrollOnePage() {
  window.scrollTo({
    top: imgEl.value?.clientHeight || 0,
    behavior: "smooth",
  });
}

const _title = computed(() => props.title || "Hi, Friend!");

const { count, inc } = useCounter(1);
</script>

<template>
  <div class="hero-image">
    <div ref="imgEl" class="flex items-center justify-center h-screen">
      <img
        class="size-full absolute object-cover"
        :src="`https://0x-jerry.icu/api/img?c=${count}`"
      />
      <HeroWaves class="!absolute bottom-0 z-10 w-full" color="237 203 224" />
      <div class="bg-grid absolute z-20 size-full" />
      <div
        class=" transform absolute z-30 bottom-10"
        w="full"
        text="center"
      >
        <VIcon
          @click="scrollOnePage"
          class="text-3xl"
          transition="~"
          text="white hover:b-primary"
          animate="bounce duration-2000"
          cursor="pointer"
          name="i-heroicons-arrow-down"
        />
      </div>

      <!-- content -->
      <div class="block relative z-40">
        <h1
          class="glitch text-center md:text-9xl text-4xl cursor-pointer"
          @click="inc()"
          :data-text="_title"
        >
          {{ _title }}
        </h1>
        <p v-if="description" class="desc">
          {{ description }}
        </p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg-grid {
  background: linear-gradient(#0a0a0a1a, #0000004d),
    repeating-linear-gradient(
      0,
      transparent,
      transparent 2px,
      #8d8d8d 3px,
      #b3b3b3 3px
    );
}

.desc {
  @apply rounded-3xl text-white text-center py-5;

  background: rgba(0, 0, 0, 0.5);
  position: relative;
  max-width: 600px;
  margin: auto;
  margin-top: 30px;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 20%;
    transform: translate(0, -100%);
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.5) transparent;
  }
}
</style>

<style>
.glitch {
  margin: auto;
  font-family: Ubuntu, sans-serif;
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

.glitch.active:before,
.glitch:hover:before {
  text-shadow: 4px 0 #ff3f1a;
  animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
}

.glitch.active:after,
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
</style>
