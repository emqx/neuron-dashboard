<template>
  <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
    <emqx-row :gutter="28">
      <emqx-col :span="12">
        <emqx-form-item :label="$t('common.name')" prop="name" required>
          <emqx-input v-model.trim="form.name" :disabled="edit" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item :label="$t('common.attribute')" prop="attribute" required>
          <template #label>
            <span>{{ $t('common.attribute') }}</span>
            <AComWithDesc :content="$t('config.staticNotSupportBytes')">
              <i class="el-icon-info icon-label" />
            </AComWithDesc>
          </template>
          <TagAttributeSelect v-model="form.attribute" @change="changeAttribute" />
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item :label="$t('common.type')" prop="type" required>
          <emqx-select v-model="form.type" :placeholder="$t('common.pleaseSelect')" @change="changeType">
            <emqx-option
              v-for="item in tagTypeOptListAfterFilter"
              :key="item.value"
              :value="item.value"
              :label="item.label"
              :disabled="item.value === TagType.BYTES && isAttrsIncludeStatic(form.attribute)"
            />
          </emqx-select>
        </emqx-form-item>
      </emqx-col>
      <emqx-col :span="12">
        <emqx-form-item
          :label="$t('config.address')"
          prop="address"
          :rules="[
            { required: !isAttrsIncludeStatic(form.attribute), message: $t('config.tagAddressRequired') },
            ...rules.address,
          ]"
        >
          <emqx-input v-model.trim="form.address" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col v-if="isAttrsIncludeStatic(form.attribute)" :span="12">
        <emqx-form-item
          :label="$t('config.tagValue')"
          prop="value"
          :rules="[
            ...rules.value,
            {
              required: isAttrsIncludeStatic(form.attribute),
              message: $t('config.tagValueRequired'),
            },
          ]"
        >
          <emqx-input v-model.trim="form.value" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col v-if="isShowPrecisionField(form.type) && !isAttrsIncludeStatic(form.attribute)" :span="12">
        <emqx-form-item :label="$t('config.precision')" prop="precision">
          <emqx-input-number v-model="form.precision" :min="0" :max="17" controls-position="right" />
        </emqx-form-item>
      </emqx-col>

      <emqx-col v-if="!isAttrsIncludeStatic(form.attribute)" :span="12">
        <emqx-form-item :label="$t('config.decimal')" prop="decimal">
          <!--  @blur="changeDecimal" -->
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
import { defineExpose, computed, defineProps, defineEmits, nextTick } from 'vue'
import { useTagPrecision } from '@/composables/config/useAddTagCommon'
import TagAttributeSelect from './TagAttributeSelect.vue'
import type { PluginInfo, TagForm } from '@/types/config'
import useTagForm from '@/composables/config/useTagForm'
import { TagType } from '@/types/enums'
import AComWithDesc from '@/components/AComWithDesc.vue'

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

const { formCom, isAttrsIncludeStatic, tagTypeOptListAfterFilter, rules, validate, resetFields } = useTagForm(props)
const { isShowPrecisionField } = useTagPrecision()

const form: WritableComputedRef<TagForm> = computed({
  get() {
    return props.data
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const isBYTESType = computed(() => form.value.type === TagType.BYTES)

const changeAttribute = () => {
  const isStaticAttr = isAttrsIncludeStatic.value(form.value.attribute)

  if (!isStaticAttr) {
    form.value.value = undefined
  } else {
    form.value.precision = undefined
    form.value.decimal = null
    if (isBYTESType.value) {
      form.value.type = null
    }
  }
  // validate  'address'
  nextTick(() => {
    formCom.value.form.validateField('address')
  })
}

// validate address when change tag `type`
const changeType = () => {
  const validateFields = [`address`]
  if (form.value.value) {
    validateFields.push(`value`)
  }

  formCom.value.form.validateField(validateFields)
}

// used when 'vaule' is related width decimal
// validate address when change tag `Decimal`
// const changeDecimal = () => {
//   formCom.value.form.validateField('value')
// }

defineExpose({
  validate,
  resetFields,
})
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  float: none;
}
.icon-label {
  padding-left: 4px;
  color: #999;
}
</style>
