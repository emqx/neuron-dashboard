import { ref } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { exportExcelData } from '@/utils/utils'
import { useTagTypeSelect, useTagAttributeTypeSelect } from './useAddTagCommon'

import type { TagData } from '@/types/config'
import { FILLER_IN_TAG_ATTR } from '@/utils/constants'

export default () => {
  const { t } = useI18n()

  const isExporting = ref(false)

  const { getAttrStrByValue } = useTagAttributeTypeSelect()
  const { findLabelByValue } = useTagTypeSelect()

  // when a filed is added to tag（refer to the `createRawTagForm` in useAddTag.ts）, sync here.
  const genExcelSheets = (tagList: Array<TagData>) => {
    const cols = ['group', 'name', 'address', 'attribute', 'type', 'description', 'decimal', 'precision', 'value']
    const sheets: Array<any> = [cols]
    tagList.forEach((obj) => {
      const { group, name, address, attribute, type, description, decimal, precision, value } = obj
      const content = []
      const attrStr = attribute ? getAttrStrByValue(attribute, FILLER_IN_TAG_ATTR) : ''
      const typeStr = type ? findLabelByValue(type) : ''
      content.push([group, name, address, attrStr, typeStr, description, decimal, precision, value])
      sheets.push(...content)
    })
    return sheets
  }

  // const exportTable = async (tagList: Array<TagData>, groupName: string, nodeName: string) => {
  const exportTable = async (tagList: Array<TagData>, nodeName: string) => {
    if (tagList.length === 0) {
      EmqxMessage.warning(t('common.emptyData'))
      return
    }
    isExporting.value = true
    const data = genExcelSheets(tagList)

    try {
      await exportExcelData(data, `${nodeName} tags`)
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
