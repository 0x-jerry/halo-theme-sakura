<template>
  <i :class="[klass, `fa-${name}`]"></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: ['name', 'fas', 'fad', 'far', 'fab', 'fa'],
  setup(props) {
    return {
      klass: computed(() => {
        const keys = ['fas', 'fad', 'far', 'fab'] as const

        return keys.filter((c) => props[c] !== undefined).join(' ') || 'fa'
      }),
    }
  },
})
</script>

<style></style>
