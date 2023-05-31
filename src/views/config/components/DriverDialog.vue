<template>
  <el-dialog v-model="showDialog" :width="500" custom-class="common-dialog" :title="dialogTitle" :z-index="2000">
    <emqx-form ref="formCom" :model="driverForm" :rules="groupFormRules">
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model.trim="driverForm.name" :disabled="driver" />
      </emqx-form-item>

      <!-- 1. Supports dual modes: plug-in and template  -->
      <emqx-form-item v-if="isDualMode" :label="$t('config.addDriverMode')">
        <emqx-radio-group v-model="activeDriverMode" class="mode-radio-group" @change="changeMode">
          <emqx-radio :label="addDriverModes[0]">{{ $t('config.pluginMode') }}</emqx-radio>
          <emqx-radio :label="addDriverModes[1]">{{ $t('config.templateMode') }}</emqx-radio>
        </emqx-radio-group>
      </emqx-form-item>

      <!--  Plugin mode-->
      <emqx-form-item v-if="activeDriverMode === addDriverModes[0]" prop="plugin" :label="$t('config.plugin')" required>
        <PluginListSelector
          v-model="driverForm.plugin"
          :type="type"
          :disabled="!!driver"
          width="100%"
          :placeholder="$t('config.selectPlugin')"
        />
      </emqx-form-item>

      <!-- Template mode -->
      <emqx-form-item
        v-if="activeDriverMode === addDriverModes[1]"
        prop="template"
        :label="$t('config.templateMode')"
        required
      >
        <TemplateListSelector v-model="driverForm.template" :disabled="!!driver" width="100%" />
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
import type { PropType } from 'vue'
import { computed, defineEmits, defineProps, watch } from 'vue'
import { ElDialog } from 'element-plus'
import useDriverDialog from '@/composables/config/useDriverDialog'
import type { DriverDirection } from '@/types/enums'
import PluginListSelector from '@/views/config/components/PluginListSelector.vue'
import TemplateListSelector from '@/views/config/components/TemplateListSelector.vue'

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
  // Currently only south devices support Dual-Mode, and north apps only support plug-in mode
  isDualMode: {
    type: Boolean,
    default: false,
  },
})

const {
  dialogTitle,
  formCom,
  driverForm,
  isSubmitting,
  groupFormRules,
  initForm,
  submitData,

  addDriverModes,
  activeDriverMode,
  changeMode,
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

<style lang="scss" scoped>
.mode-radio-group {
  width: 100%;
}
</style>
