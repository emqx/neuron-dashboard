import { Status } from '@/types/neuron'
import { createStore } from 'vuex'

interface State {
  status: Status | null
}

export default createStore<State>({
  state() {
    return {
      status: null,
    }
  },
  mutations: {
    SET_STATUS(state: State, payload: Status) {
      state.status = payload
    },
  },
})
