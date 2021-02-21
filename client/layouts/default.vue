<template>
  <div>
    <scroll-progress />
    <Nuxt />
    <scroll-to-top />
  </div>
</template>

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

.w-content {
  max-width: 800px;
  margin: auto;
}
</style>
