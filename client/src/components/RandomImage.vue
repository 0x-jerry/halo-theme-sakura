<template>
  <div
    ref="root"
    class="random-image w-full h-full bg-cover bg-center bg-no-repeat"
    style="background-image: url('/svg/loading.svg')"
  >
    <img
      v-if="data.visible"
      :src="data.imgUrl"
      class="img object-cover hidden w-full h-full object-center"
      :class="{ block: !data.loading, visible: data.visible }"
      @load="loaded"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useObserve } from '../hooks/useObserve'

const randomImgMap: Record<string, string> = {}

async function getImageUrl(id: string, src?: string) {
  if (src) {
    return src
  }

  if (randomImgMap[id]) {
    return randomImgMap[id]
  }

  try {
    const url = await imageApi(id)

    const isValidUrl = !/\/large\/\.jpg$/.test(url)

    if (isValidUrl) {
      randomImgMap[id] = url
    }
    return url
  } catch (error) {
    console.error('load image error', error)
  }
}

async function imageApi(id: string) {
  try {
    const { data } = await axios.get(
      'http://localhost:9555/capi/image/random',
      {
        params: { id },
      }
    )

    return data.imgurl
  } catch (error) {
    console.error('error', { error })
  }
}

export default defineComponent({
  props: {
    src: String,
    randomId: {
      type: [Number, String],
      default: () => {
        return ~~(Math.random() * 10)
      },
    },
    // 640 960 1280 1440
    size: String,
  },
  setup(props) {
    const data = reactive({
      visible: false,
      imgUrl: '',
      loading: true,
    })

    const root = ref<any>(null)

    watchEffect(async () => {
      data.imgUrl = await getImageUrl(String(props.randomId), props.src)
    })

    useObserve(root, async () => {
      data.visible = true
      data.imgUrl = await getImageUrl(String(props.randomId), props.src)
    })

    return {
      data,
      root,
      loaded: () => (data.loading = false),
    }
  },
})
</script>

<style scoped>
.img.block {
  display: block;
}
</style>
