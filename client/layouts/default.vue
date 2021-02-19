<template>
  <div>
    <scroll-progress />
    <Nuxt />
  </div>
</template>

<script>
import { globalConfigs } from '../configs'
import { initConfig } from '../api/contentApi'

initConfig({
  target: globalConfigs.isDev
    ? 'http://localhost:9555'
    : 'http://localhost:9556',
})

export default {}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; */
}
</style>
