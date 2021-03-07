<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div class="a-fadeIn-bottom" style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <v-timeline class="w-content a-fadeIn-top px-8" :nodes="timelineNodes">
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

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useUniversalFetch } from '../hooks'
import { useStore } from '../store'

export default defineComponent({
  async beforeRouteEnter(to, _, next) {
    await useUniversalFetch(to, (store) => store.dispatch('fetchArchives'))

    next()
  },
  setup() {
    const { state } = useStore()

    const archives = computed(() => state.archives)

    return {
      archives,
      user: computed(() => state.user),
      menus: computed(() => state.menus),
      timelineNodes: computed(() => {
        const nodes = (archives.value || []).map((node) => {
          return {
            title: `${node.year}-${node.month}`,
            nodes: node.posts
          }
        })

        return nodes
      })
    }
  }
})
</script>

<style scoped></style>
