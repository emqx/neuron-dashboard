import { DriverDirection, PluginKind } from '@/types/enums'
import { ref, Ref, computed, nextTick } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { addDriver, queryPluginList } from '@/api/config'
import { CreatedPlugin, NodeForm } from '@/types/config'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'

export const usePluginList = (type: DriverDirection) => {
  const pluginList: Ref<Array<CreatedPlugin>> = ref([])

  const getPluginList = async () => {
    const { data } = await queryPluginList()
    const list = data.plugins || []
    pluginList.value = list
      .filter(({ node_type }) =>
        type === DriverDirection.South
          ? SOUTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type)
          : NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type),
      )
      .filter(({ kind }) => kind !== PluginKind.Static)
  }

  getPluginList()

  return {
    pluginList,
  }
}

const createRawDriverForm = (): NodeForm => ({
  name: '',
  plugin: '',
})

export default (type: DriverDirection) => {
  const { t } = useI18n()
  const { pluginList } = usePluginList(type)

  const formCom = ref()
  const driverForm: Ref<NodeForm> = ref(createRawDriverForm())
  const isSubmitting = ref(false)
  const groupFormRules = {
    name: [{ required: true, message: t('config.nameRequired') }],
    plugin: [{ required: true, message: t('config.pluginRequired') }],
  }

  const dialogTitle = computed(() => (type === DriverDirection.North ? t('config.addApp') : t('config.newDevice')))

  const initForm = async () => {
    formCom.value.resetField()
    driverForm.value = createRawDriverForm()
  }

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await addDriver(driverForm.value)
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
