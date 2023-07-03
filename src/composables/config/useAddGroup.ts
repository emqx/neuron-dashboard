import { ref, computed } from 'vue'
import type { GroupForm } from '@/types/config'
import useNodeList from './useNodeList'
import { addGroup, updateGroup } from '@/api/config'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { useNodePluginInfo } from './usePluginInfo'

export default () => {
  const createRawForm = (): GroupForm => ({
    group: '',
    node: null,
    interval: null,
  })

  const { t } = useI18n()

  const formCom = ref()
  const groupForm = ref(createRawForm())
  const { nodeList } = useNodeList()
  const isSubmitting = ref(false)

  const groupFormRules = computed(() => {
    return {
      group: [
        {
          required: true,
          message: t('config.groupNameRequired'),
        },
      ],
      node: [
        {
          required: true,
          message: t('config.nodeRequired'),
        },
      ],
      interval: [
        {
          required: true,
          message: t('config.readIntervalRequired'),
        },
        {
          validator(rule: unknown, value: string) {
            const ret = []
            if (Number.isNaN(Number(value))) {
              ret.push(new Error(t('config.readIntervalError')))
            }
            return ret
          },
        },
        {
          type: 'number',
          min: 100,
          message: t('config.readIntervalMinimumError'),
          trigger: 'blur',
        },
      ],
    }
  })

  const submitForm = async (propsGroup?: GroupForm) => {
    try {
      await formCom.value.validate()
      isSubmitting.value = true
      if (!propsGroup) {
        await addGroup(groupForm.value)
      } else {
        await updateGroup(groupForm.value)
      }
      EmqxMessage.success(t('common.submitSuccess'))
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  const initForm = () => {
    groupForm.value = createRawForm()
  }

  const resetFields = () => {
    formCom.value.form.resetFields()
  }

  // get node plugin schema
  const { getNodePluginInfo } = useNodePluginInfo()

  const getPluginConfigInfo = async () => {
    const data = await getNodePluginInfo()
    const { group_interval } = data

    if (group_interval !== undefined || group_interval !== null) {
      groupForm.value.interval = group_interval || null
    }
  }

  return {
    formCom,
    groupForm,
    nodeList,
    isSubmitting,
    groupFormRules,
    resetFields,
    initForm,
    submitForm,
    getPluginConfigInfo,
  }
}
