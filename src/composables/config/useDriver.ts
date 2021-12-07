import { computed, WritableComputedRef } from 'vue'
import { sendCommandToNode } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { DriverDirection, NodeLinkState, NodeOperationCommand, NodeState } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'

export const useDriverStatus = (driver: DriverItemInList) => {
  const { t } = useI18n()
  const statusIconClassMap = {
    [NodeState.Idle]: 'iconidle',
    [NodeState.Init]: 'iconinit',
    [NodeState.Ready]: 'iconready',
    [NodeState.Running]: 'iconrunning',
    [NodeState.Stopped]: 'iconstopped',
  }
  const statusTextMap = {
    [NodeState.Idle]: t('config.idle'),
    [NodeState.Init]: t('config.init'),
    [NodeState.Ready]: t('config.ready'),
    [NodeState.Running]: t('config.running'),
    [NodeState.Stopped]: t('config.stopped'),
  }

  const connectionStatusTextMap = {
    [NodeLinkState.Disconnected]: t('config.disconnected'),
    [NodeLinkState.Connecting]: t('config.connecting'),
    [NodeLinkState.Connected]: t('config.connected'),
  }
  const statusIcon = computed(() => statusIconClassMap[driver.running])
  const statusText = computed(() => statusTextMap[driver.running] || '-')
  const connectionStatusText = computed(() => connectionStatusTextMap[driver.link])
  return {
    statusIconClassMap,
    statusIcon,
    statusText,
    connectionStatusText,
  }
}

export const useNodeStartStopStatus = (props: { data: DriverItemInList }, updatedCallback: () => void) => {
  const { t } = useI18n()

  const getNodeStartStopStatus: WritableComputedRef<boolean> = computed({
    get() {
      return props.data.running === NodeState.Running ? true : false
    },
    async set(val) {
      try {
        await setNodeStartStopStatus(val)
        EmqxMessage.success(t('common.operateSuccessfully'))
        if (updatedCallback && typeof updatedCallback === 'function') {
          updatedCallback()
        }
      } catch (error) {
        //
      }
    },
  })
  const setNodeStartStopStatus = async (val: boolean) => {
    try {
      await sendCommandToNode(props.data.id, val ? NodeOperationCommand.Start : NodeOperationCommand.Stop)
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return {
    getNodeStartStopStatus,
    setNodeStartStopStatus,
  }
}

export const useNodeTypeSelect = () => {
  const { t } = useI18n()
  const nodeTypeList = [
    { label: t('config.northApp'), value: DriverDirection.North },
    { label: t('config.southDevice'), value: DriverDirection.South },
  ]
  return {
    nodeTypeList,
  }
}

export const useNodeType = () => {
  const { t } = useI18n()
  const getNodeTypeLabelByValue = (value: 1 | 2 | 3 | 4 | 5) => {
    if (value === DriverDirection.South) {
      return t('config.southDevice')
    }
    if (NORTH_DRIVER_NODE_TYPE.some((val) => val === value)) {
      return t('config.northApp')
    }
    return '-'
  }
  return {
    getNodeTypeLabelByValue,
  }
}
