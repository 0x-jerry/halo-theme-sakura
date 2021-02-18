<template>
  <div class="markdown-content markdown-body" v-html="html"></div>
</template>

<script>
export default {
  props: ['content'],
  computed: {
    html() {
      return this.content
    },
  },
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
