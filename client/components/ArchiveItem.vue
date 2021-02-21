<template>
  <div class="archive-item bg-gray-100">
    <div class="flex items-center">
      <span class="title text-lg">
        {{ post.title }}
      </span>
      <div class="flex flex-1 justify-end items-center">
        <f-icon far class="mx-2" name="clock" />
        <span class="mx-2">
          {{ dateToString(post.createTime) }}
        </span>
        <v-icon class="mx-2" name="attention" />
        <span class="mx-2">
          {{ post.visits }}
        </span>
        <v-icon class="mx-2" name="mark" />
        <span class="mx-2">
          {{ post.commentCount }}
        </span>
      </div>
    </div>
    <div class="p-1"></div>
    <div class="tags flex justify-end">
      <v-tag
        v-for="tag in post.tags"
        :key="tag.id"
        :name="tag.name"
        class="mr-2"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    post: Object,
  },
  methods: {
    dateToString(date, format = 'MM-DD') {
      return dayjs(date).format(format)
    },
  },
}
</script>

<style></style>
