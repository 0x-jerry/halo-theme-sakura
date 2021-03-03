<template>
  <span class="tag text-gray-400" @click.stop="clickTag">
    <v-link>
      <v-icon name="tags" />
      <span>{{ tag.name }}</span>
    </v-link>
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { TagDTO } from '../api'

export default defineComponent({
  props: {
    tag: {
      required: true,
      type: Object as PropType<TagDTO>
    }
  },
  setup(props) {
    const router = useRouter()

    return {
      clickTag() {
        router.push(`/tags/${props.tag.slug}`)
      }
    }
  }
})
</script>

<style></style>
