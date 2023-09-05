<template>
  <emqx-select
    v-model="driver"
    clearable
    :size="size"
    class="plugin_select"
    :placeholder="selectorPlaceholder"
    :disabled="disabled"
    @change="changeDriver"
  >
    <emqx-option v-for="item in driverList" :key="item.name" :value="item.name" :label="item.name" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, watch, ref, nextTick } from 'vue'
import type { PropType, Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DriverDirection } from '@/types/enums'
import { querySouthDriverList, queryNorthDriverList } from '@/api/config'
import type { RawDriverData } from '@/types/config'

const props = defineProps({
  modelValue: { type: String, default: '' },
  type: { type: Number as PropType<DriverDirection | null>, default: null },
  placeholder: { type: String, default: '' },
  size: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  width: { type: String, default: '220px' },
})
const emits = defineEmits(['update:modelValue', 'change'])

const { t } = useI18n()

const driverList: Ref<Array<RawDriverData>> = ref([])

const driver = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

watch(
  () => props.type,
  (newV) => {
    nextTick(() => {
      getList(newV)
    })
  },
  { immediate: true },
)

const getAllDrivers = async (): Promise<Array<RawDriverData>> => {
  try {
    const listArray = await Promise.all([await queryNorthDriverList(), await querySouthDriverList()])
    const list = listArray.reduce((ret, cur) => {
      return ret.concat(cur)
    }, [])

    return Promise.resolve(list)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

const getList = async (type: DriverDirection | null | undefined) => {
  try {
    if (!type) {
      driverList.value = await getAllDrivers()
    }
    if (type === DriverDirection.South) {
      driverList.value = await querySouthDriverList()
    }
    if (type === DriverDirection.North) {
      driverList.value = await queryNorthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}

const selectorPlaceholder = computed(() => {
  return props.placeholder || t('config.southDeviceRequired')
})
const changeDriver = (val: string) => {
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.plugin_select {
  width: v-bind(width);
}
</style>
