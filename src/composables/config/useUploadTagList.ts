import useTableFileReader from '@/composables/useTableFileReader'
import type { TagForm, TagData, PluginInfo } from '@/types/config'
import type { TagType } from '@/types/enums'
import { TagAttributeType } from '@/types/enums'
import { FILLER_IN_TAG_ATTR } from '@/utils/constants'
import { getErrorMsg, matchObjShape, popUpErrorMessage, dataType } from '@/utils/utils'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useTagTypeSelect, useTagAttributeTypeSelect, createTagForm } from '@/composables/config/useAddTagCommon'

export default (pluginInfo: PluginInfo) => {
  const { fileReader } = useTableFileReader()
  const { createRawTagForm } = createTagForm()
  const { t } = useI18n()

  const { findValueByLabel: findTypeValueByLabel, findLabelByValue: findTypeLabelByValue } = useTagTypeSelect()
  const { getTotalValueByStr: getAttrTotalValueByStr, isAttrsIncludeTheValue } = useTagAttributeTypeSelect()

  const checkAttrIncludeStatic = (attr: number) => {
    const isIncludeStaticAttr = isAttrsIncludeTheValue(attr, TagAttributeType.Static)
    return isIncludeStaticAttr
  }

  // Check excel colunm required fileds in the init state
  const checkTagListInTableFile = (data: Array<TagForm>): boolean => {
    if (!data.length) {
      EmqxMessage.warning(t('config.validTableError'))
      return false
    }

    // description, value fields are not required, void uploading failures due to not matching
    const { id, description, value, precision, decimal, ...requiredData } = createRawTagForm()

    if (!matchObjShape(data[0], requiredData)) {
      EmqxMessage.warning(t('config.errorTableError'))
      return false
    }
    return true
  }

  const checkTagType = (type: TagType) => pluginInfo?.tag_type?.some((item) => item === type) || true

  // when a filed is added to tag（refer to the `createRawTagForm` in useAddTag.ts）, sync here.
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
        value,
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
              typesStr: pluginInfo.tag_type.map((item) => findTypeLabelByValue(item)).join(', '),
            }),
          )
          reject()
          break
        }

        // when when `attribute` is includes `Static`， but `value` is empty
        // TODO: 校验 value 与 type
        if (checkAttrIncludeStatic(attr) && dataType(value) !== 'number') {
          EmqxMessage.error(`${t('config.errorStaticWithValue', { rowNum: startIndex, name })}`)
          reject()
          break
        }

        let tagItem: TagData = {
          group,
          name: name.toString(),
          address: address.toString(),
          attribute: attr,
          type,
          description: description.toString(),
          decimal,
          precision,
        }
        // when `attribute` is includes `Static`
        if (checkAttrIncludeStatic(attr)) {
          tagItem = {
            ...tagItem,
            value,
          }
        }
        ret.push(tagItem)
        startIndex += 1
      }
      resolve(ret)
    })
  }

  const handlePartialSuc = (errIndex: number, errorNum: number) => {
    if (errIndex === 0) {
      if (errorNum === 2405) {
        EmqxMessage.error(t('error.importTag2405'))
      } else {
        popUpErrorMessage(errorNum)
      }
    } else {
      EmqxMessage.error(t('config.partialUploadFailed', { reason: getErrorMsg(errorNum), errorRow: errIndex + 1 + 1 }))
    }
  }

  /**
   * batch add tags by node
   * TODO: after the import tag api is modified to batch，call that api at once && params without ‘group’
   */
  const batchAddTags = (requestList: Array<Promise<any>>) => {
    return new Promise((resolve, reject) => {
      Promise.all(requestList)
        .then(() => {
          EmqxMessage.success(t('config.uploadSuc'))
          resolve(true)
        })
        .catch((error: any) => {
          const { data = {} } = error
          if (data.index !== undefined && data.error !== undefined) {
            handlePartialSuc(data.index, data.error)
          }
          reject(error)
        })
    })
  }

  const readTagListFile = async (file: File) => {
    try {
      const data = await fileReader(file)
      const tagList = ((data[0] && data[0].sheet) || []) as Array<TagData>
      if (!checkTagListInTableFile(tagList)) {
        return Promise.reject()
      }

      return Promise.resolve(tagList)
    } catch (error: any) {
      const { data = {} } = error
      if (data.index !== undefined && data.error !== undefined) {
        handlePartialSuc(data.index, data.error)
      }
      return Promise.reject(error)
    }
  }
  return {
    handleTagListInTableFile,
    readTagListFile,
    batchAddTags,
  }
}
