<script lang="ts" setup>
import type { Menu } from "~/components/defaultLayout/types";

//

const menus = computed(() => {
  const _m: Menu[] = [
    {
      name: "Home",
      url: "/",
      icon: "i-heroicons-home",
    },
    {
      name: "404",
      url: "/404",
      icon: "i-heroicons-exclamation-triangle",
    },
  ];

  return _m;
});
</script>

<template>
  <div>
    <DefaultLayoutHeader
      class="fixed z-[100] w-full dark:bg-gray-950 bg-white"
      :menus="menus"
    />
    <slot />
  </div>
</template>

<style lang="less" scoped></style>
