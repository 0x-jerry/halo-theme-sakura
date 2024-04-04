<script lang="ts" setup></script>

<template>
  <button class="v-btn"><slot /></button>
</template>

<style lang="less">
.v-btn {
  @apply text-white;
  @apply py-2 px-4;

  @apply bg-transparent;
  @apply bg-bPrimary-5;

  @apply rounded;


  border: none;
  outline: none;
  height: auto;
  cursor: pointer;

  @apply transition;

  &:hover {
    @apply bg-bPrimary-4;
  }

  &:active {
    @apply bg-bPrimary-5;
  }
}
</style>
