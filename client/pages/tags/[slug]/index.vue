<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div class="a-fadeIn-bottom" style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <div>
      <div class="title text-center my-10 text-3xl">
        <v-icon name="tags" class="text-3xl" />
        {{ currentTag?.name }}
      </div>
    </div>

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

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { CustomizedPageOfPostListVO, tagsSlugPostsGet } from '~/api'
import { useUniversalFetch, useUniversalFetchData } from '~/hooks'
import { useStore } from '~/store'

export default defineComponent({
  async beforeRouteEnter(to, _, next) {
    await useUniversalFetch(to, async () => {
      const slug = to.params.slug as string

      const posts = await tagsSlugPostsGet({ slug })

      return posts
    })
    next()
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const menus = computed(() => store.state.menus)

    const data = reactive({
      posts: (useUniversalFetchData() || {}) as CustomizedPageOfPostListVO
    })

    const isLoadingPost = ref(false)
    const route = useRoute()

    return {
      currentTag: computed(() =>
        store.state.tags.find((t) => t.slug === route.params.slug)
      ),
      data,
      isLoadingPost,
      user,
      menus,
      async getNextPostList() {
        isLoadingPost.value = true
        const postData = await tagsSlugPostsGet({
          slug: route.params.slug as string,
          page: data.posts.page + 1
        })
        isLoadingPost.value = false

        const content = data.posts.content.concat(postData.content)

        postData.content = content

        data.posts = postData
      }
    }
  }
})
</script>

<style scoped></style>
