<template>
  <div class="post-content">
    <div class="thumb overflow-hidden relative">
      <random-image
        class="absolute top-0 left-0 object-cover w-full h-full"
        :random-id="post.id"
      />
    </div>
    <div class="content">
      <div class="title text-center text-3xl font-bold pt-10 pb-5">
        {{ post.title }}
      </div>
      <div class="desc text-gray-400">{{ info.createTime }}</div>
      <hr class="w-1/3 m-auto bg-gray-100 my-2" style="height: 1px" />
      <markdown :html="content" class="py-5" />
      <div class="tags py-20">
        <v-tag v-for="tag in post.tags" :key="tag.id" :name="tag.name" />
      </div>
    </div>
    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { postsPostIdGet, usersProfileGet } from '../../api/contentApi'

export default {
  async asyncData(ctx) {
    const id = ctx.route.params.id

    const [user, post] = await Promise.all([
      usersProfileGet(),
      postsPostIdGet({
        postId: id,
      }),
    ])

    return {
      user,
      post,
      content: post.formatContent,
    }
  },
  computed: {
    info() {
      return {
        createTime: dayjs(this.post.createTime).format('YYYY-MM-DD'),
      }
    },
  },
  mounted() {
    console.log(this)
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

.content {
  width: 800px;
  margin: auto;
}
</style>
