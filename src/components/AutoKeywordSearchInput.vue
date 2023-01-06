<template>
  <el-autocomplete
    ref="autoSearch"
    v-model="myValue"
    :disabled="disabled"
    :clearable="clearable"
    size="medium"
    :placeholder="$t(`${placeholder}`)"
    class="common-autocomplete_input"
    :fetch-suggestions="getKeywordList"
    :trigger-on-focus="triggerOnFocus"
    @select="handleSelect"
    @clear="clear"
    @input="input"
    v-on:keydown.enter="enter"
  >
    <template v-slot="{ item }">
      <slot name="content" :item="item">
        <span class="item title">{{ item || item }}</span>
      </slot>
    </template>
  </el-autocomplete>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'
import { ElAutocomplete } from 'element-plus'

const props = defineProps({
  modelValue: { type: String, default: '' },
  allSearchData: { type: Array, default: () => [] }, // default value: [value1, value2]
  getKeywordListFunc: { type: Function, default: null }, // Use with `slot`
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  triggerOnFocus: { type: Boolean, default: false },
  placeholder: { type: String, default: 'common.pleaseSelect' },
})

const emits = defineEmits(['update:modelValue', 'clear', 'select', 'enter', 'input'])

const myValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const getKeywordList = (keyword: string, callback: any) => {
  if (props.getKeywordListFunc) {
    return props.getKeywordListFunc(keyword, callback)
  }
  const list = props.allSearchData
  const res = keyword ? list.filter((item: any) => item?.includes(keyword)) : list
  callback(res)
}

const enter = () => {
  emits('enter', myValue.value)
}

const input = (val: string) => {
  emits('input', val)
}

const handleSelect = (val: any) => {
  emits('select', val)
}

const clear = () => {
  emits('clear', '')
}
</script>
