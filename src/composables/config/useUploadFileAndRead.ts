import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { FileType } from '@/types/enums'

export default () => {
  const { t } = useI18n()

  let maxSize = 10000

  const setMaxSize = (size: number) => {
    maxSize = size
  }

  const readFile = async (file: any, fileType: FileType = FileType.Text): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      if (fileType === FileType.Text) {
        reader.readAsText(file, 'UTF-8')
      } else {
        reader.readAsArrayBuffer(file)
      }
      reader.onload = function (evt) {
        const content = evt?.target?.result
        if (content) {
          resolve(content as string)
        } else if (content === '') {
          EmqxMessage.error(t('common.readFileError'))
          reject()
        } else if (content === undefined) {
          EmqxMessage.error(t('common.readFileError'))
          reject()
        }
      }
      reader.onerror = function (evt) {
        EmqxMessage.error(t('common.readFileError'))
        reject()
      }
    })
  }

  return {
    setMaxSize,
    readFile,
  }
}
