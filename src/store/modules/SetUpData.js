const constructObjd = (data) => {
  const res = data.map((item) => {
    if (item.oatt && item.oatt.length) {
      item.preAndSuff = item.oatt[0].aadd.map((presuff) => {
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
      const localEventData = localStorage.getItem('eventData')
      const localObjectData = localStorage.getItem('objectData')
      state.objectData = localObjectData ? JSON.parse(localObjectData) : constructObjd(objd)
      state.eventData = localEventData ? JSON.parse(localEventData) : msgd
      // const filterData = localObjectData.filter((obj) => {
      //   return !objd.some((obj2) => {
      //     return obj.objn === obj2.objn
      //   })
      // })
      // state.objectData = [...objd, ...filterData]
    },
    setDriverData (state, {
      chdv,
      chnl
    }) {
      state.driverData.chdv = chdv
      state.driverData.chnl = chnl
    },
    setObjectData (state, objectData) {
      state.objectData = [...state.objectData, ...objectData]
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    addObjectData (state, objectData) {
      state.objectData.push(objectData)
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    editObjectData (state, objectData) {
      const findIndex = state.objectData.findIndex((obj) => obj.objn === objectData.objn)
      if (findIndex !== -1) {
        const stateData = [...state.objectData]
        stateData[findIndex] = { ...objectData }
        state.objectData = stateData
      }
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    deleteObjectData (state, objNameList) {
      state.objectData = state.objectData.filter(i => !objNameList.includes(i.objn))
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
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
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    addEventData (state, eventData) {
      state.eventData.push(eventData)
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    },
    editEventData (state, eventData) {
      const { data, index } = eventData
      state.eventData.splice(index, 1, data)
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    },
    deleteEventData (state, eventDataList) {
      state.eventData = state.eventData.filter(i => !eventDataList.includes(i))
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    }
  }
}
