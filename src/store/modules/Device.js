const setDriverList = (data) => {
  return data.map((i) => {
    let { type, attr } = i
    type = type === 'tty' ? 'Serial drivers' : type
    type = type === 'tcp' ? 'Ethernet drivers' : type
    return {
      label: i.desc,
      val: i.name,
      type,
      attr,
    }
  })
}

export default {
  state: {
    southDriverList: [],
    northDriverList: [],
  },
  mutations: {
    setSouthDriverList(state, data) {
      state.southDriverList = setDriverList(data)
    },
    setNorthDriverList(state, data) {
      state.northDriverList = setDriverList(data)
    },
  },
  getters: {
    deviceObj: (state, getters) => {
      return state.southDriverList.find((i) => i.val === getters.res.chdv) || {}
    },
  },
}
