import { addDriverByPlugin, addDriverByTemplate } from '@/api/config'
import type { NodeForm } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { EmqxMessage } from '@emqx/emqx-ui'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useNorthDriver from '@/composables/config/useNorthDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'

const createRawDriverForm = (): NodeForm => ({
  name: '',
  plugin: '',
  template: '',
})

export default (type: DriverDirection) => {
  const { t } = useI18n()

  const formCom = ref()
  const driverForm: Ref<NodeForm> = ref(createRawDriverForm())
  const isSubmitting = ref(false)

  // If you modify the sorting, please modify the logic of `changeMode` and `submitData`
  const addDriverModes = ['plugin', 'template']
  const activeDriverMode = ref('plugin')

  const groupFormRules = computed(() => {
    return {
      name: [{ required: true, message: t('config.nameRequired') }],
      plugin: [{ required: true, message: t('config.pluginRequired') }],
      template: [{ required: true, message: t('config.templateRequired') }],
    }
  })

  const dialogTitle = computed(() => (type === DriverDirection.North ? t('config.addApp') : t('config.newDevice')))

  const initForm = async () => {
    formCom.value.resetField()
    driverForm.value = createRawDriverForm()
  }

  const { goNodeConfig: goNorthNodeConfig } = useNorthDriver()
  const { goNodeConfig: goSouthNodeConfig } = useSouthDriver()

  const goNodeConfigPage = () => {
    const { name } = driverForm.value
    if (type === DriverDirection.South) {
      goSouthNodeConfig({ name })
    } else if (type === DriverDirection.North) {
      goNorthNodeConfig({ name })
    }
  }

  const changeMode = (mode: string) => {
    if (mode === addDriverModes[0]) {
      driverForm.value.template = ''
    } else {
      driverForm.value.plugin = ''
    }
  }

  const addDriverByTemplateMode = async () => {
    try {
      const { name, template } = driverForm.value
      const { data } = await addDriverByTemplate({ node: name, name: template })

      if (data.error !== 0) {
        return Promise.reject(data)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true

      if (activeDriverMode.value === addDriverModes[0]) {
        const { name, plugin } = driverForm.value
        await addDriverByPlugin({ name, plugin })
      } else {
        await addDriverByTemplateMode()
      }

      EmqxMessage.success(t('common.createSuccess'))
      goNodeConfigPage()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    dialogTitle,
    formCom,
    driverForm,
    isSubmitting,

    addDriverModes,
    activeDriverMode,
    changeMode,

    groupFormRules,
    initForm,
    submitData,
  }
}
