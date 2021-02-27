<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div class="a-fadeIn-bottom" style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

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
import { tagsSlugPostsGet } from '../../api'

export default {
  async asyncData(ctx) {
    const slug = ctx.route.params.slug

    const posts = await tagsSlugPostsGet({ slug })

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
      const data = await tagsSlugPostsGet({
        slug: this.$route.params.slug,
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
