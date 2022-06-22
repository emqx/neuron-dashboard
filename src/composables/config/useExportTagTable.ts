import { ref } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { exportExcelData } from '@/utils/utils'
import { useTagAttributeTypeSelect, useTagTypeSelect } from './useAddTag'
import { TagData } from '@/types/config'
import { FILLER_IN_TAG_ATTR } from '@/utils/constants'

export default () => {
  const { t } = useI18n()

  const isExporting = ref(false)

  const { getAttrStrByValue } = useTagAttributeTypeSelect()
  const { findLabelByValue } = useTagTypeSelect()

  const genExcelSheets = (tagList: Array<TagData>) => {
    const cols = ['name', 'address', 'attribute', 'type', 'description']
    const sheets: Array<any> = [cols]
    tagList.forEach((obj) => {
      const { name, address, attribute, type, description } = obj
      const content = []
      const attrStr = attribute ? getAttrStrByValue(attribute, FILLER_IN_TAG_ATTR) : ''
      const typeStr = type ? findLabelByValue(type) : ''
      content.push([name, address, attrStr, typeStr, description])
      sheets.push(...content)
    })
    return sheets
  }

  const exportTable = async (tagList: Array<TagData>, groupName: string, nodeName: string) => {
    if (tagList.length === 0) {
      EmqxMessage.warning(t('common.emptyData'))
      return
    }
    isExporting.value = true
    const data = genExcelSheets(tagList)
    try {
      await exportExcelData(data, `${nodeName} ${groupName} tags`)
    } catch (error: any) {
      EmqxMessage.error(error.toString())
    } finally {
      isExporting.value = false
    }
  }

  return {
    exportTable,
    isExporting,
  }
}
