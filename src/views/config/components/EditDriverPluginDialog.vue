<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="type === DriverDirection.North ? $t('config.modifyAppPlugin') : $t('config.modifyDriverPlugin')"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="formData" :rules="formRules">
      <emqx-form-item prop="plugin_name" label="Plugin" required>
        <emqx-select v-model="formData.plugin_name">
          <emqx-option v-for="item in pluginList" :key="item.name" :value="item.name" :label="item.name" />
        </emqx-select>
      </emqx-form-item>
    </emqx-form>
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
import { computed, defineEmits, defineProps, nextTick, PropType, ref, watch } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElDialog } from 'element-plus'
import { DriverItem } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { updateDriver } from '@/api/config'
import { useI18n } from 'vue-i18n'
import { usePluginList } from '@/composables/config/useDriverDialog'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  type: {
    type: Number as PropType<DriverDirection>,
    required: true,
  },
  node: {
    type: Object as PropType<DriverItem>,
  },
})
const emit = defineEmits(['update:modelValue', 'submitted'])

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

const { t } = useI18n()
const formData = ref({
  type: 1,
  name: '',
  plugin_name: '',
})
const formCom = ref()
const formRules = {
  plugin_name: [{ required: true, message: t('config.pluginRequired') }],
}

watch(showDialog, async (val) => {
  if (val && props.node) {
    formData.value = {
      type: props.type,
      name: props.node.name,
      plugin_name: '',
    }
    await nextTick()
    formCom.value.$refs.form.clearValidate()
  }
})

const { pluginList } = usePluginList(props.type)
const isSubmitting = ref(false)
const submit = async () => {
  await formCom.value.validate()
  await updateDriver(formData.value)
  EmqxMessage.success(t('common.submitSuccess'))
  showDialog.value = false
  emit('submitted')
}
</script>
