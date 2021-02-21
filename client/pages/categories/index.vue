<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <div class="w-content text-center py-5">
      <tag-cloud :tags="categories" class="inline-block">
        <template #default="{ tag }">
          <span @click="gotoCategory(tag)">
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
import { categoriesGet } from '../../api'

export default Vue.extend({
  async asyncData() {
    const [categories] = await Promise.all([categoriesGet({})])

    return {
      categories,
    }
  },
  computed: {
    ...mapState(['user', 'menus']),
  },
  methods: {
    gotoCategory(category) {
      this.$router.push(`/categories/${category.slug}`)
    },
  },
})
</script>

<style scoped>
.posts {
  max-width: 880px;
}
</style>
