<template>
  <div class="archive-item bg-gray-100">
    <div class="flex items-center">
      <span class="title text-lg">
        {{ post.title }}
      </span>
      <div class="flex flex-1 justify-end items-center">
        <f-icon
          far
          class="mx-2"
          name="clock"
        />
        <span class="mx-2">
          {{ dateToString(post.createTime) }}
        </span>
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
    </div>
    <div class="p-1" />
    <div class="tags flex">
      <div class="flex">
        <v-category
          v-for="c in post.categories"
          :key="c.id"
          :category="c"
          class="mr-2"
        />
      </div>
      <div class="flex flex-1 justify-end">
        <v-tag
          v-for="tag in post.tags"
          :key="tag.id"
          :tag="tag"
          class="mr-2"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { defineComponent, PropType } from 'vue'
import { PostDetailVO } from '../api'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<PostDetailVO>,
      required: true
    }
  },
  setup() {
    return {
      dateToString(date: number | string, format = 'MM-DD') {
        return dayjs(date).format(format)
      }
    }
  }
})
</script>

<style></style>
