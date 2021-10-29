import { computed, ComputedRef } from 'vue'
import { sendCommandToNode } from '@/api/config'
import { DriverItemInList } from '@/types/config'
import { DriverDirection, DriverStatus, NodeLinkState, NodeOperationCommand, NodeState } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { useI18n } from 'vue-i18n'

export const useDriverStatus = (driver: DriverItemInList) => {
  const { t } = useI18n()
  const statusIconClassMap = {
    [NodeState.Idle]: 'iconStandby',
    [NodeState.Ready]: 'iconStandby',
    [NodeState.Running]: 'iconactivation',
    [NodeState.Stopped]: 'iconstop',
  }
  const statusTextMap = {
    [NodeState.Idle]: t('config.idle'),
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

export const useNodeStartStopStatus = (node: DriverItemInList) => {
  const getNodeStartStopStatus: ComputedRef<boolean> = computed(() =>
    node.running === NodeState.Stopped ? false : true,
  )
  const setNodeStartStopStatus = async (val: boolean) => {
    try {
      await sendCommandToNode(node.id, val ? NodeOperationCommand.Start : NodeOperationCommand.Stop)
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
