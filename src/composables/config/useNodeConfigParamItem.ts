import { NumberParamInfo, ParamInfo, StringParamInfo } from '@/types/config'
import { TypeOfPluginParam } from '@/types/enums'
import { createCommonErrorMessage } from '@/utils/utils'
import { Ref, ref } from 'vue'
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
      required: true,
      message: createCommonErrorMessage('input', props.paramInfo.name),
    },
    {
      validator(rule: unknown, value: string) {
        const ret = []
        const { valid } = props.paramInfo as NumberParamInfo
        if (Number.isNaN(Number(value)) || Number(value) > valid.max || Number(value) < valid.min) {
          ret.push(
            new Error(t('config.numberErrorPrefix') + valid.min + '-' + valid.max + t('config.numberErrorSuffix')),
          )
        }
        return ret
      },
    },
  ]

  const createStringParamRules = () => [
    {
      required: true,
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
  ]

  const createEnumNBooleanParamRules = () => ({
    required: true,
    message: createCommonErrorMessage('select', props.paramInfo.name),
  })

  const fillRules = () => {
    const createMap = {
      [TypeOfPluginParam.Int]: createNumberParamRules,
      [TypeOfPluginParam.String]: createStringParamRules,
      [TypeOfPluginParam.Boolean]: createEnumNBooleanParamRules,
      [TypeOfPluginParam.Enum]: createEnumNBooleanParamRules,
    }
    rules.value = createMap[props.paramInfo.type] && createMap[props.paramInfo.type]()
  }

  fillRules()
  return { rules }
}
