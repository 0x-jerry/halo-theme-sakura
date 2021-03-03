import { createApp } from './main'

// @ts-ignore
const initialState = window.__INITIAL_STATE__

createApp(initialState).then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app')
  })
})
