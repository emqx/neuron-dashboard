import useWebsocket from '@/plugins/ws/useWebsocket'
import { useStore } from 'vuex'
import useFunc from '@/composables/useFunc'
import { ObjdModel } from '@/types/neuron'

export default function useAPI(): {
  addObjectData: (data: Array<Omit<ObjdModel, 'func'>>) => void
} {
  const store = useStore()
  const ws = useWebsocket().ws()

  const addObjectData = (data: Array<Omit<ObjdModel, 'func'>>) => {
    const { objd } = store.state
    ws.send({ func: useFunc('setObject'), objd: objd.concat(data) })
  }

  return {
    addObjectData,
  }
}
