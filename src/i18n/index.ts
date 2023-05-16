import type { Language } from '@/types/locale'
import { createI18n } from 'vue-i18n'
import store from '@/store'
import { setLang } from '@/composables/useLang'

const LangModules = ['data', 'common', 'config', 'admin', 'error', 'ekuiper', 'plugin', 'schema', 'template']

type LangModel = {
  [key in Language]: $TSFixed
}

const lang: LangModel = {
  en: {},
  zh: {},
}

const { initLang } = setLang()

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
  legacy: false, // Composition API mode
  globalInjection: true, // global
  locale: store.state.lang,
  fallbackLocale: 'zh',
  messages,
})

initLang()

export default i18n
