import http from '@/utils/http'
import { useDownload } from '@/composables/useDownload'
import type { GroupData, TagFormItem } from '@/types/config'

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
  const getTagsByGroups = async (requesList: Array<TagFormItem>, checkedGroupList: Array<GroupData>) => {
    const AllTags: any = []
    Promise.all(requesList).then((res: Array<any>) => {
      for (let i = 0; i < res.length; i += 1) {
        const groupName: string = checkedGroupList[i].name
        res[i].forEach((item: any) => {
          // console.log('e', item)
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
