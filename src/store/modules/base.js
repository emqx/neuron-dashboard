const getDefaultLang = () => {
  return localStorage.getItem('lang') || 'en'
}

export default {
  state: {
    lang: getDefaultLang(),
  },
  mutations: {
    setLang(state, { lang }) {
      state.lang = lang
      localStorage.setItem('lang', lang)
    },
  },
}
