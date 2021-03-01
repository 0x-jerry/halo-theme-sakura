<template>
  <span
    class="tag text-gray-400"
    @click.stop="clickTag"
  >
    <v-link>
      <v-icon name="file" />
      <span>{{ category.name }}</span>
    </v-link>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { CategoryDTO } from '../api'

export default defineComponent({
  props: {
    category: {
      required: true,
      type: Object as PropType<CategoryDTO>
    }
  },
  setup(props) {
    const router = useRouter()

    return {
      clickTag() {
        router.push(`/categories/${props.category.slug}`)
      }
    }
  }
})
</script>

<style></style>
