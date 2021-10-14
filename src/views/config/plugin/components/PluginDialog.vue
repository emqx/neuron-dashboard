<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="`${!!plugin ? $t('common.edit') : $t('common.add')} Plugin`"
    :z-index="2000"
  >
    <emqx-form ref="pluginFormCom" :model="pluginForm" :rules="pluginFormRules">
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model="pluginForm.name" :disabled="!!plugin" />
      </emqx-form-item>
      <emqx-form-item prop="node_type" :label="$t('config.useFor')" required>
        <emqx-select v-model="pluginForm.node_type">
          <emqx-option v-for="item in useForOptionList" :key="item.value" :value="item.value" :label="item.label" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="kind" :label="$t('config.pluginKind')" required>
        <emqx-select v-model="pluginForm.kind" :disabled="!!plugin">
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
          !!plugin ? $t('common.submit') : $t('common.create')
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
import { CreatedPlugin } from '@/types/config'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  plugin: {
    type: Object as PropType<CreatedPlugin>,
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
    if (props.plugin) {
      const { kind, node_type, name, lib_name } = props.plugin
      pluginForm.value = { kind, node_type, name, lib_name }
    } else {
      pluginForm.value = createRawPluginForm(props.type)
    }
    await nextTick()
    pluginFormCom.value.$refs.form.clearValidate()
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
  await submitData(props.plugin)
  showDialog.value = false
  emit('submitted')
}
</script>
