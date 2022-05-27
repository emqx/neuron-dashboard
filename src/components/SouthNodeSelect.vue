<template>
  <SelectCanLoadingOpt v-model="selected" :load-opt-method="loadOpt" :options="options" />
</template>

<script lang="ts" setup>
import SelectCanLoadingOpt from './SelectCanLoadingOpt.vue'
import { computed, WritableComputedRef, Ref, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const selected: WritableComputedRef<string | number> = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const options: Ref<Array<{ label: string; value: string }>> = ref([])

// FIXME: delete test code
let start = 0
const once = 100

const loadOpt = () => {
  for (let index = start; index < start + once; index++) {
    options.value.push({ value: index.toString(), label: index.toString() })
  }
  start += once
}

loadOpt()
</script>
