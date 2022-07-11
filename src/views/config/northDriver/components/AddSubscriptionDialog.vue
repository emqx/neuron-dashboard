<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="$t('config.addSubscription')"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="subscriptionForm" :rules="rules">
      <emqx-form-item prop="driver" :label="$t('config.southDevice')">
        <emqx-select v-model="subscriptionForm.driver" @change="selectedNodeChanged" filterable>
          <emqx-option v-for="{ name } in deviceList" :key="name" :value="name" :label="name" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="group" label="Group">
        <emqx-select v-model="subscriptionForm.group" filterable>
          <emqx-option v-for="{ name } in groupList" :key="name" :value="name" :label="name" />
        </emqx-select>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">
          {{ $t('common.submit') }}
        </emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, watch } from 'vue'
import { useAddSubscription } from '@/composables/config/useSubscription'
import { ElDialog } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentNode: {
    type: String,
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
const {
  formCom,
  rules,
  subscriptionForm,
  deviceList,
  groupList,
  isSubmitting,

  initForm,
  selectedNodeChanged,
  submitData,
} = useAddSubscription(props)

const submit = async () => {
  await submitData()
  showDialog.value = false
  emit('submitted')
}

watch(showDialog, (val) => {
  if (val) {
    initForm()
  }
})
</script>
