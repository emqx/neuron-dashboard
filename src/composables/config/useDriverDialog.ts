import { addDriver } from '@/api/config'
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
})

export default (type: DriverDirection) => {
  const { t } = useI18n()

  const formCom = ref()
  const driverForm: Ref<NodeForm> = ref(createRawDriverForm())
  const isSubmitting = ref(false)
  const groupFormRules = computed(() => {
    return {
      name: [{ required: true, message: t('config.nameRequired') }],
      plugin: [{ required: true, message: t('config.pluginRequired') }],
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

  const submitData = async () => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      await addDriver(driverForm.value)
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
    groupFormRules,
    initForm,
    submitData,
  }
}
