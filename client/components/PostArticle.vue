<template>
  <div
    ref="root"
    class="post mt-16 shadow-xl rounded-2xl overflow-hidden border border-gray-200 flex"
    :class="{ flip, visible }"
  >
    <article
      class="post-article flex reverse text-gray-500 hover:text-gray-600"
    >
      <div class="content py-5 px-3">
        <div class="reverse flex">
          <v-icon
            class="mx-2"
            name="time"
          />
          {{ meta.createTime }}
        </div>
        <div class="flex reverse mt-3">
          <v-link
            class="title text-2xl font-bold mx-2 h-10 overflow-ellipsis"
            :content="post.title"
            @click="gotoPost"
          />
        </div>
        <div class="flex reverse mt-3 items-center">
          <v-icon
            class="mx-2"
            name="attention"
          />
          <span class="mx-2">
            {{ post.visits }}
          </span>
          <v-icon
            class="mx-2"
            name="mark"
          />
          <span class="mx-2">
            {{ post.commentCount }}
          </span>
        </div>
        <p class="summary break-words mt-5 overflow-hidden mx-2">
          {{ post.summary }}
        </p>
        <div class="flex reverse mt-3">
          <div @click="gotoPost">
            <v-icon
              name="caidan"
              class="mx-2 text-3xl clickable"
            />
          </div>
        </div>
      </div>
      <div
        class="thumb overflow-hidden border-gray-200 cursor-pointer"
        @click="gotoPost"
      >
        <random-image
          :src="post.thumbnail"
          :random-id="post.id"
          class="img"
        />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { computed, defineComponent, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PostDetailVO } from '../api'
import { useObserve } from '../hooks'
import VLink from './VLink.vue'

export default defineComponent({
  components: { VLink },
  props: {
    post: {
      type: Object as PropType<PostDetailVO>,
      required: true
    },
    flip: {
      type: Boolean,
      default: false
    }
  },
  setup(prop, ctx) {
    const root = ref<any>(null)
    const visible = ref(false)

    useObserve(root, () => (visible.value = true))

    const router = useRouter()

    return {
      root,
      visible,
      dayjs,
      meta: computed(() => {
        return {
          createTime: dayjs(prop.post.createTime).format('YYYY-MM-DD')
        }
      }),
      gotoPost() {
        const id = prop.post.id

        router.push(`/post?id=${id}`)
      }
    }
  }
})
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
