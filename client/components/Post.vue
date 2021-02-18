<template>
  <div
    ref="$root"
    class="post mt-16 shadow-xl rounded-2xl overflow-hidden border border-gray-200 flex"
    :class="{ flip }"
  >
    <article
      class="post-article flex reverse text-gray-500 hover:text-gray-600"
    >
      <div class="content p-5">
        <div class="reverse flex">
          <v-icon class="mx-2" name="time" />
          {{ meta.createTime }}
        </div>
        <div class="flex reverse mt-3">
          <h2
            class="title clickable text-2xl font-bold mx-2 h-10 overflow-ellipsis"
            @click="gotoPost"
          >
            {{ post.title }}
          </h2>
        </div>
        <div class="flex reverse mt-3 items-center">
          <v-icon class="mx-2" name="attention" />
          <span class="mx-2">
            {{ post.visits }}
          </span>
          <v-icon class="mx-2" name="mark" />
          <span class="mx-2">
            {{ post.commentCount }}
          </span>
        </div>
        <p class="summary break-words mt-5 overflow-hidden mx-2">
          {{ post.summary }}
        </p>
        <div class="flex reverse mt-3">
          <div @click="gotoPost">
            <v-icon name="caidan" class="mx-2 text-3xl clickable" />
          </div>
        </div>
      </div>
      <div
        class="thumb overflow-hidden border-gray-200 cursor-pointer"
        @click="gotoPost"
      >
        <random-image :random-id="post.id" class="img" />
      </div>
    </article>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { globalUtils } from './utils'

export default {
  props: ['post', 'flip'],
  data() {
    return {
      dayjs,
    }
  },
  computed: {
    meta() {
      return {
        createTime: dayjs(this.post.createTime).format('YYYY-MM-DD HH:mm'),
      }
    },
  },
  mounted() {
    globalUtils.observer.observe(this.$refs.$root)
  },
  methods: {
    gotoPost() {
      this.$router.push('/post/' + this.post.id)
    },
  },
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.clickable:hover {
  @apply text-blue-500;
}

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

.thumb {
  border-width: 0 0 0 1px;
}

.flip .thumb {
  border-width: 0 1px 0 0;
}

.flip .reverse {
  @apply flex-row-reverse;
}

.summary {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
