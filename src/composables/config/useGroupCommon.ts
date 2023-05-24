import http from '@/utils/http'
import { useDownload } from '@/composables/useDownload'
import type { GroupData, TagForm } from '@/types/config'

export default () => {
  const { downloadFile } = useDownload()

  const fileName = 'upload-tag-template.xlsx'
  const downloadTemplate = async () => {
    try {
      const { pathname } = window.location
      const fileURL = `${pathname.slice(-1) === '/' ? pathname.slice(0, -1) : pathname}/template/${fileName}`
      const { data } = await http.get(fileURL, { responseType: 'blob', baseURL: '' })
      downloadFile({ 'content-type': 'application/octet-stream', 'content-disposition': `filename=${fileName}` }, data)
    } catch (error) {
      console.error(error)
    }
  }

  // Get all tags by  the groups
  const getTagsByGroups = async (requesList: Array<Promise<any>>, groupList: Array<GroupData>) => {
    const AllTags: any = []
    return Promise.all(requesList).then(async (res: Array<any>) => {
      for (let i = 0; i < res.length; i += 1) {
        const groupName: string = groupList[i].name
        const tags = res[i] || []

        tags.forEach((item: TagForm) => {
          const tag = {
            ...item,
            group: groupName,
          }
          AllTags.push(tag)
        })
      }

      return Promise.resolve(AllTags)
    })
  }

  return {
    downloadTemplate,
    getTagsByGroups,
  }
}
