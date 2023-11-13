import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { sendCommandToNode, updateNodeLogLevelToDebug } from '@/api/config'
import { getStatisticByType } from '@/api/statistics'
import type { DriverItemInList } from '@/types/config'
import type { NodeCatogery } from '@/types/enums'
import { DriverDirection, NodeOperationCommand, NodeState } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { computed, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { statusIconClassMap, statusTextMap, connectionStatusTextMap, nodeTypeClassMap } from '@/utils/driver'

export const useDriverStatus = (props: { data: DriverItemInList }) => {
  const { t } = useI18n()

  const statusIcon = computed(() => (props.data?.running ? statusIconClassMap[props.data.running] : ''))
  const statusText = computed(() => (props.data?.running ? t(`${statusTextMap[props.data.running]}`) || '-' : ''))
  const connectionStatusText = computed(() =>
    Number(props.data?.link) >= 0 ? t(`${connectionStatusTextMap[props.data.link]}`) : '',
  )

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

export const dataStatistics = () => {
  const { t } = useI18n()

  const drawerRef = ref()
  const dataStatisticsVisiable = ref(false)
  const loadingStatistic = ref(false)
  const nodeStatisticData = ref<string[][]>([])
  let timer: undefined | number
  const nodeItemData = ref({ name: '' })

  const isShowDataStatistics = (node: DriverItemInList, value?: boolean) => {
    nodeItemData.value = node

    if (value === undefined || value === null) {
      dataStatisticsVisiable.value = !dataStatisticsVisiable.value
      return
    }
    dataStatisticsVisiable.value = value
  }

  const convertToCamelCase = (data: string) => {
    const stringData = data || ''

    const camelCaseData = stringData.replace(/_([a-z])/g, (k) => k[1].toUpperCase())
    return camelCaseData
  }

  const i18nValue = (key: string, value: string) => {
    if (!value) return ''

    const data = Number(value)

    let newValue = value
    if (key.includes('nodeType')) {
      newValue = t(`${nodeTypeClassMap[data as keyof typeof nodeTypeClassMap]}`)
    }

    if (key.includes('linkState')) {
      newValue = t(`${connectionStatusTextMap[data as keyof typeof connectionStatusTextMap]}`)
    }
    if (key.includes('runningState')) {
      newValue = t(`${statusTextMap[data as keyof typeof statusTextMap]}`)
    }

    return newValue
  }

  const handleStatisticData = (data: string) => {
    if (!data) return []

    const res: string[][] = []

    const dataOneDiemArray = data.split('\n')

    dataOneDiemArray.forEach((item: string) => {
      if (item) {
        const keyRegex = /\{[^}]+\}/g
        const itemSplitArr = item.replace(keyRegex, ':')

        const keyValue = itemSplitArr.split(':')
        const keyCamelCase = convertToCamelCase(keyValue[0] || '')

        // Determine whether to include a group
        const groupRegex = /(group=)[^}]+/g
        const groupMatch = item.match(groupRegex)
        let groupName = ''
        if (groupMatch) {
          const groupData = groupMatch[0].split('=')
          const group = groupData[1] || ''
          groupName = group.slice(1, group.length - 1)
        }

        const keyI18n = groupName ? t(`config.${keyCamelCase}`, { group: groupName }) : t(`config.${keyCamelCase}`)
        let value = keyValue[1] || ''
        value = i18nValue(keyCamelCase, value)

        const arrItem = [keyI18n, value]
        res.push(arrItem)
      }
    })

    return res
  }

  /**
   * Get north app node or south device node statistic data
   * @param params { node name }
   */
  const getNodeStatisticData = (type: NodeCatogery[keyof NodeCatogery], params: any) => {
    loadingStatistic.value = true
    getStatisticByType(type, params)
      .then((res: any) => {
        nodeStatisticData.value = []
        let statistics: string = res?.data || ''
        statistics = statistics.replace(/(#)(.*)(\n)/g, '') // remove comments

        nodeStatisticData.value = handleStatisticData(statistics)

        setTimer(type, params)
      })
      .finally(() => {
        loadingStatistic.value = false
      })
  }

  const setTimer = (type: NodeCatogery[keyof NodeCatogery], params: any) => {
    if (timer) {
      window.clearInterval(timer)
    }

    timer = window.setInterval(() => {
      getNodeStatisticData(type, params)
    }, 3000)
  }

  onUnmounted(() => {
    if (timer) {
      window.clearInterval(timer)
    }
  })

  return {
    drawerRef,
    isShowDataStatistics,
    dataStatisticsVisiable,
    nodeStatisticData,
    loadingStatistic,
    getNodeStatisticData,
    nodeItemData,
  }
}

export const useNodeDebugLogLevel = () => {
  const { t } = useI18n()

  const modifyNodeLogLevelToDebug = async (nodeName: string, logLevel: string) => {
    try {
      const currentLogLevel = logLevel === 'debug' ? 'notice' : 'debug'
      await updateNodeLogLevelToDebug(nodeName, currentLogLevel)
      if (currentLogLevel === 'debug') {
        EmqxMessage.success(t('config.enableNodeLogDebugSuc'))
      } else {
        EmqxMessage.success(t('config.disableNodeLogDebugSuc'))
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  return {
    modifyNodeLogLevelToDebug,
  }
}

export const useDriverName = () => {
  const isNotSupportRemoveNode = computed(() => (nodeName: string) => {
    const nodeNameLowerCase = nodeName?.toLocaleLowerCase()
    const whiteList = ['data-stream-processing', 'monitor']
    return whiteList.includes(nodeNameLowerCase)
  })

  const isMonitorNode = (nodeName: string) => nodeName?.toLowerCase() === 'monitor'

  return {
    isNotSupportRemoveNode,
    isMonitorNode,
  }
}

export const useDriverInfo = (node?: Record<string, any>) => {
  const route = useRoute()

  const nodePlugin = computed(() => {
    return node?.plugin || route.params?.plugin?.toString() || ''
  })

  const isMQTTPugin = computed(() => nodePlugin.value && nodePlugin.value.toLocaleLowerCase() === 'mqtt')

  const isGewuPugin = computed(() => {
    const nodePluginName = nodePlugin.value?.toLocaleLowerCase().replace(/\s/g, '')
    const pluginNames = ['gewudmp-v1', 'gewudmp-v2']
    return pluginNames.includes(nodePluginName)
  })

  const isSupportBatchSub = computed(() => {
    return (
      isMQTTPugin.value ||
      isGewuPugin.value ||
      ['ekuiper', 'websocket', 'sparkplugb'].includes(nodePlugin.value.toLocaleLowerCase())
    )
  })

  return {
    nodePlugin,
    isMQTTPugin,
    isGewuPugin,
    isSupportBatchSub,
  }
}

export const useListShowType = () => {
  const store = useStore()

  const showType = computed({
    get: () => store.state.listShowType,
    set: (val) => {
      store.commit('SET_LIST_SHOW_TYPE', val)
    },
  })

  return {
    showType,
  }
}
