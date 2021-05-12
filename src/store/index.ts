import { Status, ObjdModel, DrvdModel } from '@/types/neuron'
import { createStore } from 'vuex'

interface State {
  status: Status | null
  objd: Array<ObjdModel>
  drvd: DrvdModel | null
}

export default createStore<State>({
  state() {
    return {
      status: null,
      objd: [],
      drvd: null,
    }
  },
  mutations: {
    SET_STATUS(state: State, payload: Status) {
      state.status = payload
    },
    SET_OBJD(state: State, payload: ObjdModel[]) {
      state.objd = payload
    },
    SET_DRIVER_DATA(state: State, payload: DrvdModel) {
      state.drvd = payload
    },
  },
})
