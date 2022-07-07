<template>
  <el-dialog v-model="showDialog" :width="500" custom-class="common-dialog" :title="$t('common.edit')" :z-index="2000">
    <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model.trim="form.name" />
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" :loading="isSubmitting" @click="submit">
          {{ $t('common.submit') }}
        </emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  defineComponent, computed, defineProps, defineEmits, ref, watch, PropType,
} from 'vue'
</script>

<script lang="ts" setup>
import { ElDialog } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { updateDriver } from '@/api/config'

export default defineComponent({
  name: 'EditNodeNameDialog',
})

const { t } = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  node: {
    type: Object as PropType<{ id: number; name: string }>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'updated'])

const form = ref({
  id: 0,
  name: '',
})
const formCom = ref()
const rules = {
  name: [{ required: true, message: t('config.nameRequired') }],
}
const isSubmitting = ref(false)

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, (val) => {
  if (!val) {
    formCom.value.resetField()
  } else {
    form.value = props.node
  }
})

const submit = async () => {
  try {
    await formCom.value.validate()
    isSubmitting.value = true
    await updateDriver(form.value)
    EmqxMessage.success(t('common.submitSuccess'))
    showDialog.value = false
    emit('updated')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
