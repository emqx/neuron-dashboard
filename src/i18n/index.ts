import { Language } from '@/types/locale'
import { createI18n } from 'vue-i18n'

const LangModules = ['data', 'logs', 'script', 'common', 'config', 'alarm', 'admin']

type LangModel = {
  [key in Language]: $TSFixed
}

const lang: LangModel = {
  en: {},
  zh: {},
}

LangModules.forEach((module) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const langModule = require(`./${module}`).default
  Object.keys(langModule).forEach((k) => {
    const { en, zh } = langModule[k]
    lang.en[module] = lang.en[module] || {}
    lang.zh[module] = lang.zh[module] || {}
    lang.en[module][k] = en
    lang.zh[module][k] = zh
  })
})

const messages = {
  en: lang.en,
  zh: lang.zh,
}

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages,
})

export default i18n
