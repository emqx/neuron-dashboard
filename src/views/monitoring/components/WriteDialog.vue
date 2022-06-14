<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog write-dialog"
    :title="dialogTitle"
    :z-index="2000"
  >
    <emqx-form @keyup.enter="submitData" @submit.prevent>
      <emqx-form-item :error="inputErrorMsg">
        <template #label>
          <div class="common-flex">
            <span>{{ $t('data.value') }}</span>
            <div v-if="showToggleHexadecimalSwitch">
              <label>{{ $t('data.useHexadecimalInput') }}</label>
              <emqx-switch v-model="isUseHexadecimal" @change="handleIsUseHexadecimalChanged" />
            </div>
          </div>
        </template>
        <emqx-input v-if="tag.type !== TagType.BOOL" v-model.trim="inputValue" @blur="validate" />
        <emqx-radio-group v-else v-model="inputValue">
          <emqx-radio :label="true">True</emqx-radio>
          <emqx-radio :label="false">False</emqx-radio>
        </emqx-radio-group>
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submitData" :loading="isSubmitting">{{
          $t('common.submit')
        }}</emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, PropType, watch, ref } from 'vue'
import { ElDialog } from 'element-plus'
import { TagDataInTable } from '@/composables/data/useDataMonitoring'
import { TagType } from '@/types/enums'
import useWriteDataDialog, { Group } from '@/composables/data/useWriteDataDialog'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  group: {
    type: String,
  },
  tag: {
    type: Object as PropType<TagDataInTable>,
  },
  nodeName: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue', 'updated'])

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})
const dialogTitle = computed(() => props.tag?.tagName)

const {
  inputErrorMsg,
  inputValue,
  isUseHexadecimal,
  isSubmitting,

  showToggleHexadecimalSwitch,

  handleIsUseHexadecimalChanged,
  validate,
  submit,
} = useWriteDataDialog(props)

watch(showDialog, (val) => {
  if (val) {
    if (!props.group || !props.tag) {
      return
    }
    inputValue.value = props.tag.value
  } else {
    inputErrorMsg.value = ''
    isUseHexadecimal.value = false
  }
})
const submitData = async () => {
  await submit()
  emit('updated')
  showDialog.value = false
}
</script>

<style lang="scss">
.write-dialog {
  .el-form-item__label {
    position: relative;
    z-index: 1;
    width: 100%;
  }
  .el-radio-group {
    width: 100%;
    .el-radio {
      width: 100px;
    }
  }
}
</style>
