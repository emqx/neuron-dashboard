import type { ParamInfo } from '@/types/config'
import { dataType } from '@/utils/utils'
import { TypeOfPluginParam } from '@/types/enums'
import useLang from '@/composables/useLang'

export default () => {
  const { i18nContent } = useLang()

  interface Field {
    key: string
    info: ParamInfo
  }
  const shouldFieldShow = (fieldData: Field, formData: Record<string, any>) => {
    const { key } = fieldData

    const whiteList = ['tag_regex', 'group_interval']
    if (whiteList.includes(key)) return false

    if (!fieldData?.info?.condition) {
      return true
    }

    const { field, regex, value, values = [] } = fieldData.info.condition
    const fieldValue = formData[field]

    if (regex) {
      const regexExpression = new RegExp(regex)
      return regexExpression.test(fieldValue)
    }

    let res = true
    const emptyEnums = ['undefined', 'null']
    const emptyValue = emptyEnums.includes(String(dataType(value)))
    const emptyValues = emptyEnums.includes(String(dataType(values)))
    if (!emptyValue) {
      res = fieldValue === value
    } else if (!emptyValues) {
      res = values.includes(fieldValue)
    }
    return res
  }
  const initParamDefaultValueByType = (type: TypeOfPluginParam) => {
    const initValueMap = {
      [TypeOfPluginParam.Int]: null,
      [TypeOfPluginParam.String]: '',
      [TypeOfPluginParam.Boolean]: null,
      [TypeOfPluginParam.Enum]: '',
      [TypeOfPluginParam.Map]: '',
      [TypeOfPluginParam.Array]: [],
      [TypeOfPluginParam.File]: '',
    }
    return initValueMap[type] === undefined ? '' : initValueMap[type]
  }

  const upperFirstLetter = (str: string) => {
    if (/^[a-z]/.test(str)) {
      return str.slice(0, 1).toUpperCase() + str.slice(1)
    }
    return str
  }

  const showLabel = (field: ParamInfo) => {
    const label = i18nContent(field, 'name')
    return upperFirstLetter(label)
  }

  return {
    shouldFieldShow,
    initParamDefaultValueByType,
    upperFirstLetter,
    showLabel,
  }
}
