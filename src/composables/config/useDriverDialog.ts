import { DriverDirection } from '@/types/enums'
import { ref, Ref, computed, nextTick } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { addDriver, queryPluginList } from '@/api/config'
import { CreatedPlugin, NodeForm } from '@/types/config'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'

export const usePluginList = (type: DriverDirection) => {
  const pluginList: Ref<Array<CreatedPlugin>> = ref([])

  const getPluginList = async () => {
    const { data } = await queryPluginList()
    const list = data.plugin_libs || []
    pluginList.value = list.filter(({ node_type }) =>
      type === DriverDirection.South
        ? node_type === type
        : NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type),
    )
  }

  getPluginList()

  return {
    pluginList,
  }
}

const createRawDriverForm = (type: DriverDirection): NodeForm => ({
  type,
  name: '',
  plugin_name: '',
})

export default (type: DriverDirection) => {
  const { t } = useI18n()
  const { pluginList } = usePluginList(type)

  const formCom = ref()
  const driverForm: Ref<NodeForm> = ref(createRawDriverForm(type))
  const isSubmitting = ref(false)
  const groupFormRules = {
    name: [{ required: true, message: t('config.nameRequired') }],
    plugin_name: [{ required: true, message: t('config.pluginRequired') }],
  }

  const dialogTitle = computed(() => (type === DriverDirection.North ? t('config.addApp') : t('config.newDriver')))

  const initForm = async () => {
    formCom.value.resetField()
    driverForm.value = createRawDriverForm(type)
  }

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await addDriver(driverForm.value, type)
      EmqxMessage.success(t('common.createSuccess'))
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }
  return {
    dialogTitle,
    pluginList,
    formCom,
    driverForm,
    isSubmitting,
    groupFormRules,
    initForm,
    submitData,
  }
}
