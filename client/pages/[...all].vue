<template>
  <div class="text-center p-20 mt-20">
    <h1 class="p-20 text-3xl">404</h1>
    <router-link to="/">{{ $t('home') }}</router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
