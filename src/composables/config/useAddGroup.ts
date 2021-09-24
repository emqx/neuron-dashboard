import { ref } from 'vue'
import { GroupForm } from '@/types/config'
import useNodeList from './useNodeList'
import { addGroup } from '@/api/config'
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

  const submitForm = async () => {
    await formCom.value.validate()
    isSubmitting.value = true
    await addGroup(groupForm.value)
    isSubmitting.value = false
    EmqxMessage.success(t('common.submitSuccess'))
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
