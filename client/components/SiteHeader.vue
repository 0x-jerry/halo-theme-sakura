<template>
  <div
    v-if="isMobile"
    class="fixed top-0 left-0 w-full h-10 bg-white bg-opacity-60 z-10 flex justify-center items-center"
    @click="showHeader = !showHeader"
  >
    Menu
  </div>
  <div
    v-if="isMobile"
    class="fixed top-0 left-0 w-screen h-screen bg-white bg-opacity-80 z-30"
    :class="{
      hidden: !showHeader
    }"
    @click="showHeader = !showHeader"
  ></div>
  <header
    class="site-header hidden md:flex flex-col md:flex-row items-center px-3 a-fadeIn"
    :class="{ active: isMobile ? showHeader : stickHeader }"
  >
    <div class="w-full md:w-60">
      <span class="site-logo" />
    </div>
    <div
      class="flex-1 flex flex-col md:flex-row md:justify-center text-gray-500 a-fadeIn-right"
    >
      <v-link
        v-for="o in vMenus"
        :key="o.id"
        class="menu-item"
        :class="{ active: isActive(o) }"
        @click="gotoUrl(o)"
      >
        {{ o.name }}
      </v-link>
    </div>
    <div class="flex w-full md:justify-end md:w-60">
      <span class="site-avatar cursor-pointer" @click="gotoAdmin">
        <img class="w-full h-full" :src="user.avatar" alt="" />
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuDTO, UserDTO } from '~/api'
import { useScrollEvent } from '~/hooks'
import { useMobile } from '~/hooks/useMobile'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserDTO>,
      required: true
    },
    menus: {
      type: Array as PropType<Array<MenuDTO>>,
      default: () => []
    }
  },
  setup(props) {
    const isMobile = useMobile()
    const showHeader = ref(false)

    const vMenus = computed(() =>
      props.menus.map((menu) => {
        const url = /^\/s\//.test(menu.url)
          ? `/post?slug=${menu.url.slice('/s/'.length)}&type=sheet`
          : menu.url

        return {
          ...menu,
          url
        }
      })
    )

    const stickHeader = ref(false)

    const stickHeight = 20

    useScrollEvent(() => {
      stickHeader.value = window.scrollY > stickHeight
    }, true)

    const route = useRoute()
    const router = useRouter()

    return {
      isMobile,
      showHeader,
      stickHeader,
      vMenus,
      gotoUrl(o: MenuDTO) {
        if (o.target === '_blank') {
          window.open(o.url)
        } else {
          const routePath = route.path

          if (o.url === routePath) {
            window.scrollTo(0, 0)
          } else {
            showHeader.value = false
            router.push(o.url)
          }
        }
      },
      gotoAdmin() {
        const url = new URL(location.href)
        url.search = ''
        url.pathname = '/admin'

        window.open(url.toString())
      },
      isActive(o: MenuDTO) {
        return route.fullPath === o.url
      }
    }
  }
})
</script>

<style scoped>
.site-header {
  @apply fixed top-0 left-0 w-1/3 h-screen bg-white z-40 bg-opacity-90;
  @apply hover:bg-opacity-90;
  @apply transition-colors duration-100 md:duration-500;
  @apply py-5 md:py-0;
}

.site-header.active {
  @apply flex bg-opacity-90;
  @apply md:shadow-xl;
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

@media (min-width: 520px) {
  .site-header {
    @apply w-full h-16 bg-opacity-40;
  }
}
</style>
