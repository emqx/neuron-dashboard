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
    pluginList.value = data.plugin_libs || []
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
      ;(data.plugin_libs || []).forEach((item) => {
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
    lib_name: '',
  })
  const { t } = useI18n()
  const pluginForm = ref(createRawPluginForm())
  const pluginFormCom = ref()
  const pluginFormRules = {
    lib_name: [
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
  const delPlugin = async ({ id }: CreatedPlugin) => {
    try {
      await EmqxMessageBox({ title: t('common.operateConfirm'), message: t('common.confirmDelete'), type: 'warning' })
      await deletePlugin(id)
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
