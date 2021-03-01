declare module 'vite-ssr/plugin' {
  import { Plugin } from 'vite'

  const plugin: () => Plugin
  export default plugin
}
