import { createI18n } from 'vue-i18n'
import locale from 'element-plus/lib/locale'
import zhLang from 'element-plus/lib/locale/lang/zh-cn'
import enLang from 'element-plus/lib/locale/lang/en'
import { Language } from '@/types/locale'
import store from '@/store'

const LangModules = ['data', 'common', 'config', 'admin', 'error', 'ekuiper']

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
  locale: store.state.lang,
  fallbackLocale: 'zh',
  messages,
})

if (store.state.lang === 'zh') {
  locale.use(zhLang)
} else {
  locale.use(enLang)
}

export default i18n
