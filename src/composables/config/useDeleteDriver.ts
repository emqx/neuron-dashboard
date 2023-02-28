import { useI18n } from 'vue-i18n'
import { EmqxMessageBox, EmqxMessage } from '@emqx/emqx-ui'
import { deleteDriver } from '@/api/config'
import type { DriverItemInList } from '@/types/config'
import { PluginKind } from '@/types/enums'

export default () => {
  const { t } = useI18n()
  const delDriver = async ({ name }: DriverItemInList) => {
    try {
      await EmqxMessageBox({
        title: t('common.operateConfirm'),
        message: t('common.confirmDelete'),
        type: 'warning',
        confirmButtonText: t('common.confirmButtonText'),
      })
      await deleteDriver(name)
      EmqxMessage.success(t('common.operateSuccessfully'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  const deleteDriverByNode = async (type: string, node: DriverItemInList) => {
    try {
      if (type === 'app' && node.pluginKind === PluginKind.Static) {
        return
      }

      const delRes = await delDriver(node)
      return Promise.resolve(delRes)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    delDriver,
    deleteDriverByNode,
  }
}
