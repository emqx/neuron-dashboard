<template>
  <emqx-form-item :label="showLabel(props.paramInfo.description)" :rules="rules" :prop="paramKey">
    <!-- Number -->
    <emqx-input v-if="paramInfo.type === TypeOfPluginParam.Int" v-model.number="inputValue" />
    <!-- String -->
    <emqx-input v-else-if="paramInfo.type === TypeOfPluginParam.String" v-model="inputValue" />
    <!-- Boolean -->
    <emqx-radio-group v-else-if="paramInfo.type === TypeOfPluginParam.Boolean" v-model="inputValue">
      <emqx-radio :label="true">True</emqx-radio>
      <emqx-radio :label="false">False</emqx-radio>
    </emqx-radio-group>
    <!-- Enum -->
    <!-- <emqx-select v-else-if="paramInfo.type === TypeOfPluginParam.Enum">
      <emqx-option />
    </emqx-select>-->
  </emqx-form-item>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, defineEmits } from 'vue'
import { ParamInfo } from '@/types/config'
import { TypeOfPluginParam } from '@/types/enums'
import useNodeConfigParamItem from '@/composables/config/useNodeConfigParamItem'

const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean],
  },
  paramKey: {
    type: String,
    required: true,
  },
  paramInfo: {
    type: Object as PropType<ParamInfo>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const { rules } = useNodeConfigParamItem(props)

const showLabel = (label: string) => {
  if (/^[a-z]/.test(label)) {
    return label.slice(0, 1).toUpperCase() + label.slice(1)
  }
  return label
}
</script>
