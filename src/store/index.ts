import { Status, ObjdData } from '@/types/neuron'
import { createStore } from 'vuex'

interface State {
  status: Status | null
  objd: Array<ObjdData>
}

export default createStore<State>({
  state() {
    return {
      status: null,
      objd: [],
    }
  },
  mutations: {
    SET_STATUS(state: State, payload: Status) {
      state.status = payload
    },
    SET_OBJD(state: State, payload: ObjdData[]) {
      state.objd = payload
    },
  },
})
