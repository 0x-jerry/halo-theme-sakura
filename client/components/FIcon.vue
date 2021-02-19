<template>
  <i :class="[classes, `fa-${name}`]"></i>
</template>

<script>
export default {
  props: ['name', 'fas', 'fad', 'far', 'fab', 'fa'],
  computed: {
    classes() {
      return (
        ['fas', 'fad', 'far', 'fab']
          .filter((c) => this[c] !== undefined)
          .join(' ') || 'fa'
      )
    },
  },
}
</script>

<style></style>
