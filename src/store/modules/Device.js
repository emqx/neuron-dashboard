export default {
  state: {
    deviceList: []
  },
  mutations: {
    setDeviceList (state, data) {
      state.deviceList = data.map(i => {
        let type = i.type
        type = type === 'tty' ? 'Serial drivers' : type
        type = type === 'tcp' ? 'Ethernet drivers' : type
        return {
          label: i.desc,
          val: i.name,
          type
        }
      })
    }
  },
  getters: {
    deviceObj: (state, getters) => {
      return state.deviceList.find(i => i.val === getters.res.chdv) || {}
    }
  }
}
