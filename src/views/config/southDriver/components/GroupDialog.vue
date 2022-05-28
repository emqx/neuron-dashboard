<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog"
    :title="!!group ? $t('config.viewGroup') : $t('config.createGroup')"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="groupForm" :rules="groupFormRules">
      <emqx-form-item prop="name" :label="$t('config.groupName')" required>
        <emqx-input v-model.trim="groupForm.name" :disabled="group" />
      </emqx-form-item>
      <emqx-form-item prop="interval" label="Interval" required>
        <emqx-input v-model.number="groupForm.interval" :disabled="group">
          <template #append>ms</template>
        </emqx-input>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <template v-if="!group">
          <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">
            {{ $t('common.create') }}
          </emqx-button>
          <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
        </template>
        <emqx-button v-else type="primary" size="small" @click="showDialog = false" :loading="isSubmitting">
          {{ $t('common.close') }}
        </emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, ref, watch, nextTick, PropType } from 'vue'
import { ElDialog } from 'element-plus'
import useAddGroup from '@/composables/config/useAddGroup'
import { GroupForm } from '@/types/config'

const emit = defineEmits(['update:modelValue', 'submitted'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentNode: {
    type: Number,
  },
  group: {
    type: Object as PropType<GroupForm>,
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
    resetFields()
    initForm()
  } else {
    if (props.group) {
      groupForm.value = props.group
    } else if (props.currentNode) {
      groupForm.value.node_id = props.currentNode
    }
  }
})

const submit = async () => {
  try {
    await submitForm(props.group)
    emit('submitted')
    showDialog.value = false
  } catch (error) {
    console.error(error)
  }
}
</script>
