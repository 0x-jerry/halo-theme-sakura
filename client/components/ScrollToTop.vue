<template>
  <div
    class="scroll-to-top overflow-hidden cursor-pointer"
    :class="{ active }"
    :style="{ width: style.cx * 2 + 'px', height: style.cy * 2 + 'px' }"
    @click="gotoTop"
  >
    <v-link class="text-gray-500">
      <f-icon
        name="angle-up"
        class="scroll-icon"
      />
    </v-link>
    <svg
      class="bg-ring"
      :width="style.cx * 2"
      :height="style.cy * 2"
    >
      <circle
        class="bg-ring__circle"
        :style="style"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useScrollEvent } from '../hooks'

export default defineComponent({
  setup() {
    const active = ref(false)

    const percent = ref(0)

    const updateScrollStatus = () => {
      active.value = window.scrollY > 30

      const height = document.body.scrollHeight - window.innerHeight
      const current = window.scrollY

      percent.value = current / height
    }

    useScrollEvent(updateScrollStatus, true)

    const r = 20
    const strokeWidth = 4

    const circumference = r * 2 * Math.PI

    const style = computed(() => {
      const offset = circumference - percent.value * circumference

      return {
        strokeWidth,
        fill: 'transparent',
        strokeDashoffset: offset,
        strokeDasharray: `${circumference} ${circumference}`,
        r: r,
        cx: r,
        cy: r
      }
    })

    return {
      active,
      gotoTop() {
        window.scrollTo(0, 0)
      },
      style
    }
  }
})
</script>

<style lang="less">
.scroll-to-top {
  @apply fixed z-50 bottom-10 -right-10 opacity-0;
  @apply transition-all duration-1000;
  @apply rounded-full bg-white shadow bg-opacity-90;
  @apply flex justify-center items-center;
  @apply text-2xl;

  &:hover {
    .scroll-icon {
      @apply text-blue-500;
    }
  }
}

.scroll-icon {
  z-index: 10;
  position: relative;
}

.scroll-to-top.active {
  @apply right-5 opacity-100;
}

.bg-ring {
  position: absolute;
  top: 0;
  left: 0;
}

.bg-ring__circle {
  stroke: #03a9f4;
  transition: 0.25s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
