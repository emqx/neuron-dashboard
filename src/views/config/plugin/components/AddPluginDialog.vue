<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="`${$t('common.add')} Plugin`"
    :z-index="2000"
  >
    <emqx-form ref="pluginFormCom" :model="pluginForm" :rules="pluginFormRules">
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model="pluginForm.name" />
      </emqx-form-item>
      <emqx-form-item prop="node_type" :label="$t('config.useFor')" required>
        <emqx-select v-model="pluginForm.node_type">
          <emqx-option v-for="item in useForOptionList" :key="item.value" :value="item.value" :label="item.label" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="kind" :label="$t('common.type')" required>
        <emqx-select v-model="pluginForm.kind">
          <emqx-option v-for="item in pluginKindList" :key="item.value" :value="item.value" :label="item.label" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="lib_name" :label="$t('config.libName')" required>
        <emqx-input v-model="pluginForm.lib_name" />
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">{{
          $t('common.create')
        }}</emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, PropType, watch, nextTick } from 'vue'
import { ElDialog } from 'element-plus'
import { useAddPlugin } from '@/composables/config/usePlugin'
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
    pluginForm.value = createRawPluginForm(props.type)
    await nextTick()
    pluginFormCom.value.resetField()
  }
})

const {
  pluginForm,
  pluginFormCom,
  pluginFormRules,
  useForOptionList,
  pluginKindList,
  isSubmitting,
  createRawPluginForm,
  submitData,
} = useAddPlugin()
const submit = async () => {
  await submitData()
  showDialog.value = false
  emit('submitted')
}
</script>
