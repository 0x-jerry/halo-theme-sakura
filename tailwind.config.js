const themeSwapper = require('tailwindcss-theme-swapper')
const colors = require('tailwindcss/colors')

const themeSwapperConfig = {
  themes: [
    // The only required theme is `base`. Every property used in
    // other themes must exist in here.
    {
      name: 'base',
      selectors: [':root'],
      theme: {
        colors: {
          primary: colors.blue || 'blue',
        },
      },
    },
  ],
}

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: ['client/**/*'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [themeSwapper(themeSwapperConfig)],
}
