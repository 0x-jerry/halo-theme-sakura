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

      <markdown :html="content" class="py-5" />

      <div class="tags py-20">
        <v-tag
          v-for="tag in post.tags"
          :key="tag.id"
          :name="tag.name"
          class="mr-2"
        />
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import { postsPostIdGet } from '../../api/contentApi'

export default {
  async asyncData(ctx) {
    const id = ctx.route.params.id

    const [post] = await Promise.all([
      postsPostIdGet({
        postId: id,
      }),
    ])

    return {
      post,
      content: post.formatContent,
    }
  },
  computed: {
    ...mapState(['user', 'menus']),
    info() {
      return {
        createTime: dayjs(this.post.createTime).format('YYYY-MM-DD'),
      }
    },
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
