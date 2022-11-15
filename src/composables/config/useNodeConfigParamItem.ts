import type { NumberParamInfo, ParamInfo, StringParamInfo } from '@/types/config'
import { ParamRequired, TypeOfPluginParam } from '@/types/enums'
import { createCommonErrorMessage } from '@/utils/utils'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

type Props = Readonly<{
  paramKey: string
  paramInfo: ParamInfo
  modelValue?: string | number | boolean | undefined
}>

export default (props: Props) => {
  const { t } = useI18n()
  const rules: Ref<Array<any> | Record<string, any>> = ref([])

  const createNumberParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    {
      validator(rule: unknown, value: string) {
        const ret = []
        const { valid, attribute } = props.paramInfo as NumberParamInfo

        const isNumber = Number.isNaN(Number(value)) || Number(value) > valid.max || Number(value) < valid.min
        if (attribute === 'required') {
          if (isNumber) {
            ret.push(
              new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`),
            )
          }
        } else if (value !== '' && isNumber) {
          ret.push(
            new Error(`${t('config.numberErrorPrefix') + valid.min}-${valid.max}${t('config.numberErrorSuffix')}`),
          )
        }
        return ret
      },
    },
  ]

  const createStringParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    {
      validator(rule: unknown, value: string) {
        const ret = []
        const { valid } = props.paramInfo as StringParamInfo
        if (value.length > valid.length) {
          ret.push(
            new Error(`${t('config.stringLengthErrorPrefix')}1-${valid.length}${t('config.stringLengthErrorSuffix')}`),
          )
        }
        return ret
      },
    },
    {
      validator(rule: unknown, value: string) {
        const ret = []
        const { valid } = props.paramInfo as StringParamInfo
        if (valid?.regex) {
          const regex = valid.regex.slice(1, valid.regex.length - 1)
          const newRegex = new RegExp(regex)
          if (!newRegex.test(value)) {
            ret.push(new Error(`${t('config.validHostError')}`))
          }
        }
        return ret
      },
    },
  ]

  const createSelectParamRules = () => ({
    // required: !!props.paramInfo.default,
    required: props.paramInfo.attribute === ParamRequired.True,
    message: createCommonErrorMessage('select', props.paramInfo.name),
  })

  const createFileParamRules = () => [
    {
      // required: !!props.paramInfo.default,
      required: props.paramInfo.attribute === ParamRequired.True,
      message: t('common.fileRequired'),
    },
  ]

  const fillRules = () => {
    const createMap = {
      [TypeOfPluginParam.Int]: createNumberParamRules,
      [TypeOfPluginParam.String]: createStringParamRules,
      [TypeOfPluginParam.Boolean]: createSelectParamRules,
      [TypeOfPluginParam.Enum]: createSelectParamRules,
      [TypeOfPluginParam.Map]: createSelectParamRules,
      [TypeOfPluginParam.File]: createFileParamRules,
    }
    rules.value = createMap[props.paramInfo.type] && createMap[props.paramInfo.type]()
  }

  fillRules()
  return { rules }
}
