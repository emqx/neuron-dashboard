<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog"
    :title="$t('config.createGroup')"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="groupForm" :rules="groupFormRules">
      {{ groupForm.group_config }}
      <emqx-form-item prop="group_config" :label="$t('config.groupName')" required>
        <emqx-input v-model="groupForm.group_config" />
      </emqx-form-item>
      <emqx-form-item prop="src_node_id" label="Node" required>
        <emqx-select v-model="groupForm.src_node_id">
          <emqx-option v-for="item in nodeList" :key="item.id" :value="item.id" :label="item.name" />
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item prop="read_interval" label="Read interval" required>
        <emqx-input v-model="groupForm.read_interval" />
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
import { computed, defineProps, defineEmits, ref, watch, nextTick } from 'vue'
import { ElDialog } from 'element-plus'
import useAddGroup from '@/composables/config/useAddGroup'

const emit = defineEmits(['update:modelValue', 'submitted'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentNode: {
    type: Number,
  },
})

const { formCom, groupForm, nodeList, isSubmitting, groupFormRules, resetFields, submitForm, initForm } = useAddGroup()

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, async (val) => {
  if (!val) {
    await nextTick()
    initForm()
  } else {
    if (props.currentNode) {
      groupForm.value.src_node_id = props.currentNode
    }
    await nextTick()
    resetFields()
  }
})

const submit = async () => {
  try {
    await submitForm()
    emit('submitted')
    showDialog.value = false
  } catch (error) {
    //
  }
}
</script>
