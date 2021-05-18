import useWebsocket from '@/plugins/ws/useWebsocket'
import { useStore } from 'vuex'
import useFunc from '@/composables/useFunc'
import { ObjdModel, ChnlModel, NeuronData } from '@/types/neuron'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'

export default function useAPI(): {
  addObjectData: (data: Array<Omit<ObjdModel, 'func'>>) => void
  setDriverData: (data?: Array<Omit<ChnlModel, 'func'>>) => void
  setGatewayRestartNew: () => void
} {
  const store = useStore()
  const { ws } = useWebsocket()
  const { t } = useI18n()

  const addObjectData = (data: Array<Omit<ObjdModel, 'func'>>) => {
    const { objd } = store.state
    ws().send({ func: useFunc('setObject'), objd: objd.concat(data) })
  }

  const setDriverData = (data?: Array<Omit<ChnlModel, 'func'>>) => {
    const { _chnl } = store.state
    const chnl = data ? data : _chnl
    ws()
      .set({ success: afterSetDriverData })
      .send({ func: useFunc('setChannel'), chnl })

    EmqxMessage.success(t('config.driverSetup'))
  }

  // Function 70. After set DriverData, we must to restart gateway
  const setGatewayRestartNew = () => {
    ws().send({ func: useFunc('gatewayRestartNew'), acts: 'restartnew' })
  }

  return {
    addObjectData,
    setDriverData,
    setGatewayRestartNew,
  }
}

const afterSetDriverData = (data: NeuronData) => {
  if (data.errc === 0 && data.func === useFunc('setChannel')) {
    const { ws } = useWebsocket()
    const { setGatewayRestartNew } = useAPI()
    //FIXME: remove settimeout delay function
    setTimeout(() => {
      setGatewayRestartNew()
    }, 2000)
    ws().remove(afterSetDriverData)
  }
}
