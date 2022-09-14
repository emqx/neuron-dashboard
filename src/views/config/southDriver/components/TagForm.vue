<template>
  <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
    <emqx-row :gutter="28">
      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.tag')" prop="name" required>
          <emqx-input v-model.trim="form.name" :disabled="edit" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item :label="$t('common.attribute')" prop="attribute" required>
          <TagAttributeSelect v-model="form.attribute" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item :label="$t('common.type')" prop="type" required>
          <emqx-select v-model="form.type" @change="changeType">
            <emqx-option
              v-for="item in tagTypeOptListAfterFilter"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </emqx-select>
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.address')" prop="address" required>
          <emqx-input v-model.trim="form.address" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col v-if="isShowPrecisionField(form.type)" :span="12">
        <emqx-form-item :label="$t('config.precision')" prop="precision">
          <emqx-input-number v-model="form.precision" :min="0" :max="17" controls-position="right" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.decimal')" prop="decimal">
          <emqx-input-number v-model="form.decimal" :step="0.1" controls-position="right" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.desc')">
          <emqx-input v-model="form.description" />
        </emqx-form-item>
      </emqx-col>
    </emqx-row>
  </emqx-form>
</template>

<script lang="ts" setup>
import type { PropType, WritableComputedRef } from 'vue'
import { ref, defineExpose, computed, defineProps, defineEmits } from 'vue'
import { useTagTypeSelect } from '@/composables/config/useAddTag'
import TagAttributeSelect from './TagAttributeSelect.vue'
import type { PluginInfo, TagForm, TagRegex } from '@/types/config'
import { useI18n } from 'vue-i18n'
import type { TagType } from '@/types/enums'

const { t } = useI18n()
const props = defineProps({
  data: {
    type: Object as PropType<TagForm>,
    required: true,
  },
  nodePluginInfo: {
    type: Object as PropType<PluginInfo>,
  },
  edit: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const formCom = ref()
const { tagTypeOptList } = useTagTypeSelect()

const tagRegex = computed(() => {
  return props?.nodePluginInfo?.tag_regex
})

/**
 * The available tag types are restricted by
 * the plug-in type bound to the current node.
 */
const tagTypeOptListAfterFilter = computed(() => {
  if (!tagRegex.value) {
    return tagTypeOptList
  }
  return tagTypeOptList.filter((tagType) =>
    (props.nodePluginInfo as PluginInfo).tag_regex.some(
      (canSelectTagType: TagRegex) => canSelectTagType.type === tagType.value,
    ),
  )
})

const form: WritableComputedRef<TagForm> = computed({
  get() {
    return props.data
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

// valid address: valid address by type
const validAddress = (rule: any, value: string, callback: any) => {
  const cuurentType = form.value.type
  const curentTagRegex = tagRegex.value?.find((item: TagRegex) => item.type === Number(cuurentType))
  if (!curentTagRegex) {
    callback()
    return
  }
  const regex = curentTagRegex?.regex ? new RegExp(curentTagRegex.regex) : null
  if (!regex) {
    callback()
    return
  }

  if (!regex.test(value)) {
    callback(new Error(`${t('config.tagAddressValid')}`))
  } else {
    callback()
  }
}

const isShowPrecisionField = computed(() => (type: number | null) => {
  if (type === null || type === undefined) return false

  const whiteList = [9, 10] // FLOAT | DOUBLE
  const res: boolean = whiteList.includes(type)
  return res
})

const rules = {
  name: [{ required: true, message: t('config.tagNameRequired') }],
  address: [
    { required: true, message: t('config.tagAddressRequired') },
    { validator: validAddress, trigger: ['blur', 'change'] },
  ],
  attribute: [
    { required: true, message: t('config.tagAttributeRequired') },
    {
      validator(rule: unknown, value: Array<TagType>) {
        if (!value || value.length === 0) {
          return [new Error(t('config.tagAttributeRequired'))]
        }
        return []
      },
    },
  ],
  type: [{ required: true, message: t('config.tagTypeRequired') }],
}

// validate address when change tag type
const changeType = (type: string) => {
  formCom.value.form.validateField('address')
}

const validate = () => {
  // When the component is deleted, the form component is no longer available
  // but the validate method can still be called
  if (!formCom.value) {
    return Promise.resolve()
  }
  return formCom.value.validate()
}

const resetFields = () => {
  return formCom.value.resetField()
}

defineExpose({
  validate,
  resetFields,
})
</script>
