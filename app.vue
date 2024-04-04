<script setup>
import '@unocss/reset/normalize.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import './assets/global.less';

html,body {
  @apply text-bGray-8 font-sans;
}
</style>