<template>
  <emqx-input
    v-model="myValue"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="$t(`${placeholder}`)"
    class="common-search_input"
    @input="input"
    @change="change"
    @clear="clear"
    v-on:keydown.enter="enter"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  placeholder: { type: String, default: 'common.keywordSearchPlaceholder' },
})

const emits = defineEmits(['update:modelValue', 'input', 'enter', 'change', 'clear'])

const myValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const input = () => {
  emits('input', myValue.value)
}
const enter = () => {
  emits('enter', myValue.value)
}
const change = () => {
  emits('change', myValue.value)
}
const clear = () => {
  emits('clear', myValue.value)
}
</script>

<style lang="scss" scoped>
.common-search_input {
  width: 220px;
}
</style>
