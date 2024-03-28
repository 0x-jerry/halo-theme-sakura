<script lang="ts" setup>
import type { Menu } from "./types";

export interface DefaultLayoutMenusProps {
  menus: Menu[];
}

const props = defineProps<DefaultLayoutMenusProps>();

const isActive = (menu: Menu) => false;
</script>

<template>
  <div
    class="flex-1 flex flex-col md:flex-row md:justify-center text-gray-500 a-fadeIn-right"
  >
    <ULink
      v-for="o in menus"
      class="menu-item"
      :class="{ active: isActive(o) }"
      :to="o.url"
    >
      <UIcon :name="o.icon" />
      {{ o.name }}
    </ULink>
  </div>
</template>

<style lang="less" scoped></style>
