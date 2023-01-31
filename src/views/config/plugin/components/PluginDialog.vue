<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="`${$t('config.addPlugin')}`"
    :z-index="2000"
  >
    <emqx-form ref="pluginFormCom" :model="pluginForm" :rules="pluginFormRules" @submit.prevent>
      <emqx-form-item prop="library" :label="$t('config.libName')" required>
        <emqx-input v-model.trim="pluginForm.library" />
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
import { useAddPlugin } from '@/composables/config/usePlugin'
import { ElDialog } from 'element-plus'
import { computed, defineEmits, defineProps, nextTick, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'submitted'])

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, async (val) => {
  if (val) {
    pluginForm.value = createRawPluginForm()
    await nextTick()
    pluginFormCom.value.$refs.form.clearValidate()
  }
})

const { pluginForm, pluginFormCom, pluginFormRules, isSubmitting, createRawPluginForm, submitData } = useAddPlugin()
const submit = async () => {
  await submitData()
  showDialog.value = false
  emit('submitted')
}
</script>
