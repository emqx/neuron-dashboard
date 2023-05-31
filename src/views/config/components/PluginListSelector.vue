<template>
  <emqx-select
    v-model="pluginType"
    clearable
    :size="size"
    class="plugin_select"
    :placeholder="selectorPlaceholder"
    :disabled="disabled"
    @change="changePluginType"
  >
    <emqx-option v-for="item in directionPluginList" :key="item.name" :value="item.name" :label="item.name" />
  </emqx-select>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineEmits, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import usePlugin from '@/composables/config/usePlugin'
import { PluginKind, DriverDirection } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'

const props = defineProps({
  modelValue: { type: String, default: '' },
  type: { type: Number as PropType<DriverDirection>, required: true },
  placeholder: { type: String, default: '' },
  size: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  width: { type: String, default: '220px' },
})
const emits = defineEmits(['update:modelValue', 'change'])

const { t } = useI18n()

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

const types = computed(() => (props.type === DriverDirection.South ? SOUTH_DRIVER_NODE_TYPE : NORTH_DRIVER_NODE_TYPE))

const directionPluginList = computed(() => {
  if (Array.isArray(types.value) && types.value.length) {
    return exceptStaticPluginList.value.filter(({ node_type }) => types.value.some((type) => type === node_type))
  }
  return exceptStaticPluginList.value
})

const selectorPlaceholder = computed(() => {
  return props.placeholder || t('config.pluginKindPlaceholder')
})
const changePluginType = (val: string) => {
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.plugin_select {
  width: v-bind(width);
}
</style>
