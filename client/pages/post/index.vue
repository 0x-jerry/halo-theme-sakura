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
        <v-tag v-for="tag in post.tags" :key="tag.id" :tag="tag" class="mr-2" />
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import {
  postsPostIdGet,
  postsSlugGet,
  sheetsSheetIdGet,
  sheetsSlugGet,
} from '../../api/contentApi'

export default {
  async asyncData(ctx) {
    const { type, id, slug } = ctx.route.query

    let post = null
    if (type === 'sheet') {
      if (id) {
        post = await sheetsSheetIdGet({ sheetId: id })
      } else {
        post = await sheetsSlugGet({ slug })
      }
    } else if (id) {
      post = await postsPostIdGet({ postId: id })
    } else {
      post = await postsSlugGet({ slug })
    }

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
