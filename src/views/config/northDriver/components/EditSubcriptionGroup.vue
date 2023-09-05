<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="common-dialog"
    :title="$t(`${dialogTitle}`)"
    :z-index="2000"
  >
    <emqx-form ref="formRef" :model="groupForm" :rules="rules">
      <emqx-form-item prop="driver" :label="$t('config.southDevice')" required>
        <DriverListSelector
          v-model.trim="groupForm.driver"
          :type="DriverDirection.South"
          :width="'100%'"
          disabled
          @change="changeDriver"
        />
      </emqx-form-item>
      <emqx-form-item prop="group" :label="$t('config.group')" required>
        <GroupListSelector v-model="groupForm.group" :driver="groupForm.driver" :width="'100%'" disabled />
      </emqx-form-item>

      <!-- mqtt -->
      <emqx-form-item v-if="isMQTTPugin" prop="params.topic" :label="$t('config.topic')">
        <emqx-input v-model="groupForm.params.topic" />
      </emqx-form-item>

      <!-- gewu -->
      <emqx-form-item v-if="isGewuPugin" prop="params.productKey" label="productKey">
        <emqx-input v-model="groupForm.params.productKey" />
      </emqx-form-item>
    </emqx-form>

    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" :loading="isSubmitting" @click="submit">
          {{ $t(`${confirmBtnText}`) }}
        </emqx-button>
        <emqx-button size="small" @click="close">
          {{ $t('common.cancel') }}
        </emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, nextTick, watch } from 'vue'
import type { PropType } from 'vue'
// import { useI18n } from 'vue-i18n'
import { ElDialog } from 'element-plus'
import DriverListSelector from '../../components/DriverListSelector.vue'
import GroupListSelector from '../../components/GroupListSelector.vue'
import type { SubscriptionData } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { useDriverInfo } from '@/composables/config/useDriver'
import { useSubscriptionGroup } from '@/composables/config/useSubscription'

const createRawForm = (): SubscriptionData => ({
  app: '',
  driver: '',
  group: '',
  params: {
    topic: undefined,
    productKey: undefined,
  },
})

const emit = defineEmits(['update:modelValue', 'update:dialogVisible', 'submitted', 'close'])
const props = defineProps({
  modelValue: {
    type: Object as PropType<SubscriptionData>,
    default: () => {
      return { group: '', interval: null }
    },
  },
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  isEdit: { type: Boolean, deafult: false },
  isSubmitting: { type: Boolean, deafult: false },
})

const { isMQTTPugin, isGewuPugin } = useDriverInfo()

const formRef = ref()
const groupForm = computed({
  get: () => props.modelValue,
  set: (val: SubscriptionData) => {
    emit('update:modelValue', val)
  },
})

const { rules } = useSubscriptionGroup()

const dialogTitle = computed(() => {
  const title = props.isEdit ? 'config.editGroup' : 'config.createGroup'
  return title
})
const confirmBtnText = computed(() => {
  return !props.isEdit ? 'common.create' : 'common.submit'
})

const showDialog = computed({
  get: () => props.dialogVisible,
  set: (val: boolean) => {
    emit('update:dialogVisible', val)
  },
})

watch(showDialog, async (val) => {
  nextTick(() => {
    formRef.value.form.clearValidate()
  })
  if (!val) {
    resetFields()
    initForm()
  }
})

const changeDriver = (driver: string) => {
  if (!driver) {
    groupForm.value.group = ''
  }
}

const resetFields = () => {
  formRef.value.form.resetFields()
}
const initForm = () => {
  groupForm.value = createRawForm()
}

const submit = async () => {
  // const { group, interval } = groupForm.value
  // if (props.isEdit) {
  //   groupForm.value = {
  //     group: oldGroupName.value,
  //     new_name: group,
  //     interval,
  //   }
  // }
  await formRef.value.validate()
  emit('submitted', groupForm.value)
}
const close = () => {
  showDialog.value = false
  emit('close')
}
</script>
