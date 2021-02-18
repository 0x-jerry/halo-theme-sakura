<template>
  <div
    class="post mt-16 shadow-xl rounded-2xl overflow-hidden cursor-pointer border border-gray-200 flex"
    :class="{ flip }"
    @click="gotoPost"
    ref="$root"
  >
    <article class="post-article flex">
      <div class="content p-5">
        <div class="title overflow-hidden text-3xl font-bold">
          {{ post.title }}
        </div>
        <div class="summary break-words mt-5 overflow-hidden">
          {{ post.summary }}
        </div>
      </div>
      <div class="thumb overflow-hidden border-gray-200">
        <random-image :random-id="post.id" class="img" />
      </div>
    </article>
  </div>
</template>

<script>
import { globalUtils } from './utils'

export default {
  props: ['post', 'flip'],
  mounted() {
    globalUtils.observer.observe(this.$refs.$root)
  },
  methods: {
    gotoPost() {
      this.$router.push('/post/' + this.post.id)
      console.log(this)
    },
  },
}
</script>

<style scoped>
.post {
  height: 300px;
  opacity: 0;
  transition: all ease 1s;
  transform: translate(0, 30px) scale(0.9);
}

.post.visible {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

.flip > .post-article {
  @apply flex-row-reverse;
}

.thumb {
  border-width: 0 0 0 1px;
}

.flip .thumb {
  border-width: 0 1px 0 0;
}

.post-article {
}

.content {
  width: 45%;
}

.thumb {
  width: 55%;
}

.thumb .img {
  transform: scale(1);
  transition: transform ease 0.4s;
}

.post:hover .thumb .img {
  transform: scale(1.2);
}
</style>
