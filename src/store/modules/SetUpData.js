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

const getChnl = () => {
  return JSON.parse(localStorage.getItem('chnl')) || []
}
const getChdv = () => {
  const chnl = JSON.parse(localStorage.getItem('chnl'))
  return chnl ? chnl[0].chdv : ''
}
const getObjectData = () => {
  return JSON.parse(localStorage.getItem('objectData')) || []
}
const getEventData = () => {
  return JSON.parse(localStorage.getItem('eventData')) || []
}

export default {
  state: {
    driverData: {
      chdv: getChdv(),
      chnl: getChnl(),
    },
    objectData: getObjectData(),
    eventData: getEventData(),
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
      const localChnl = localStorage.getItem('chnl')
      const localEventData = localStorage.getItem('eventData')
      const localObjectData = localStorage.getItem('objectData')
      state.driverData.chdv = localChnl ? JSON.parse(localChnl)[0].chdv : chnl[0].chdv
      state.driverData.chnl = localChnl ? JSON.parse(localChnl) : chnl
      state.objectData = localObjectData ? JSON.parse(localObjectData) : constructObjd(objd)
      state.eventData = localEventData ? JSON.parse(localEventData) : msgd
      // const filterData = localObjectData.filter((obj) => {
      //   return !objd.some((obj2) => {
      //     return obj.objn === obj2.objn
      //   })
      // })
      // state.objectData = [...objd, ...filterData]
    },
    clearAllData(state) {
      state.driverData.chdv = ''
      state.driverData.chnl = []
      state.objectData = []
      state.eventData = []
      localStorage.removeItem('chnl')
      localStorage.removeItem('eventData')
      localStorage.removeItem('objectData')
    },
    setDriverData(state, { chdv, chnl }) {
      state.driverData.chdv = chdv
      state.driverData.chnl = chnl
      localStorage.setItem('chnl', JSON.stringify(chnl))
    },
    setObjectData(state, objectData) {
      state.objectData = [...state.objectData, ...objectData]
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    addObjectData(state, objectData) {
      state.objectData.push(objectData)
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    editObjectData(state, objectData) {
      const findIndex = state.objectData.findIndex((obj) => obj.objn === objectData.objn)
      if (findIndex !== -1) {
        const stateData = [...state.objectData]
        stateData[findIndex] = { ...objectData }
        state.objectData = stateData
      }
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    deleteObjectData(state, objNameList) {
      state.objectData = state.objectData.filter((i) => !objNameList.includes(i.objn))
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    setObjectAttribute(state, { name, attributeList }) {
      state.objectData = state.objectData.map((i) => {
        if (i.objn === name) {
          i.oatt = attributeList
        }
        return i
      })
      localStorage.setItem('objectData', JSON.stringify(state.objectData))
    },
    addEventData(state, eventData) {
      state.eventData.push(eventData)
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    },
    editEventData(state, eventData) {
      const { data, index } = eventData
      state.eventData.splice(index, 1, data)
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    },
    deleteEventData(state, eventDataList) {
      state.eventData = state.eventData.filter((i) => !eventDataList.includes(i))
      localStorage.setItem('eventData', JSON.stringify(state.eventData))
    },
  },
}
