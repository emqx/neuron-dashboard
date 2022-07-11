import { addTag } from '@/api/config'
import useTableFileReader from '@/composables/useTableFileReader'
import type { TagForm } from '@/types/config'
import type { TagType } from '@/types/enums'
import { FILLER_IN_TAG_ATTR } from '@/utils/constants'
import { getErrorMsg, matchObjShape, popUpErrorMessage } from '@/utils/utils'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useAddTag, { useTagAttributeTypeSelect, useTagTypeSelect } from './useAddTag'

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
    // description is not required
    const { id, description, ...templateTag } = createRawTagForm()
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
      for (const { name, address, attribute, type: typeLabel, description = '' } of tagList) {
        const attr = getAttrTotalValueByStr(attribute, FILLER_IN_TAG_ATTR)
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
          description: description.toString(),
        })
        startIndex += 1
      }
      resolve(ret)
    })
  }

  const handlePartialSuc = (errIndex: number, errorNum: number) => {
    if (errIndex === 0) {
      popUpErrorMessage(errorNum)
    } else {
      EmqxMessage.error(t('config.partialUploadFailed', { reason: getErrorMsg(errorNum), errorRow: errIndex + 1 + 1 }))
    }
  }

  const uploadTag = async (file: File) => {
    try {
      const data = await fileReader(file)
      const tagList = ((data[0] && data[0].sheet) || []) as Array<TagForm>
      if (!checkTagListInTableFile(tagList)) {
        return
      }
      const node = route.params.node.toString()
      const groupName: string = route.params.group as string
      const tags = await handleTagListInTableFile(tagList)
      await addTag({ tags, node, group: groupName })
      EmqxMessage.success(t('config.uploadSuc'))
      return Promise.resolve()
    } catch (error: any) {
      const { data = {} } = error
      handlePartialSuc(data.index, data.error)
      console.error(error)
      return Promise.reject()
    }
  }
  return {
    uploadTag,
  }
}
