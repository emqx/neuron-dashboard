import { useI18n } from 'vue-i18n'
import { EmqxMessageBox, EmqxMessage } from '@emqx/emqx-ui'
import { deleteDriver } from '@/api/config'
import { DriverItemInList } from '@/types/config'

export default () => {
  const { t } = useI18n()
  const delDriver = async ({ name }: DriverItemInList) => {
    try {
      await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmDelete'), type: 'warning' })
      await deleteDriver(name)
      EmqxMessage.success(t('common.operateSuccessfully'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }
  return {
    delDriver,
  }
}
