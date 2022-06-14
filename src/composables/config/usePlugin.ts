import { ref, Ref } from 'vue'
import { PluginKind } from '@/types/enums'
import { addPlugin, deletePlugin, queryPluginList, updatePlugin } from '@/api/config'
import { CreatedPlugin, PluginForm } from '@/types/config'
import { createCommonErrorMessage, createOptionListFromEnum } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
import { EmqxMessage, EmqxMessageBox } from '@emqx/emqx-ui'

export default () => {
  const pluginList: Ref<Array<CreatedPlugin>> = ref([])
  const isListLoading = ref(false)

  const getPluginList = async () => {
    isListLoading.value = true
    const { data } = await queryPluginList()
    pluginList.value = data.plugins || []
    isListLoading.value = false
  }

  getPluginList()

  return {
    pluginList,
    isListLoading,
    getPluginList,
  }
}

export const useGetPluginMsgIdMap = () => {
  const pluginMsgIdMap: Record<number, CreatedPlugin> = {}
  const initMsgIdMap = async () => {
    try {
      const { data } = await queryPluginList()
      ;(data.plugins || []).forEach((item) => {
        pluginMsgIdMap[item.id] = item
      })
      return Promise.resolve(pluginMsgIdMap)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return { pluginMsgIdMap, initMsgIdMap }
}

export const useAddPlugin = () => {
  const createRawPluginForm = (): PluginForm => ({
    library: '',
  })
  const { t } = useI18n()
  const pluginForm = ref(createRawPluginForm())
  const pluginFormCom = ref()
  const pluginFormRules = {
    library: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('config.libName')),
      },
    ],
  }
  const isSubmitting = ref(false)

  const submitData = async () => {
    try {
      await pluginFormCom.value.validate()
      isSubmitting.value = true
      await addPlugin(pluginForm.value)
      EmqxMessage.success(t('common.createSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    pluginForm,
    pluginFormCom,
    pluginFormRules,
    isSubmitting,
    createRawPluginForm,
    submitData,
  }
}

export const useDeletePlugin = () => {
  const { t } = useI18n()
  const delPlugin = async ({ name }: CreatedPlugin) => {
    try {
      await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmDelete'), type: 'warning' })
      await deletePlugin(name)
      EmqxMessage.success(t('common.operateSuccessfully'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }
  return {
    delPlugin,
  }
}

export const usePluginIcon = () => {
  const pluginIconMap: Record<string, string> = {
    ekuiper: require('@/assets/images/plugin-icons/ekuiper.svg'),
    mqtt: require('@/assets/images/plugin-icons/MQTT.png'),
    'modbus-tcp': require('@/assets/images/plugin-icons/modbus.svg'),
  }
  const getPluginIcon = (name: string) => pluginIconMap[name] || ''

  return {
    getPluginIcon,
  }
}
