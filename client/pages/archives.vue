<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <v-timeline class="w-content" :nodes="timelineNodes">
      <template #default="{ node }">
        <div
          class="bg-gray-100 p-3 cursor-pointer my-3"
          @click="goToPost(node)"
        >
          <div class="flex items-center">
            <span class="title text-lg">
              {{ node.title }}
            </span>
            <div class="flex flex-1 justify-end items-center">
              <f-icon far class="mx-2" name="clock" />
              <span class="mx-2">
                {{ dateToString(node.createTime) }}
              </span>
              <v-icon class="mx-2" name="attention" />
              <span class="mx-2">
                {{ node.visits }}
              </span>
              <v-icon class="mx-2" name="mark" />
              <span class="mx-2">
                {{ node.commentCount }}
              </span>
            </div>
          </div>
          <div class="p-1"></div>
          <div class="tags flex justify-end">
            <v-tag
              v-for="tag in node.tags"
              :key="tag.id"
              :name="tag.name"
              class="mr-2"
            />
          </div>
        </div>
      </template>
    </v-timeline>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Vue from 'vue'
import { mapState } from 'vuex'
import { archivesMonthsGet } from '../api'

export default Vue.extend({
  async asyncData() {
    const [archives] = await Promise.all([archivesMonthsGet()])

    return {
      archives,
    }
  },
  computed: {
    ...mapState(['user', 'menus']),
    timelineNodes() {
      const nodes = this.archives.map((node) => {
        return {
          title: `${node.year}-${node.month}`,
          nodes: node.posts,
        }
      })

      return nodes
    },
  },
  methods: {
    goToPost(node) {
      this.$router.push('/post/' + node.id)
    },
    dateToString(date, format = 'MM-DD') {
      return dayjs(date).format(format)
    },
  },
})
</script>

<style scoped></style>
