const debug = process.env.NODE_ENV !== 'production'

export const devConfig = {
  buildDir: '.nuxt-dev',
}

type Config = typeof devConfig

export const prodConfig: Config = {
  buildDir: '.nuxt',
}

const getConfig = <K extends keyof Config>(k: K): Config[K] =>
  debug ? devConfig[k] : prodConfig[k]

export default {
  telemetry: false,
  srcDir: 'client',
  buildDir: getConfig('buildDir'),
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Halo Theme Sakura',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
        crossorigin: 'anonymous',
        integrity:
          'sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC',
        crossorigin: 'anonymous',
        onload: "this.media='all'",
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css',
        crossorigin: 'anonymous',
        integrity:
          'sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==',
      },
      {
        rel: 'stylesheet',
        // iconfont
        href: 'https://at.alicdn.com/t/font_2010950_uq2c7ykeiyk.css',
        crossorigin: 'anonymous',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://i18n.nuxtjs.org
    'nuxt-i18n',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // https://i18n.nuxtjs.org/options-reference
  i18n: {
    locales: [
      {
        code: 'zh',
        file: 'zh-CN.json',
      },
      {
        code: 'en',
        file: 'en.json',
      },
    ],
    vueI18nLoader: true,
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'zh',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  loading: {
    color: '#63b3ed',
    height: '0.25rem',
  },
}
