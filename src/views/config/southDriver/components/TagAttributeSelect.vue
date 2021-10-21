<template>
  <emqx-select v-model="selectedValue" multiple>
    <emqx-option v-for="item in tagAttributeTypeOptList" :key="item.value" :label="item.label" :value="item.value" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useTagAttributeTypeSelect } from '@/composables/config/useAddTag'

const props = defineProps({
  modelValue: { type: [Number] },
})
const emit = defineEmits(['update:modelValue'])

const { tagAttributeTypeOptList, tagAttrValueMap } = useTagAttributeTypeSelect()
const selectedValue = computed({
  get() {
    if (!props.modelValue) {
      return []
    }
    return tagAttrValueMap[props.modelValue as keyof typeof tagAttrValueMap]
  },
  set(val: Array<number>) {
    const value = Object.keys(tagAttrValueMap).find(
      (total) =>
        tagAttrValueMap[Number(total) as keyof typeof tagAttrValueMap].join(',') ===
        val.sort((a, b) => a - b).join(','),
    )
    emit('update:modelValue', Number(value))
  },
})
</script>
