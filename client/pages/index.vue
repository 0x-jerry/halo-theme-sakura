<template>
  <div class="halo-theme sakura">
    <main-bg :userInfo="userInfo" />
    <div class="posts m-auto">
      <post-article
        v-for="(o, idx) in posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>

    <site-footer class="mt-10" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { postsGet, usersProfileGet } from '../api/contentApi'

export default Vue.extend({
  async asyncData() {
    const [posts, userInfo] = await Promise.all([
      postsGet({}),
      usersProfileGet(),
    ])

    return {
      posts,
      userInfo,
    }
  },
  data() {
    return {
      posts: {
        content: [],
      } as any,
    }
  },
  mounted() {
    console.log(this.$data)
  },
})
</script>

<style scoped>
.posts {
  max-width: 880px;
}
</style>
