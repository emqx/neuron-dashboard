<template>
  <emqx-select
    v-model="group"
    clearable
    :size="size"
    class="plugin_select"
    :placeholder="selectorPlaceholder"
    :disabled="disabled"
    @change="changeGroup"
  >
    <emqx-option v-for="{ name } in groupList" :key="name" :value="name" :label="name" />
  </emqx-select>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, watch, ref, nextTick } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { queryGroupList } from '@/api/config'
import type { GroupData } from '@/types/config'

const props = defineProps({
  modelValue: { type: String, default: '' },
  driver: { type: String, required: true },
  placeholder: { type: String, default: '' },
  size: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  width: { type: String, default: '220px' },
})
const emits = defineEmits(['update:modelValue', 'change'])

const { t } = useI18n()

const groupList: Ref<Array<GroupData>> = ref([])

const group = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  },
})

watch(
  () => props.driver,
  (newV) => {
    nextTick(() => {
      getList(newV)
    })
  },
  { immediate: true },
)

const getList = async (driver: string) => {
  try {
    groupList.value = driver ? await queryGroupList(driver as string) : []
  } catch (error) {
    console.error(error)
  }
}

const selectorPlaceholder = computed(() => {
  return props.placeholder || t('config.groupPlaceholder')
})
const changeGroup = (val: string) => {
  emits('change', val)
}
</script>

<style lang="scss" scoped>
.plugin_select {
  width: v-bind(width);
}
</style>
