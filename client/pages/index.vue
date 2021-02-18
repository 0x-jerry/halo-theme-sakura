<template>
  <div class="halo-theme sakura">
    <main-bg :userInfo="userInfo" />
    <div class="posts m-auto py-20">
      <post
        v-for="(o, idx) in posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import api from '../api/index'

export default Vue.extend({
  async asyncData() {
    const [posts, userInfo] = await Promise.all([
      api.content.postsGet({}),
      api.content.usersProfileGet(),
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
