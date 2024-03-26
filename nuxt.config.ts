// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    "@formkit/auto-animate/nuxt",
  ],
  devtools: { enabled: true },
  routeRules: {
    // proxy halo request
    // api
    "/api/**": { proxy: "http://localhost:8090/api/**" },
    "/apis/**": { proxy: "http://localhost:8090/apis/**" },
    "/login/**": { proxy: "http://localhost:8090/login/**" },
    "/actuator/**": { proxy: "http://localhost:8090/actuator/**" },
    // static pages
    "/uc/**": { proxy: "http://localhost:8090/uc/**" },
    "/console/**": { proxy: "http://localhost:8090/console/**" },
  },
});
