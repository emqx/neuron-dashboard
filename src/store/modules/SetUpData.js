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
      state.eventData = msgd
      const localObjectData = localStorage.getItem('objectData')
      // const filterData = localObjectData.filter((obj) => {
      //   return !objd.some((obj2) => {
      //     return obj.objn === obj2.objn
      //   })
      // })
      // state.objectData = [...objd, ...filterData]
      if (localObjectData) {
        state.objectData = JSON.parse(localObjectData)
      } else {
        state.objectData = objd
      }
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
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    }
  }
}
