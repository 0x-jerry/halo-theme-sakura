<script lang="ts" setup>
import type { RouteLocationRaw } from "vue-router";

export interface LinkProps {
  icon?: string;
  to?: RouteLocationRaw;
}

defineProps<LinkProps>();
</script>

<template>
  <NuxtLink
    :to="to"
    flex="inline items-center gap-1"
    class="text-b-gray-8 decoration-none hover:underline hover:text-b-primary transition"
  >
    <VIcon v-if="icon" :name="icon" />
    <slot></slot>
  </NuxtLink>
</template>

<style lang="less" scoped></style>
