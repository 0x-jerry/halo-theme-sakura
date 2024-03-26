<script lang="ts" setup></script>

<template>
  <div>
    <div
      class="flex px-4 py-2 gap-2 border-b border-solid border-gray dark:border-gray-700"
    >
      <div class="flex items-center flex-1">
        <h3 class="font-bold text-xl">Sakura</h3>
      </div>
      <div class="flex items-center">
        <ThemeSwitcher />
      </div>
    </div>
    <div class="p-4">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
