<template>
  <emqx-select
    v-model="pluginType"
    clearable
    class="plugin_select"
    :placeholder="$t('config.pluginKindPlaceholder')"
    @change="changePluginType"
  >
    <emqx-option v-for="item in directionPluginList" :key="item.name" :value="item.name" :label="item.name" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import usePlugin from '@/composables/config/usePlugin'
import { PluginKind } from '@/types/enums'

const props = defineProps({
  modelValue: { type: String, default: '' },
  types: { type: Array, default: () => [] },
})
const emits = defineEmits(['update:modelValue', 'change'])

const pluginType = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

const { pluginList } = usePlugin()

const exceptStaticPluginList = computed(() => {
  return pluginList.value.filter(({ kind }) => kind !== PluginKind.Static)
})

const directionPluginList = computed(() => {
  const { types } = props
  if (Array.isArray(types) && types.length) {
    return exceptStaticPluginList.value.filter(({ node_type }) => props.types.some((type) => type === node_type))
  }
  return exceptStaticPluginList.value
})
const changePluginType = (val: string) => {
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.plugin_select {
  width: 220px;
}
</style>
