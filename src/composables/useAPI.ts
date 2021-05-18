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
  delAttr: (attrName: string, objn: string) => Error | undefined
} {
  const store = useStore()
  const { ws } = useWebsocket()
  const { t } = useI18n()

  const findObjByName = (objn: string): number => store.state.objd.findIndex((obj: ObjdModel) => obj.objn === objn)

  const findObjAndAttrByName = (objn: string, attrName: string) => {
    const ret = {
      objIndex: -1,
      attrIndex: -1,
    }
    ret.objIndex = findObjByName(objn)
    if (ret.objIndex === -1) {
      return ret
    }
    ret.attrIndex = store.state.objd[ret.objIndex].oatt.findIndex((attr: OattModel) => attr.attn === attrName)
    return ret
  }

  const addObjectData = (data: Array<Omit<ObjdModel, 'func'>>) => {
    const { objd } = store.state
    ws().send({ func: useFunc('setObject'), objd: objd.concat(data) })
  }

  const addAttr = (attr: OattModel, objn: string) => {
    const objIndex = findObjByName(objn)
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
    const { objIndex, attrIndex } = findObjAndAttrByName(objn, attr.attn)
    if (objIndex === -1) {
      return new Error('Can find obj!')
    }
    if (attrIndex === -1) {
      return new Error('Can find attr')
    }

    const data = cloneDeep(store.state.objd)
    data[objIndex].oatt.splice(attrIndex, 1, attr)
    ws().send({ func: useFunc('setObject'), objd: data })
  }

  const delAttr = (attrName: string, objn: string) => {
    const { objIndex, attrIndex } = findObjAndAttrByName(objn, attrName)
    if (objIndex === -1) {
      return new Error('Can find obj!')
    }
    if (attrIndex === -1) {
      return new Error('Can find attr')
    }

    const data: Array<ObjdModel> = cloneDeep(store.state.objd)
    data[objIndex].oatt.splice(attrIndex, 1)
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
    delAttr,
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
