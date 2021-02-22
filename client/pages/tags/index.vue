<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <div class="w-content text-center" style="min-height: 400px">
      <div class="title text-center my-10 text-3xl">
        <v-icon name="tags" class="text-3xl" />
        标签
      </div>

      <!-- <tag-cloud :tags="tags" class="inline-block">
        <template #default="{ tag }">
          <span @click="gotoTag(tag)">
            {{ tag.name }}
          </span>
        </template>
      </tag-cloud> -->

      <div class="flex flex-wrap justify-center">
        <span
          v-for="o in tagsSize"
          :key="o.id"
          class="tag-item"
          :style="`opacity: ${o.percent}; font-size: ${o.percent}em`"
          @click="gotoTag(o.tag)"
        >
          {{ o.tag.name }} ({{ o.tag.postCount }})
        </span>
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['user', 'menus', 'tags']),
    tagsSize() {
      const maxCount = this.tags.reduce(
        (max, cur) => Math.max(max, cur.postCount),
        -1
      )

      const range = 0.3

      return this.tags.map((tag) => ({
        tag,
        percent: (tag.postCount / maxCount) * range + (1 - range),
      }))
    },
  },
  methods: {
    gotoTag(tag) {
      this.$router.push(`/tags/${tag.slug}`)
    },
  },
})
</script>

<style scoped>
.posts {
  max-width: 880px;
}

.tag-item {
  @apply inline-block m-3 p-3 hover:text-blue-500 cursor-pointer shadow;
}
</style>
