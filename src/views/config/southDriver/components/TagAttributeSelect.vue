<template>
  <emqx-select
    v-model="selectedValue"
    multiple
    :collapse-tags="collapseTags"
    :placeholder="$t('common.pleaseSelect')"
    @change="change"
  >
    <emqx-option v-for="item in tagAttributeTypeOptList" :key="item.value" :label="item.label" :value="item.value" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useTagAttributeTypeSelect } from '@/composables/config/useAddTagCommon'

const props = defineProps({
  modelValue: { type: [Number] },
  collapseTags: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'change'])

const { tagAttributeTypeOptList, tagAttrValueMap } = useTagAttributeTypeSelect()
const selectedValue = computed({
  get() {
    if (!props.modelValue) {
      return []
    }
    return tagAttrValueMap[props.modelValue as keyof typeof tagAttrValueMap]
  },
  set(val: Array<number>) {
    const keys = Object.keys(tagAttrValueMap)
    const value = keys.find(
      (total) =>
        tagAttrValueMap[Number(total) as keyof typeof tagAttrValueMap].join(',') ===
        val.sort((a, b) => a - b).join(','),
    )
    emit('update:modelValue', Number(value))
  },
})

const change = () => {
  emit('change', change)
}
</script>
