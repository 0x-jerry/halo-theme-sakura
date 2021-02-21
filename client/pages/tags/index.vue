<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <div class="w-content text-center py-5">
      <tag-cloud :tags="tags" class="inline-block">
        <template #default="{ tag }">
          <span @click="gotoTag(tag)">
            {{ tag.name }}
          </span>
        </template>
      </tag-cloud>
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
</style>
