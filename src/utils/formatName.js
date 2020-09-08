import lang from '@/i18n'
import store from '@/store'

export const formatName = (str) => {
  const local = store.state.base.lang
  const VueI18n = lang[local]
  return VueI18n.menu[str]
}
