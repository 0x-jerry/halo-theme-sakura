<template>
  <div class="halo-theme sakura">
    <site-header
      :user="user"
      :menus="menus"
    />

    <main-bg :user="user" />
    <div class="posts w-content a-fadeIn-top">
      <post-article
        v-for="(o, idx) in data.posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>

    <div class="my-16 text-center">
      <v-more-btn
        :has-more="data.posts.hasNext"
        :more-action="getNextPostList"
      />
    </div>

    <site-footer
      class="mt-10"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { CustomizedPageOfPostListVO } from '../api'
import { postsGet } from '../api/contentApi'
import { useUniversalFetch, useUniversalFetchData } from '../hooks'
import { useStore } from '../store'

export default defineComponent({
  async beforeRouteEnter(to, from, next) {
    await useUniversalFetch(to, async () => {
      const posts = await postsGet()
      return {
        posts
      }
    })

    next()
  },
  setup() {
    const data = reactive({
      posts: {} as CustomizedPageOfPostListVO,
      isLoadingPost: false
    })

    const store = useStore()

    data.posts = useUniversalFetchData().posts

    return {
      data,
      user: computed(() => store.state.user),
      menus: computed(() => store.state.menus),
      async getNextPostList() {
        data.isLoadingPost = true
        const postData = await postsGet({
          page: data.posts.page + 1
        })

        data.isLoadingPost = false

        const content = data.posts.content.concat(postData.content)

        postData.content = content

        data.posts = postData
      }
    }
  }
})
</script>

<style scoped></style>
