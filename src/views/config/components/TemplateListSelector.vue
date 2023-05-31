<template>
  <emqx-select
    v-model="template"
    clearable
    :size="size"
    class="plugin_select"
    :placeholder="selectorPlaceholder"
    :disabled="disabled"
    @change="change"
  >
    <emqx-option v-for="item in templateListMap" :key="item.name" :value="item.name" :label="item.name" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTemplateListMap } from '@/composables/config/useTemplateList'

const props = defineProps({
  modelValue: { type: String, default: '' },
  size: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  width: { type: String, default: '220px' },
  placeholder: { type: String, default: '' },
})
const emits = defineEmits(['update:modelValue', 'change'])

const { t } = useI18n()

const template = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const { getAllTemplates, templateListMap } = useTemplateListMap()

getAllTemplates()

const selectorPlaceholder = computed(() => {
  return props.placeholder || t('config.templatesSelectorPlaceholder')
})
const change = (val: string) => {
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.plugin_select {
  width: v-bind(width);
}
</style>
