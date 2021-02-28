<template>
  <div class="progress fixed top-0 left-0 w-screen h-1 z-50">
    <div class="current bg-blue-400 h-full" :style="style"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useScrollEvent } from '../hooks'

export default defineComponent({
  setup() {
    const percentage = ref(0)

    useScrollEvent(() => {
      const height = document.body.scrollHeight - window.innerHeight
      const current = window.scrollY

      percentage.value = current / height
    })

    return {
      style: computed(() => {
        return {
          width: percentage.value * 100 + '%',
        }
      }),
    }
  },
})
</script>

<style scoped>
.current {
  transition: width ease 0.4s;
}
</style>
