<template>
  <div
    ref="$root"
    class="random-image w-full h-full bg-blue-400"
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
      const size = this.size ? `&th=${this.size}` : ''
      const randomUrl = `https://api.lixingyong.com/api/images?postId=${this.randomId}&type=url&itype=image${size}`

      // const r =
      //   'https://cdn.jsdelivr.net/gh/LIlGG/halo-theme-sakura@1.3.0/source/images/hd.jpg'
      return this.src || randomUrl
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
