// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt'
  ],
  devtools: { enabled: true }
})