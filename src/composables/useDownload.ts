import { useI18n } from 'vue-i18n'
import { dataType } from '@/utils/utils'
import { ElMessage } from 'element-plus'

export const useDownload = () => {
  const { t } = useI18n()

  // must take the `responseType: 'blob'` when api request，such as `downloadLogs` api in `@/api/admin`
  const downloadFile = (responseHeaders: any, blobData: Blob, fileNameKey?: string) => {
    if (!responseHeaders) return

    if (responseHeaders['content-type'] === 'application/octet-stream') {
      // filname key
      const nameKey = fileNameKey || 'filename'
      const fileNameReg = new RegExp(`${nameKey}=(.*)`)

      // file name
      const fileNames: string = responseHeaders['content-disposition']
      const nameKeyValue = fileNames.match(fileNameReg)
      let name = nameKeyValue ? nameKeyValue[1] : 'default'
      name = decodeURIComponent(name)

      // download
      if ('download' in document.createElement('a')) {
        // not IE
        const url = window.URL.createObjectURL(new Blob([blobData], { type: 'application/json' }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // IE 10+
        navigator.msSaveBlob(new Blob([blobData]), name)
      }
    }
  }

  const readTextFile = (file: File) => {
    return new Promise((resolve, reject) => {
      if (dataType(file) !== 'file') {
        ElMessage.error(t('common.isNotFile'))
        reject(t('common.isNotFile'))
      } else {
        let fileContent: string | ArrayBuffer | null = ''
        const reader = new FileReader()
        reader.readAsText(file, 'utf-8')
        reader.onload = () => {
          fileContent = reader?.result || ''
          resolve(fileContent)
        }
        reader.onerror = () => {
          ElMessage.error(t('common.readFileError'))
          console.error(reader.error)
          reject(reader.error)
        }
      }
    })
  }

  return {
    downloadFile,
    readTextFile,
  }
}
