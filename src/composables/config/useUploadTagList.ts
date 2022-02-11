import useTableFileReader, { SheetItem } from '@/composables/useTableFileReader'
import { EmqxMessage } from '@emqx/emqx-ui'
import { addTag } from '@/api/config'
import { TagForm } from '@/types/config'
import { useI18n } from 'vue-i18n'
import { matchObjShape } from '@/utils/utils'
import { useRoute } from 'vue-router'
import useAddTag, { useTagTypeSelect, useTagAttributeTypeSelect } from './useAddTag'
import { TagType } from '@/types/enums'

export default () => {
  const { fileReader } = useTableFileReader()
  const { createRawTagForm, nodePluginInfo } = useAddTag()
  const { t } = useI18n()
  const route = useRoute()

  const { findValueByLabel: findTypeValueByLabel, findLabelByValue: findTypeLabelByValue } = useTagTypeSelect()
  const { getTotalValueByStr: getAttrTotalValueByStr } = useTagAttributeTypeSelect()

  const checkTagListInTableFile = (data: Array<TagForm>): boolean => {
    if (!data.length) {
      EmqxMessage.warning(t('config.validTableError'))
      return false
    }
    const { id, ...templateTag } = createRawTagForm()
    if (!matchObjShape(data[0], templateTag)) {
      EmqxMessage.warning(t('config.errorTableError'))
      return false
    }
    return true
  }

  const checkTagType = (type: TagType) => nodePluginInfo.value?.tag_type?.some((item) => item === type) || true

  const handleTagListInTableFile = async (tagList: Array<Record<string, any>>): Promise<Array<TagForm>> => {
    return new Promise((resolve, reject) => {
      let startIndex = 2
      const ret = []
      for (const { name, address, attribute, type: typeLabel } of tagList) {
        const attr = getAttrTotalValueByStr(attribute, ' ')
        const type = findTypeValueByLabel(typeLabel)
        if (!type || !attr) {
          EmqxMessage.error(`${t('config.tableRowDataError', { rowNum: startIndex })} ${t('config.errorTableError')}`)
          reject()
          break
        }
        if (!checkTagType(type)) {
          EmqxMessage.error(
            t('config.tagTypeError', {
              typesStr: nodePluginInfo.value.tag_type.map((item) => findTypeLabelByValue(item)).join(', '),
            }),
          )
          reject()
          break
        }
        ret.push({
          name: name.toString(),
          address: address.toString(),
          attribute: attr,
          type,
        })
        startIndex += 1
      }
      resolve(ret)
    })
  }

  const uploadTag = async (file: File) => {
    try {
      const data = await fileReader(file)
      const tagList = ((data[0] && data[0].sheet) || []) as Array<TagForm>
      if (!checkTagListInTableFile(tagList)) {
        return
      }
      const nodeID = Number(route.params.nodeID)
      const groupName: string = route.params.group as string
      const tags = await handleTagListInTableFile(tagList)
      const ret = await addTag({ tags, node_id: nodeID, group_config_name: groupName })
      if (ret.status !== 200) {
        EmqxMessage.warning(t('config.partialUploadFailed'))
      } else {
        EmqxMessage.success(t('config.uploadSuc'))
      }
    } catch (error) {
      console.error(error)
    }
  }
  return {
    uploadTag,
  }
}
