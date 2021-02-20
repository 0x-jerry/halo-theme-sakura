<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <main-bg :user="user" />
    <div class="posts w-content">
      <post-article
        v-for="(o, idx) in posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>

    <div class="my-16 text-center">
      <div v-if="posts.hasNext" class="next">
        <span
          class="bg-white border border-solid border-gray-200 shadow-md rounded-full inline-block cursor-pointer"
          @click="getNextPostList"
        >
          <span v-if="isLoadingPost">
            <f-icon
              name="circle-notch"
              class="text-2xl px-6 py-2 animate-spin"
            />
          </span>
          <v-link v-else>
            <f-icon fas name="ellipsis-h" class="text-2xl px-6 py-2" />
          </v-link>
        </span>
      </div>
      <div v-else class="empty text-gray-400">没有更多文章了</div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { postsGet } from '../api/contentApi'

export default Vue.extend({
  async asyncData() {
    const [posts] = await Promise.all([postsGet({})])

    return {
      posts,
    }
  },
  data() {
    return {
      isLoadingPost: false,
    }
  },
  computed: {
    ...mapState(['user', 'menus']),
  },
  methods: {
    async getNextPostList() {
      this.isLoadingPost = true
      const data = await postsGet({
        page: this.posts.page + 1,
      })
      this.isLoadingPost = false

      const content = this.posts.content.concat(data.content)

      data.content = content

      this.posts = data
    },
  },
})
</script>

<style scoped></style>
