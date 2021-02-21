<template>
  <header
    class="site-header flex items-center px-3"
    :class="{ active: stickHeader }"
  >
    <div class="left w-60">
      <span class="site-logo"> </span>
    </div>
    <div class="center flex-1 flex justify-center text-gray-500">
      <v-link
        v-for="o in menus"
        :key="o.id"
        class="menu-item"
        :class="{ active: isActive(o) }"
        @click="goToUrl(o)"
      >
        {{ o.name }}
      </v-link>
    </div>
    <div class="right flex justify-end w-60">
      <span class="site-avatar">
        <img class="w-full h-full" :src="user.avatar" alt="" />
      </span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    user: Object,
    site: Object,
    menus: Array,
  },
  data() {
    return {
      stickHeader: false,
    }
  },
  mounted() {
    const stickHeight = 20

    this.stickHeader = window.scrollY > stickHeight

    window.addEventListener('scroll', () => {
      this.stickHeader = window.scrollY > stickHeight
    })
  },
  methods: {
    goToUrl(o) {
      if (o.target === '_blank') {
        window.open(o.url)
      } else {
        const routePath = this.$route.path

        if (o.url === routePath) {
          window.scrollTo(0, 0)
        } else {
          this.$router.push(o.url)
        }
      }
    },
    isActive(o) {
      return this.$route.path === o.url
    },
  },
}
</script>

<style scoped>
.site-header {
  @apply fixed top-0 left-0 w-full h-16 bg-white z-50 bg-opacity-40;
  @apply hover:bg-opacity-90;
  @apply transition-colors duration-500;
}

.site-header.active {
  @apply bg-opacity-90;
  @apply shadow-xl;
}

.site-logo {
  @apply w-10 h-10 inline-block;
}

.site-avatar {
  @apply w-8 h-8 inline-block rounded-full overflow-hidden;
}

.menu-item {
  @apply p-2;
}
</style>