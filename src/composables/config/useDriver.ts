import { DriverDirection, DriverStatus } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { useI18n } from 'vue-i18n'

export const useDriverStatus = () => {
  const { t } = useI18n()
  const statusIconClassMap = {
    [DriverStatus.Stop]: 'iconstop',
    [DriverStatus.Standby]: 'iconStandby',
    [DriverStatus.Activate]: 'iconactivation',
  }
  const statusTextMap = {
    [DriverStatus.Stop]: t('common.shutdown'),
    [DriverStatus.Standby]: t('common.standby'),
    [DriverStatus.Activate]: t('common.active'),
  }
  return {
    statusIconClassMap,
    statusTextMap,
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
