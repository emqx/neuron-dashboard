import { sendCommandToNode } from '@/api/config'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection, NodeLinkState, NodeOperationCommand, NodeState } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useDriverStatus = (props: { data: DriverItemInList }) => {
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
  const statusIcon = computed(() => statusIconClassMap[props.data.running])
  const statusText = computed(() => statusTextMap[props.data.running] || '-')
  const connectionStatusText = computed(() => connectionStatusTextMap[props.data.link])
  return {
    statusIconClassMap,
    statusIcon,
    statusText,
    connectionStatusText,
  }
}

export const useNodeStartStopStatus = () => {
  const countNodeStartStopStatus = (data: DriverItemInList) => data.running === NodeState.Running
  return {
    countNodeStartStopStatus,
  }
}

export const useToggleNodeStartStopStatus = () => {
  const toggleNodeStartStopStatus = async (node: DriverItemInList, status: boolean) => {
    try {
      await sendCommandToNode(node.name, status ? NodeOperationCommand.Start : NodeOperationCommand.Stop)
      return Promise.resolve(true)
    } catch (error: any) {
      /* 
        Demand from the backend
        If an error is reported in 2011, Node is running, set the button to green;
        If error 2013 is reported, Node is stop, turn the button to gray.
      */
      const errorCode = error?.response?.data?.error
      if (errorCode === 2011) {
        return Promise.resolve({ ...node, running: NodeState.Running })
      }
      if (errorCode === 2013) {
        return Promise.resolve({ ...node, running: NodeState.Stopped })
      }
      return Promise.reject(error)
    }
  }
  return {
    toggleNodeStartStopStatus,
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
  const getNodeTypeLabelByValue = (value: 1 | 2 | null) => {
    if (SOUTH_DRIVER_NODE_TYPE.some((val) => val === value)) {
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
