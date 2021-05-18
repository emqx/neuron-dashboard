import useWebsocket from '@/plugins/ws/useWebsocket'
import { useStore } from 'vuex'
import useFunc from '@/composables/useFunc'
import { ObjdModel, ChnlModel, NeuronData, OattModel } from '@/types/neuron'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'

export default function useAPI(): {
  addObjectData: (data: Omit<ObjdModel, 'func'>[]) => void
  setDriverData: (data?: Omit<ChnlModel, 'func'>[] | undefined) => void
  setGatewayRestartNew: () => void
  addAttr: (attr: OattModel, objn: string) => Error | undefined
  updateAttr: (attr: OattModel, objn: string) => Error | undefined
} {
  const store = useStore()
  const { ws } = useWebsocket()
  const { t } = useI18n()

  const addObjectData = (data: Array<Omit<ObjdModel, 'func'>>) => {
    const { objd } = store.state
    ws().send({ func: useFunc('setObject'), objd: objd.concat(data) })
  }

  const addAttr = (attr: OattModel, objn: string) => {
    const objIndex = store.state.objd.findIndex((obj: ObjdModel) => obj.objn === objn)
    let list = []
    if (objIndex > -1) {
      list = cloneDeep(store.state.objd)
      list[objIndex].oatt.push(attr)
      ws().send({ func: useFunc('setObject'), objd: list })
    } else {
      return new Error('Can find obj!')
    }
  }

  const updateAttr = (attr: OattModel, objn: string) => {
    const objArr = store.state.objd

    const objIndex = objArr.findIndex((obj: ObjdModel) => obj.objn === objn)
    if (objIndex === -1) {
      return new Error('Can find obj!')
    }

    const attrIndex = objArr[objIndex].oatt.findIndex(({ attn }: OattModel) => attn === attr.attn)
    debugger
    if (attrIndex === -1) {
      return new Error('Can find attr')
    }

    const data = cloneDeep(objArr)
    data[objIndex].oatt.splice(attrIndex, 1, attr)
    debugger
    ws().send({ func: useFunc('setObject'), objd: data })
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
    addAttr,
    updateAttr,
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
