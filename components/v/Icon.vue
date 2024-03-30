<script lang="ts" setup>
defineProps<{ name: string }>();
</script>

<template>
  <i :class="['icon', name]"></i>
</template>

<style lang="less" scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>
