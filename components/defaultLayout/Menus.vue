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
    flex="~ justify-center items-center gap-4"
    text="xl"
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
    @apply text-b-primary font-bold;
  }
}
</style>
