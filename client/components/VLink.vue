<template>
  <a
    :href="href"
    :target="open ? '_blank' : ''"
    class="v-link hover:text-blue-500 cursor-pointer transition-colors"
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
  },
  emits: ['click']
})
</script>

<style>
.v-link.active {
  @apply text-blue-500;
}
</style>
