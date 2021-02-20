<template>
  <span class="tag text-gray-400" @click="(e) => $emit('click', e)">
    <v-link>
      <v-icon name="tags" />
      <span>{{ name }}</span>
    </v-link>
  </span>
</template>

<script>
export default {
  props: {
    name: String,
  },
}
</script>

<style></style>
