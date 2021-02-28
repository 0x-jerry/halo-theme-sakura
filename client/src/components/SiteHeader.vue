<template>
  <header
    class="site-header flex items-center px-3 a-fadeIn"
    :class="{ active: stickHeader }"
  >
    <div class="left w-60">
      <span class="site-logo"> </span>
    </div>
    <div class="center flex-1 flex justify-center text-gray-500 a-fadeIn-left">
      <v-link
        v-for="o in vMenus"
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

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuDTO, UserDTO } from '../api'
import { useScrollEvent } from '../hooks'

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<UserDTO>,
      required: true,
    },
    menus: {
      type: Array as PropType<Array<MenuDTO>>,
      default: () => [],
    },
  },
  setup(props) {
    const vMenus = computed(() =>
      props.menus.map((menu) => {
        const url = /^\/s\//.test(menu.url)
          ? `/post?slug=${menu.url.slice('/s/'.length)}&type=sheet`
          : menu.url

        return {
          ...menu,
          url,
        }
      })
    )

    const stickHeader = ref(false)

    const stickHeight = 20

    useScrollEvent(() => {
      stickHeader.value = window.scrollY > stickHeight
    })

    const route = useRoute()
    const router = useRouter()

    return {
      stickHeader,
      vMenus,
      goToUrl(o: MenuDTO) {
        if (o.target === '_blank') {
          window.open(o.url)
        } else {
          const routePath = route.path

          if (o.url === routePath) {
            window.scrollTo(0, 0)
          } else {
            router.push(o.url)
          }
        }
      },
      isActive(o: MenuDTO) {
        return route.fullPath === o.url
      },
    }
  },
})
</script>

<style scoped>
.site-header {
  @apply fixed top-0 left-0 w-full h-16 bg-white z-40 bg-opacity-40;
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
