<template>
  <span class="tag text-gray-400" @click.stop="clickTag">
    <v-link>
      <v-icon name="file" />
      <span>{{ category.name }}</span>
    </v-link>
  </span>
</template>

<script>
export default {
  props: {
    category: Object,
  },
  methods: {
    clickTag() {
      this.$router.push(`/categories/${this.category.slug}`)
    },
  },
}
</script>

<style></style>
