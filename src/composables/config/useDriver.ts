import { DriverStatus } from '@/types/enums'
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
