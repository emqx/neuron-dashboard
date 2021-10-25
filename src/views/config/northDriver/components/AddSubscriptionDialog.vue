<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="$t('config.addSubscription')"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="subscriptionForm" :rules="rules">
      <emqx-form-item prop="src_node_id" :label="$t('config.southDevice')">
        <emqx-select v-model="subscriptionForm.src_node_id" @change="selectedNodeChanged">
          <emqx-option v-for="item in deviceList" :key="item.id" :value="item.id" :label="item.name" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="name" label="Group">
        <emqx-select v-model="subscriptionForm.name">
          <emqx-option v-for="item in groupList" :key="item.name" :value="item.name" :label="item.name" />
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
import { computed, defineProps, defineEmits, watch } from 'vue'
import { useAddSubscription } from '@/composables/config/useSubscription'
import { ElDialog } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentNodeId: {
    type: Number,
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
