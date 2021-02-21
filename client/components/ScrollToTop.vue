<template>
  <div class="scroll-to-top" :class="{ active }">
    <v-link class="text-gray-500" @click="gotoTop">
      <f-icon name="angle-up" />
    </v-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.active = window.scrollY > 30
    })

    this.active = window.scrollY > 30
  },
  methods: {
    gotoTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style>
.scroll-to-top {
  @apply fixed z-50 bottom-10 -right-10 opacity-0;
  @apply transition-all duration-1000;
  @apply w-10 h-10 rounded-full bg-white shadow bg-opacity-90;
  @apply flex justify-center items-center;
  @apply text-2xl;
}

.scroll-to-top.active {
  @apply right-5 opacity-100;
}
</style>
