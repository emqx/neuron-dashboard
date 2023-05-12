import { ElMessageBox } from 'element-plus'
import i18n from '@/i18n/index'
import type { MessageType } from 'element-plus/lib/el-message-box/src/message-box.type'

export const MessageBoxConfirm = (
  content: string = i18n.global.t('common.confirmDelete'),
  title: string = i18n.global.t('common.operateConfirm'),
  type: MessageType = 'warning',
) => {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: i18n.global.t('common.confirmButtonText'),
    cancelButtonText: i18n.global.t('common.cancelButtonText'),
    type,
  })
}
