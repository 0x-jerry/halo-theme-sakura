<template>
  <footer
    class="site-footer pb-10 a-fadeIn-top"
    role="contentinfo"
  >
    <div class="site-info">
      <div class="flex justify-center">
        <p
          class="sakura-icon animate-spin h-8 w-8 bg-contain bg-no-repeat bg-center"
          :style="{
            backgroundImage: `url('https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.8/img/Sakura/images/sakura.svg')`,
          }"
        />
      </div>
      <div class="text-center text-gray-400 text-sm">
        <p
          class="mt-2"
          style="font-family: 'Ubuntu', sans-serif"
        >
          <span>
            Powered
            <f-icon
              fab
              name="vimeo-v"
              class="text-red-500"
            />
            by
            <v-link
              open
              href="http://halo.run"
              title="一个优秀的开源博客发布应用"
              content="Halo"
            />
          </span>
          •
          <span>
            Crafted with
            <f-icon
              name="heart"
              class="text-red-500"
            />
            by
            <v-link
              open
              href="https://github.com/cwxyz007"
              content="Gem Xli"
            />
          </span>
        </p>
        <p class="mt-2">
          © {{ year }} {{ user.nickname }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'
import { UserDTO } from '../api'

export default defineComponent({
  props: {
    user: {
      required: true,
      type: Object as PropType<UserDTO>
    }
  },
  setup() {
    return {
      year: dayjs().year()
    }
  }
})
</script>

<style scoped>
.sakura-icon {
  animation-duration: 20s;
}
</style>
