<script setup>
import '@unocss/reset/normalize.css'
import 'animate.css';
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import './assets/global.less';
html,body {
  @apply text-b-gray-8 font-sans;
}
</style>