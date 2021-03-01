<template>
  <i
    class="iconfont"
    :class="`icon-${name}`"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
</script>

<style></style>
