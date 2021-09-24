import { ref } from 'vue'
import { GroupForm } from '@/types/config'
import useNodeList from './useNodeList'
import { addGroup, updateGroup } from '@/api/config'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'

export default () => {
  const createRawForm = (): GroupForm => ({
    group_config: '',
    src_node_id: null,
    read_interval: null,
  })

  const { t } = useI18n()
  const formCom = ref()
  const groupForm = ref(createRawForm())
  const { nodeList } = useNodeList()
  const isSubmitting = ref(false)

  const groupFormRules = {
    group_config: [
      {
        required: true,
        message: t('config.groupNameRequired'),
      },
    ],
    src_node_id: [
      {
        required: true,
        message: t('config.nodeRequired'),
      },
    ],
    read_interval: [
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
    ],
  }

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

  return {
    formCom,
    groupForm,
    nodeList,
    isSubmitting,
    groupFormRules,
    resetFields,
    initForm,
    submitForm,
  }
}
