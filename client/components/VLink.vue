<template>
  <a
    :href="href"
    :target="open ? '_blank' : ''"
    class="hover:text-blue-500 cursor-pointer transition-colors"
    @click="(e) => $emit('click', e)"
  >
    <slot>{{ content }}</slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    href: String,
    open: Boolean,
    content: String
  }
})
</script>

<style>
.active {
  @apply text-blue-500;
}
</style>
