<script lang="ts" setup>
import type { Menu } from "./types";

export interface DefaultLayoutHeaderProps {
  menus: Menu[];
}

const props = defineProps<DefaultLayoutHeaderProps>();

const { y: scrollY } = useWindowScroll();

const isSticky = computed(() => scrollY.value > 1);
</script>

<template>
  <header class="site-header" :class="{ 'is-sticky': isSticky }">
    <div class="w-full md:w-60">
      <slot class="prefix"></slot>
    </div>
    <DefaultLayoutMenus :menus="menus" />
    <div class="flex w-full md:justify-end md:w-60">
      <slot class="suffix"></slot>
    </div>
  </header>
</template>

<style lang="less" scoped>
.site-header {
  @apply fixed top-0 left-0 z-40;
  @apply bg-white bg-opacity-95;
  @apply opacity-0;
  @apply flex flex-row items-center;
  @apply py-5;

  @apply w-full h-16;

  @apply transition duration-500;

  &:hover {
    @apply opacity-100;
  }

  &.is-sticky {
    @apply flex bg-opacity-90;
    @apply md:shadow-xl;
    @apply opacity-100;
  }
}

.site-logo {
  @apply w-10 h-10 inline-block;
}

.site-avatar {
  @apply w-8 h-8 inline-block rounded-full overflow-hidden;
}

.menu-item {
  @apply p-2;
}
</style>
