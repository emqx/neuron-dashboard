import { addTag } from '@/api/config'
import useTableFileReader from '@/composables/useTableFileReader'
import type { TagForm, TagData } from '@/types/config'
import type { TagType } from '@/types/enums'
import { FILLER_IN_TAG_ATTR } from '@/utils/constants'
import { getErrorMsg, matchObjShape, popUpErrorMessage } from '@/utils/utils'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import useAddTag, { useTagAttributeTypeSelect, useTagTypeSelect } from './useAddTag'
import { groupBy } from 'lodash'

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
      for (const {
        group,
        name,
        address,
        attribute,
        type: typeLabel,
        description = '',
        decimal,
        precision,
      } of tagList) {
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
          group,
          name: name.toString(),
          address: address.toString(),
          attribute: attr,
          type,
          description: description.toString(),
          decimal,
          precision,
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

  /**
   * batch add tags by node
   * TODO: after the import tag api is modified to batch，call that api at once && params without ‘group’
   */
  const batchAddTags = (tagList: Array<TagData>, node: string) => {
    return new Promise((resolve, reject) => {
      const tagsByGroupName = groupBy(tagList, (item) => item.group)
      const groupNames = Object.keys(tagsByGroupName)
      const requestList = groupNames.map((groupName: string) => {
        const groupTags: any = tagsByGroupName[groupName]
        let rqs = null
        return handleTagListInTableFile(groupTags).then((tags) => {
          rqs = addTag({ tags, node, group: groupName })
          return rqs
        })
      })
      Promise.all(requestList)
        .then(() => {
          EmqxMessage.success(t('config.uploadSuc'))
          resolve(true)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  // Upload all tags for all groups under the node.
  const uploadTag = async (file: File, node?: string) => {
    try {
      const data = await fileReader(file)
      const tagList = ((data[0] && data[0].sheet) || []) as Array<TagData>

      if (!checkTagListInTableFile(tagList)) {
        return Promise.reject()
      }

      const nodeName = node || route.params.node.toString()

      // after the add tag api is changed to batch add, modify this function to batch api
      await batchAddTags(tagList, nodeName)

      return Promise.resolve()
    } catch (error: any) {
      const { data = {} } = error
      handlePartialSuc(data.index, data.error)
      return Promise.reject(error)
    }
  }
  return {
    uploadTag,
  }
}
