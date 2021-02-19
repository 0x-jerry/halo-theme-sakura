<template>
  <div class="tag text-gray-400">
    <v-link>
      <v-icon name="tags" />
      <span>{{ name }}</span>
    </v-link>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
}
</script>

<style></style>
