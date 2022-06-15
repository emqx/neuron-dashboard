<template>
  <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
    <emqx-row :gutter="28">
      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.tagName')" prop="name" required>
          <emqx-input v-model.trim="form.name" :disabled="edit" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item label="Address" prop="address" required>
          <emqx-input v-model.trim="form.address" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item label="Attribute" prop="attribute" required>
          <TagAttributeSelect v-model="form.attribute" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item label="Type" prop="type" required>
          <emqx-select v-model="form.type">
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
        <emqx-form-item :label="$t('config.desc')">
          <emqx-input v-model.trim="form.description" />
        </emqx-form-item>
      </emqx-col>
    </emqx-row>
  </emqx-form>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { useTagTypeSelect } from '@/composables/config/useAddTag'
import TagAttributeSelect from './TagAttributeSelect.vue'
import { PluginInfo, TagForm } from '@/types/config'
import { computed, defineProps, PropType, defineEmits, WritableComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { TagType } from '@/types/enums'

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

/**
 * The available tag types are restricted by
 * the plug-in type bound to the current node.
 */
const tagTypeOptListAfterFilter = computed(() => {
  if (!props?.nodePluginInfo?.tag_type) {
    return tagTypeOptList
  }
  return tagTypeOptList.filter((tagType) =>
    (props.nodePluginInfo as PluginInfo).tag_type.some((canSelectTagType) => canSelectTagType === tagType.value),
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

const rules = {
  name: [{ required: true, message: t('config.tagNameRequired') }],
  address: [{ required: true, message: t('config.tagAddressRequired') }],
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
