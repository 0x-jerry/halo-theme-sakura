<template>
  <div class="post-content">
    <site-header :user="user" :menus="menus" />

    <div class="thumb overflow-hidden relative a-fadeIn-bottom">
      <random-image
        class="absolute top-0 left-0 object-cover w-full h-full"
        :src="post.thumbnail"
        :random-id="post.id"
      />
    </div>

    <div class="w-content a-fadeIn-top px-8">
      <div class="title text-center text-3xl font-bold pt-10 pb-5">
        {{ post.title }}
      </div>
      <div class="desc text-gray-400">
        {{ info.createTime }}
      </div>
      <hr class="w-1/3 m-auto bg-gray-100 my-2" style="height: 1px" />

      <markdown :html="post.formatContent" class="py-5" />

      <div class="tags py-20">
        <v-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" class="mr-2" />
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useUniversalFetch } from '~/hooks'
import { useStore } from '~/store'

export default defineComponent({
  async beforeRouteEnter(to, _from, next) {
    await useUniversalFetch(to, async (store) => {
      await store.dispatch('fetchPost', to.query)
    })

    next()
  },
  async beforeRouteUpdate(to, _from, next) {
    await useUniversalFetch(to, async (store) => {
      await store.dispatch('fetchPost', to.query)
    })
    next()
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const menus = computed(() => store.state.menus)
    const postsMap = store.state.postsMap

    const route = useRoute()
    const post = computed(() => {
      const { id, slug } = route.query
      const iid = (slug || id) as string

      return postsMap[iid]
    })

    const info = computed(() => {
      return {
        createTime: dayjs(post.value.createTime).format('YYYY-MM-DD')
      }
    })

    return {
      user,
      menus,
      post,
      info
    }
  }
})
</script>

<style lang="less" scoped>
.thumb {
  height: 400px;
}

.title {
  &:before,
  &:after {
    font-weight: 700;
    position: relative;
    @apply text-blue-500;
  }

  // !fixme https://github.com/windicss/vite-plugin-windicss/issues/63
  // {} would lead a bug, so use 「」 instead
  &:before {
    top: -5px;
    content: '「';
  }

  &:after {
    content: '」';
    bottom: -7px;
  }
}
</style>
