<template>
  <div class="post-content">
    <site-header :user="user" :menus="menus" />

    <div class="thumb overflow-hidden relative">
      <random-image
        class="absolute top-0 left-0 object-cover w-full h-full"
        :src="post.thumbnail"
        :random-id="post.id"
      />
    </div>

    <div class="w-content">
      <div class="title text-center text-3xl font-bold pt-10 pb-5">
        {{ post.title }}
      </div>
      <div class="desc text-gray-400">{{ info.createTime }}</div>
      <hr class="w-1/3 m-auto bg-gray-100 my-2" style="height: 1px" />

      <markdown :html="post.formatContent" class="py-5" />

      <div class="tags py-20">
        <v-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" class="mr-2" />
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions, mapState } from 'vuex'

export default {
  async asyncData(ctx) {
    // const { type, id, slug } = ctx.route.query
    await ctx.store.dispatch('fetchPost', ctx.route.query)
  },
  computed: {
    ...mapState(['user', 'menus', 'postsMap']),
    post() {
      const { id, slug } = this.$route.query

      return this.postsMap[slug || id]
    },
    info() {
      return {
        createTime: dayjs(this.post.createTime).format('YYYY-MM-DD'),
      }
    },
  },
  watchQuery: ['id', 'type', 'slug'],
  methods: {
    ...mapActions(['fetchPost']),
  },
}
</script>

<style scoped>
.title:before,
.title:after {
  font-weight: 700;

  @apply text-blue-500;
}

.title:before {
  content: '{';
}

.title:after {
  content: '}';
}

.thumb {
  height: 400px;
}
</style>
