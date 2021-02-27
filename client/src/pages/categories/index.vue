<template>
  <div class="halo-theme sakura">
    <site-header :user="user" :menus="menus" />

    <div class="a-fadeIn-bottom" style="height: 400px">
      <random-image :random-id="$route.path" />
    </div>

    <div class="w-content text-center a-fadeIn-top" style="min-height: 400px">
      <div class="title text-center my-10 text-3xl">
        <v-icon name="file" class="text-3xl" />
        分类
      </div>

      <div class="flex flex-wrap justify-center">
        <span
          v-for="o in categoriesSize"
          :key="o.id"
          class="category-item"
          :style="`opacity: ${o.percent}; font-size: ${o.percent}em`"
          @click="gotoCategory(o.category)"
        >
          {{ o.category.name }} ({{ o.category.postCount }})
        </span>
      </div>
    </div>

    <site-footer class="mt-10" :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'menus', 'categories']),
    categoriesSize() {
      const maxCount = this.categories.reduce(
        (max, cur) => Math.max(max, cur.postCount),
        -1
      )

      const range = 0.3

      return this.categories.map((category) => ({
        category,
        percent: (category.postCount / maxCount) * range + (1 - range),
      }))
    },
  },
  methods: {
    gotoCategory(category) {
      this.$router.push(`/categories/${category.slug}`)
    },
  },
}
</script>

<style scoped>
.posts {
  max-width: 880px;
}

.category-item {
  @apply inline-block m-3 p-3 hover:text-blue-500 cursor-pointer shadow;
}
</style>
