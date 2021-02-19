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
  font-family: 'Merriweather Sans', Helvetica, Tahoma, Arial, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif;

  scroll-behavior: smooth;
  /* font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; */
}
</style>
