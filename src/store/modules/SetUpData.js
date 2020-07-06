export default {
  state: {
    driverData: {
      chdv: '',
      chnl: [{
        'tcph': '',
        'tcpp': 0,
        'ttyc': '',
        'ttyb': 0,
        'ttyd': 0,
        'ttys': '',
        'ttyp': ''
      }]
    },
    objectData: [],
    eventData: []
  },
  getters: {
    res (state) {
      return {
        chdv: state.driverData.chdv,
        chnl: state.driverData.chnl,
        objd: state.objectData,
        msgd: state.eventData
      }
    }
  },
  mutations: {
    setAllData (state, {
      chnl,
      msgd,
      objd,
      chdv
    }) {
      state.driverData.chdv = chdv || ''
      state.driverData.chnl = chnl
      state.objectData = objd
      state.eventData = msgd
    },
    setDriverData (state, {
      chdv,
      chnl
    }) {
      state.driverData.chdv = chdv
      state.driverData.chnl = chnl
    },
    addObjectData (state, objectData) {
      state.objectData.push(objectData)
    },
    deleteObjectData (state, objNameList) {
      state.objectData = state.objectData.filter(i => !objNameList.includes(i.objn))
    },
    addEventData (state, eventData) {
      state.eventData.push(eventData)
    },
    deleteEventData (state, eventDataList) {
      state.eventData = state.eventData.filter(i => !eventDataList.includes(i))
    },
    setObjectAttribute (state, {
      name,
      attributeList
    }) {
      state.objectData = state.objectData.map(i => {
        if (i.objn === name) {
          i.oatt = attributeList
        }
        return i
      })
    }
  }
}
