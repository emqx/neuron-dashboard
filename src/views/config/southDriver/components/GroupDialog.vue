<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog"
    :title="$t(`${dialogTitle}`)"
    :z-index="2000"
  >
    <emqx-form ref="formCom" :model="groupForm" :rules="groupFormRules">
      <emqx-form-item prop="group" :label="$t('config.groupName')" required>
        <emqx-input v-model.trim="groupForm.group" />
      </emqx-form-item>
      <emqx-form-item prop="interval" :label="$t('config.interval')" required>
        <emqx-input v-model.number="groupForm.interval" :disabled="group && !isEdit">
          <template #append>ms</template>
        </emqx-input>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <!-- create | edit -->
        <template v-if="!group || (group && isEdit)">
          <emqx-button type="primary" size="small" :loading="isSubmitting" @click="submit">
            {{ $t(`${confirmBtnText}`) }}
          </emqx-button>
          <emqx-button v-if="!group || (group && isEdit)" size="small" @click="showDialog = false">
            {{ $t('common.cancel') }}
          </emqx-button>
        </template>
        <!-- view -->
        <emqx-button v-else type="primary" size="small" @click="showDialog = false" :loading="isSubmitting">
          {{ $t('common.close') }}
        </emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps, defineEmits, watch, nextTick } from 'vue'
import { ElDialog } from 'element-plus'
import useAddGroup from '@/composables/config/useAddGroup'
import type { GroupForm } from '@/types/config'

const emit = defineEmits(['update:modelValue', 'submitted'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  currentNode: {
    type: String,
  },
  group: {
    type: Object as PropType<GroupForm>,
  },
  isEdit: { type: Boolean, deafult: false },
})

const { formCom, groupForm, isSubmitting, groupFormRules, resetFields, submitForm, initForm, getPluginConfigInfo } =
  useAddGroup()

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

const dialogTitle = computed(() => {
  if (!props.group) return 'config.createGroup'
  const title = props.isEdit ? 'config.editGroup' : 'config.viewGroup'
  return title
})
const confirmBtnText = computed(() => {
  return !props.group ? 'common.create' : 'common.submit'
})

watch(showDialog, async (val) => {
  nextTick(() => {
    formCom.value.form.clearValidate()
  })
  if (!val) {
    resetFields()
    initForm()
  } else if (props.group) {
    // edit group
    groupForm.value = props.group
  } else if (props.currentNode) {
    // create group
    groupForm.value.node = props.currentNode
    getPluginConfigInfo()
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
