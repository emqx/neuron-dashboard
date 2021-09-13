const constructObjd = data => {
  const res = data.map(item => {
    if (item.oatt && item.oatt.length) {
      item.preAndSuff = item.oatt[0].aadd.map(presuff => {
        const { addr, ...rest } = presuff
        return { ...rest }
      })
    }
    return item
  })
  return res
}

export default {
  state: {
    driverData: {
      chdv: '',
      chnl: [],
    },
    objectData: [],
    eventData: [],
  },
  getters: {
    res(state) {
      return {
        chdv: state.driverData.chdv,
        chnl: state.driverData.chnl,
        objd: state.objectData,
        msgd: state.eventData,
      }
    },
  },
  mutations: {
    setAllData(state, { chnl, msgd, objd }) {
      state.driverData.chdv = chnl[0].chdv
      state.driverData.chnl = chnl
      state.objectData = constructObjd(objd)
      state.eventData = msgd
    },
    clearAllData(state) {
      state.driverData.chdv = ''
      state.driverData.chnl = []
      state.objectData = []
      state.eventData = []
    },
    setDriverData(state, { chdv, chnl }) {
      state.driverData.chdv = chdv
      state.driverData.chnl = chnl
    },
    setObjectData(state, objectData) {
      state.objectData = [...state.objectData, ...objectData]
    },
    addObjectData(state, objectData) {
      state.objectData.push(objectData)
    },
    editObjectData(state, objectData) {
      const findIndex = state.objectData.findIndex(obj => obj.objn === objectData.objn)
      if (findIndex !== -1) {
        const stateData = [...state.objectData]
        stateData[findIndex] = { ...objectData }
        state.objectData = stateData
      }
    },
    deleteObjectData(state, objNameList) {
      state.objectData = state.objectData.filter(i => !objNameList.includes(i.objn))
    },
    setObjectAttribute(state, { name, attributeList }) {
      state.objectData = state.objectData.map(i => {
        if (i.objn === name) {
          i.oatt = attributeList
        }
        return i
      })
    },
    addEventData(state, eventData) {
      state.eventData.push(eventData)
    },
    editEventData(state, eventData) {
      const { data, index } = eventData
      state.eventData.splice(index, 1, data)
    },
    deleteEventData(state, eventDataList) {
      state.eventData = state.eventData.filter(i => !eventDataList.includes(i))
    },
  },
}
