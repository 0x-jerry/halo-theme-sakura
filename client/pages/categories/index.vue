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
          :key="o.category.id"
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

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { CategoryDTOMore } from '~/api'
import { useStore } from '~/store'

export default defineComponent({
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const menus = computed(() => store.state.menus)
    const categories = store.state.categories

    const categoriesSize = computed(() => {
      const maxCount = categories.reduce(
        (max, cur) => Math.max(max, cur.postCount),
        -1
      )

      const range = 0.3

      return categories.map((category) => ({
        category,
        percent: (category.postCount / maxCount) * range + (1 - range)
      }))
    })

    const router = useRouter()

    return {
      user,
      menus,
      categoriesSize,
      gotoCategory(category: CategoryDTOMore) {
        router.push(`/categories/${category.slug}`)
      }
    }
  },
  methods: {}
})
</script>

<style scoped>
.posts {
  max-width: 880px;
}

.category-item {
  @apply inline-block m-3 p-3 hover:text-blue-500 cursor-pointer shadow;
}
</style>
