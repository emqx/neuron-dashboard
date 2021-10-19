<template>
  <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
    <emqx-row :gutter="28">
      <emqx-col :span="12">
        <emqx-form-item :label="$t('config.tagName')" prop="name" required>
          <emqx-input v-model="form.name" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item label="Address" prop="address" required>
          <emqx-input v-model="form.address" />
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
            <emqx-option v-for="item in tagTypeOptList" :key="item.value" :value="item.value" :label="item.label" />
          </emqx-select>
        </emqx-form-item>
      </emqx-col>
    </emqx-row>
  </emqx-form>
</template>

<script lang="ts" setup>
import { ref, defineExpose } from 'vue'
import { useTagAttributeTypeSelect, useTagTypeSelect } from '@/composables/config/useAddTag'
import TagAttributeSelect from './TagAttributeSelect.vue'
import { TagForm } from '@/types/config'
import { computed, defineProps, PropType, defineEmits, WritableComputedRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  data: {
    type: Object as PropType<TagForm>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const formCom = ref()
const { tagTypeOptList } = useTagTypeSelect()
const { tagAttributeTypeOptList } = useTagAttributeTypeSelect()

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
  attribute: [{ required: true, message: t('config.tagAttributeRequired') }],
  type: [{ required: true, message: t('config.tagTypeRequired') }],
}

const validate = () => {
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
