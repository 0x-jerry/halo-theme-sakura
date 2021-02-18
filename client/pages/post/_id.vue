<template>
  <div class="post-content">
    <div class="thumb overflow-hidden relative">
      <random-image
        class="absolute top-0 left-0 object-cover w-full h-full"
        :random-id="post.id"
      />
    </div>
    <div class="content pt-10">
      <markdown :content="content" />
    </div>
  </div>
</template>

<script>
import api from '../../api'

export default {
  async asyncData(ctx) {
    const id = ctx.route.params.id
    // const md = ctx.res?.md

    const post = await api.content.postsPostIdGet({
      formatDisabled: false,
      postId: id,
    })

    // const rendered = md.render(post.originalContent)

    return {
      post,
      content: post.formatContent,
    }
  },
  mounted() {
    console.log(this)
  },
}
</script>

<style scoped>
.thumb {
  height: 400px;
}

.content {
  width: 800px;
  margin: auto;
}
</style>
