<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <main-bg :user="user" />
    <div class="posts w-content a-fadeIn-top">
      <post-article
        v-for="(o, idx) in posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>

    <div class="my-16 text-center">
      <v-more-btn :has-more="posts.hasNext" :more-action="getNextPostList" />
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { postsGet } from '../api/contentApi'

export default {
  data() {
    return {
      posts: {},
      isLoadingPost: false,
    }
  },
  computed: {
    ...mapState(['user', 'menus']),
  },
  async beforeCreate() {
    const posts = await postsGet()

    this.posts = posts
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
}
</script>

<style scoped></style>
