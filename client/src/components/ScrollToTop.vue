<template>
  <div class="scroll-to-top overflow-hidden" :class="{ active }">
    <v-link class="text-gray-500" @click="gotoTop">
      <f-icon name="angle-up" class="scroll-icon" />
    </v-link>
    <div class="fragment" :style="style"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useScrollEvent } from '../hooks'

export default defineComponent({
  setup() {
    const active = ref(false)

    const percent = ref(0)

    useScrollEvent(() => {
      active.value = window.scrollY > 30

      const height = document.body.scrollHeight - window.innerHeight
      const current = window.scrollY

      percent.value = current / height
    })

    const style = computed(() => {
      return {
        height: percent.value * 100 + '%',
      }
    })

    return {
      active,
      gotoTop() {
        window.scrollTo(0, 0)
      },
      style,
    }
  },
})
</script>

<style>
.scroll-to-top {
  @apply fixed z-50 bottom-10 -right-10 opacity-0;
  @apply transition-all duration-1000;
  @apply w-10 h-10 rounded-full bg-white shadow bg-opacity-90;
  @apply flex justify-center items-center;
  @apply text-2xl;
}

.scroll-icon {
  z-index: 10;
  position: relative;
  mix-blend-mode: difference;
}

.scroll-to-top.active {
  @apply right-5 opacity-100;
}

.fragment {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  @apply bg-blue-400;
}
</style>
