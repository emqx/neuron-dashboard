<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog write-dialog"
    :title="tagName"
    :z-index="2000"
  >
    <div>
      <label>{{ $t('data.value') }}:</label>
      <emqx-input v-model="inputValue" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">{{
          $t('common.submit')
        }}</emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, PropType, watch, ref } from 'vue'
import { ElDialog } from 'element-plus'
import { writeData } from '@/api/data'

export interface DataForWrite {
  node_id: number
  group_config_name: string
  tagID: number
  tagValue: string
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object as PropType<DataForWrite>,
  },
  tagName: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue', 'updated'])

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

const inputValue = ref('')

watch(showDialog, (val) => {
  if (!props.data) {
    return
  }
  inputValue.value = props.data.tagValue
})

const isSubmitting = ref(false)

const submit = async () => {
  try {
    const { node_id, group_config_name, tagID, tagValue } = props.data as DataForWrite
    isSubmitting.value = true
    await writeData({
      node_id,
      group_config_name,
      tags: [
        {
          id: tagID,
          value: tagValue,
        },
      ],
    })
    emit('updated')
  } catch (error) {
    //
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss">
.write-dialog {
  label {
    display: block;
    margin-bottom: 12px;
  }
}
</style>
