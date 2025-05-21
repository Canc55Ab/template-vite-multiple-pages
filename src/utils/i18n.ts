import { createI18n, type I18n } from 'vue-i18n'
import type { App } from 'vue'

import messages from '@intlify/unplugin-vue-i18n/messages'

const defaultLang: string = process.env.VITE_APP_DEFAULT_LANG || 'zh-CN'

const lang = (dfLang: string = defaultLang): string => {
  // 有一些新标准的地区划分，在这里做一下映射
  const maps: any = {
    'zh-CN': 'zh-CN',
    'zh-Hans': 'zh-CN',
    zh_HANS: 'zh-CN',
    cn: 'zh-CN',
    zh: 'zh-CN',
    ja: 'ja-JP',
  }
  console.log('lang:', maps[dfLang])

  return maps[dfLang] || dfLang
}

export default {
  install: (app: App) => {
    const i18n = createI18n({
      legacy: false,
      globalInjection: true,
      locale: lang(),
      messages,
      fallbackLocale: defaultLang,
      silentFallbackWarn: true,
    }) as I18n

    app.use(i18n)
    return app
  },
}
