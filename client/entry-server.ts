import { createApp } from './main'
import { renderToString } from '@vue/server-renderer'

interface SSRManifest {
  [module: string]: string[]
}

interface RenderedContext {
  modules: string[]
}

export async function render(
  url: string,
  manifest: SSRManifest,
  ssrContext: any
) {
  const initialState = {
    isInstalled: ssrContext.isInstalled
  }

  const { app, router } = await createApp(initialState)

  // set the router to the desired URL before rendering
  router.push(url)
  await router.isReady()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx: RenderedContext = {} as any

  const html = await renderToString(app, ctx)

  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  // merge router state
  Object.assign(initialState, router.currentRoute.value.meta.state)

  return {
    html,
    preloadLinks,
    initialState
  }
}

function renderPreloadLinks(modules: string[], manifest: SSRManifest) {
  let links = ''
  const seen = new Set<string>()
  modules.forEach((id: string) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    console.log('unhandled file', file)
    // TODO
    return ''
  }
}