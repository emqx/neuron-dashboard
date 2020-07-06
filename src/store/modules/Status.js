import { clone } from '../../utils'

export default {
  state: {
    status: {},
    alarmList: [],
    writableList: []
  },
  mutations: {
    setAlarmStatus (state, data) {
      state.status = data
    },
    setAlarmList (state, data) {
      const _alarmList = clone(state.alarmList)
      if (!_alarmList.length) {
        state.alarmList.push(...data)
      } else {
        data.forEach((item) => {
          const found = _alarmList.some(el => el.objn === item.objn)
          if (!found) {
            // 没有该数据就 push
            state.alarmList.push(item)
          } else {
            // 有则替换数据
            state.alarmList = _alarmList.map(prev => data.find(next => prev.objn === next.objn) || prev)
          }
        })
      }
    },
    setWritableList (state, writableList) {
      state.writableList = writableList
    }
  }
}
