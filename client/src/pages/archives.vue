<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div class="a-fadeIn-bottom" style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <v-timeline class="w-content a-fadeIn-top" :nodes="timelineNodes">
      <template #default="{ node }">
        <div
          class="cursor-pointer my-1"
          @click="$router.push(`/post?id=${node.id}`)"
        >
          <archive-item :post="node" class="p-3" />
        </div>
      </template>
    </v-timeline>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async asyncData({ store }) {
    await store.dispatch('fetchArchives')
  },
  computed: {
    ...mapState(['user', 'menus', 'archives']),
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
}
</script>

<style scoped></style>
