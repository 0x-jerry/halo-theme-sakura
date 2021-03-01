import path from 'path'
import { promises as fs } from 'fs'
import { Plugin } from 'vite'

const virtualModuleId = 'vite-i18n-plugin'

const hotUpdateId = 'i18n-hmr-message'

export function I18nPlugin(i18nDir: string): Plugin {
  return {
    name: 'vite-i18n-plugin',
    resolveId(source) {
      if (source === virtualModuleId) {
        return source
      }
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.startsWith(i18nDir)) {
        return
      }
      const data = await getMessage(ctx.file)

      ctx.server.ws.send({
        type: 'custom',
        event: hotUpdateId,
        data
      })
    },
    async load(id) {
      if (id !== virtualModuleId) {
        return null
      }

      const code = await generateCode(i18nDir)

      return {
        code
      }
    }
  }
}

async function generateCode(dir: string) {
  const langs = await getMessages(dir)

  const src = `
      import { createI18n } from 'vue-i18n'

      export const messages = ${JSON.stringify(langs)}

      export const i18n = createI18n({
        legacy: false,
        locale: 'en',
        fallbackLocale: 'en',
        messages
      })


      if (import.meta.hot) {
        import.meta.hot.on("${hotUpdateId}", ({ lang, message }) => {
          i18n.global.setLocaleMessage(lang, message);
        });
      }
      `

  return src
}

async function getMessage(file: string) {
  const p = path.parse(file)

  const lang = p.name

  const langSrc = await fs.readFile(file, { encoding: 'utf-8' })

  const msg = JSON.parse(langSrc)

  return {
    lang,
    message: msg
  }
}

async function getMessages(dir: string) {
  const files = await fs.readdir(dir)

  const langs: Record<string, any> = {}

  for (const jsonName of files) {
    const { lang, message } = await getMessage(path.join(dir, jsonName))

    langs[lang] = message
  }

  return langs
}
