<template>
  <div class="halo-theme sakura">
    <main-bg :userInfo="userInfo" />
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

<style></style>
