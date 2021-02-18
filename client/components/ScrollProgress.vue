<template>
  <div class="progress fixed top-0 left-0 w-screen h-1 z-50">
    <div class="current bg-blue-400 h-full" :style="style"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0,
    }
  },
  computed: {
    style() {
      return {
        width: this.percentage * 100 + '%',
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const height = document.body.scrollHeight - window.innerHeight
      const current = window.scrollY

      this.percentage = current / height
    })
  },
}
</script>

<style scoped>
.current {
  transition: width ease 0.4s;
}
</style>
