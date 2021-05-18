import { Status, ObjdModel, ChnlModel } from '@/types/neuron'
import { createStore } from 'vuex'

interface State {
  status: Status | null
  objd: Array<ObjdModel>
  chnl: Array<ChnlModel>
}

export default createStore<State>({
  state() {
    return {
      status: null,
      objd: [],
      chnl: [],
    }
  },
  mutations: {
    SET_STATUS(state: State, payload: Status) {
      state.status = payload
    },
    SET_OBJD(state: State, payload: ObjdModel[]) {
      state.objd = payload
    },
    SET_DRIVER_DATA(state: State, payload: ChnlModel[]) {
      state.chnl = payload
    },
  },
  getters: {
    deviceObj: (state) => {
      const { chnl } = state
      if (chnl.length && chnl[0]) {
        return state.chnl[0].chdv
      }
      return ''
    },
  },
})
