<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <main-bg :userInfo="user" />
    <div class="posts w-content">
      <post-article
        v-for="(o, idx) in posts.content"
        :key="o.id"
        :post="o"
        :flip="idx % 2 !== 0"
      />
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script lang="ts">
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
  computed: {
    ...mapState(['user', 'menus']),
  },
})
</script>

<style scoped></style>
