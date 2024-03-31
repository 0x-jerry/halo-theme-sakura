<script lang="ts" setup>
import type { Menu } from "./types";

export interface DefaultLayoutMenusProps {
  menus: Menu[];
}

const props = defineProps<DefaultLayoutMenusProps>();

const route = useRoute();

const isActive = (menu: Menu) => route.path === menu.url;
</script>

<template>
  <div
    class="flex-1 flex flex-col md:flex-row md:justify-center text-gray-500 a-fadeIn-right"
  >
    <VLink
      class="menu-item"
      v-for="o in menus"
      :class="{ active: isActive(o) }"
      :to="o.url"
      :icon="o.icon"
    >
      {{ o.name }}
    </VLink>
  </div>
</template>

<style lang="less" scoped>
.menu-item {
  &.active {
    @apply text-b-primary;
  }
}
</style>
