<template>
  <div
    ref="$root"
    class="random-image w-full h-full bg-cover bg-center bg-no-repeat"
    style="background-image: url('/svg/loading.svg')"
    @can-visible="visible = true"
  >
    <img
      v-if="visible"
      :src="imageSrc"
      class="img object-cover hidden w-full h-full object-center"
      :class="{ block: !loading }"
      @load="loaded"
    />
  </div>
</template>

<script>
import { globalUtils } from './utils'
export default {
  props: {
    src: String,
    randomId: {
      type: [String, Number],
      default() {
        return ~~(Math.random() * 10)
      },
    },
    // 640 960 1280 1440
    size: String,
  },
  data() {
    return {
      visible: false,
      loading: true,
    }
  },
  computed: {
    imageSrc() {
      const url = new URL('https://api.lixingyong.com/api/images')
      url.searchParams.set('postId', this.randomId)
      url.searchParams.set('type', 'url')
      url.searchParams.set('itype', 'image')

      if (this.size) {
        url.searchParams.set('th', this.size)
      }

      return this.src || url.toString()
    },
  },
  mounted() {
    globalUtils.observer.observe(this.$refs.$root)
  },
  methods: {
    test(e) {
      console.log(e)
    },
    loaded() {
      this.loading = false
      console.log('loaded')
    },
  },
}
</script>

<style scoped>
.img.block {
  display: block;
}
</style>
