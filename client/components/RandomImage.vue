<template>
  <div
    ref="$root"
    class="random-image w-full h-full bg-cover bg-center bg-no-repeat"
    style="background-image: url('/svg/loading.svg')"
    @can-visible="canVisible"
  >
    <img
      v-if="visible"
      :src="imgUrl"
      class="img object-cover hidden w-full h-full object-center"
      :class="{ block: !loading }"
      @load="loaded"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { globalUtils } from './utils'

const randomImgMap = {}

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
      imgUrl: '',
    }
  },
  mounted() {
    globalUtils.observer.observe(this.$refs.$root)
  },
  methods: {
    async imageApi() {
      try {
        const { data } = await axios.get('/capi/image/random', {
          params: { id: this.randomId },
        })

        return data.imgurl
      } catch (error) {
        console.log('error', { error })
      }
    },
    async getImageUrl() {
      if (this.src) {
        return this.src
      }

      if (randomImgMap[this.randomId]) {
        return randomImgMap[this.randomId]
      }

      try {
        const url = await this.imageApi()

        const isValidUrl = !/\/large\/\.jpg$/.test(url)

        if (isValidUrl) {
          randomImgMap[this.randomId] = url
        }
        return url
      } catch (error) {
        console.log('load image error', error)
      }
    },
    async canVisible() {
      this.visible = true
      this.imgUrl = await this.getImageUrl()
    },
    loaded() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.img.block {
  display: block;
}
</style>
