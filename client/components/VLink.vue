<template>
  <a
    :href="href"
    :target="open ? '_blank' : ''"
    class="hover:text-blue-500 cursor-pointer"
    @click="(e) => $emit('click', e)"
  >
    <slot>{{ content }}</slot>
  </a>
</template>

<script>
export default {
  props: {
    href: String,
    open: Boolean,
    content: String,
  },
}
</script>

<style></style>
