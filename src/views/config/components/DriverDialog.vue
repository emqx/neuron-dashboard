<template>
  <el-dialog v-model="showDialog" :width="500" custom-class="common-dialog" :title="dialogTitle" :z-index="2000">
    <emqx-form ref="formCom" :model="driverForm" :rules="groupFormRules">
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model="driverForm.name" :disabled="driver" />
      </emqx-form-item>
      <emqx-form-item prop="plugin_name" label="Plugin" required>
        <emqx-select v-model="driverForm.plugin_name" :disabled="driver">
          <emqx-option v-for="item in pluginList" :key="item.name" :value="item.name" :label="item.name" />
        </emqx-select>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">
          {{ $t('common.create') }}
        </emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, PropType, watch } from 'vue'
import { ElDialog } from 'element-plus'
import useDriverDialog from '@/composables/config/useDriverDialog'
import { DriverDirection } from '@/types/enums'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  type: {
    type: Number as PropType<DriverDirection>,
    required: true,
  },
  driver: {
    type: Object,
  },
})

const {
  dialogTitle,
  pluginList,
  formCom,
  driverForm,
  isSubmitting,
  groupFormRules,
  initForm,
  submitData,
} = useDriverDialog(props.type)

const emit = defineEmits(['update:modelValue', 'submitted'])

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, (val) => {
  if (!val) {
    initForm()
  }
})

const submit = async () => {
  await submitData()
  showDialog.value = false
  emit('submitted')
}
</script>
