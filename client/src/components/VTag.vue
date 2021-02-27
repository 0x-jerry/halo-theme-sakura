<template>
  <span class="tag text-gray-400" @click.stop="clickTag">
    <v-link>
      <v-icon name="tags" />
      <span>{{ tag.name }}</span>
    </v-link>
  </span>
</template>

<script>
export default {
  props: {
    tag: Object,
  },
  methods: {
    clickTag() {
      this.$router.push(`/tags/${this.tag.slug}`)
    },
  },
}
</script>

<style></style>
