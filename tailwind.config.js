const { defineConfig } = require('vite-plugin-windicss')

module.exports = defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096'
        }
      }
    }
  }
})
