<template>
  <el-dialog v-model="showDialog" :width="500" custom-class="common-dialog" :title="dialogTitle" :z-index="2000">
    <emqx-form ref="formRef" :model="templateForm" :rules="rules">
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model.trim="templateForm.name" />
      </emqx-form-item>
      <emqx-form-item prop="plugin" :label="$t('config.plugin')" required>
        <PluginTypesSelector
          v-model="templateForm.plugin"
          :types="SOUTH_DRIVER_NODE_TYPE"
          :placeholder="$t('config.selectPlugin')"
          class="plugin_selector"
        />
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
import { computed, defineProps, defineEmits, watch } from 'vue'
import { ElDialog } from 'element-plus'
import useTemplateDialog from '@/composables/config/useTemplateDialog'
import { SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import PluginTypesSelector from '@/views/config/components/PluginTypesSelector.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'submitted'])

const { formRef, templateForm, dialogTitle, isSubmitting, rules, initForm, submitData } = useTemplateDialog(props)

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
.plugin_selector {
  width: 100%;
}
</style>
