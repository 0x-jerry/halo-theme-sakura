<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <v-timeline class="w-content" :nodes="timelineNodes">
      <template #default="{ node }">
        <div class="p-3 cursor-pointer my-3" @click="goToPost(node)">
          <archive-item :post="node" />
        </div>
      </template>
    </v-timeline>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
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
  },
})
</script>

<style scoped></style>
