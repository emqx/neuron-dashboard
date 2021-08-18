import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'

const lang = {
  en: {
    ...enLocale,
  },
  zh: {
    ...zhLocale,
  },
}

const modules = ['administration', 'common', 'configuration', 'status', 'menu']
modules.forEach((key) => {
  const value = require(`./${key}`).default
  Object.keys(value).forEach((k) => {
    const { en, zh } = value[k]
    lang.en[key] = lang.en[key] || {}
    lang.zh[key] = lang.zh[key] || {}
    lang.en[key][k] = en
    lang.zh[key][k] = zh
  })
})

export default lang
