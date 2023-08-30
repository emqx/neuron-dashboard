<template>
  <el-dialog
    v-model="showDialog"
    :width="600"
    custom-class="common-dialog"
    :title="$t('config.addSubscription')"
    :z-index="2000"
  >
    <el-alert v-if="topicWarning" :title="topicWarning" type="warning" show-icon :closable="false" />

    <emqx-form ref="formCom" :model="subscriptionForm" :rules="rules">
      <section v-if="!isSupportBatchSub">
        <emqx-form-item prop="driver" :label="$t('config.southDevice')">
          <emqx-select
            v-model="subscriptionForm.driver"
            filterable
            :placeholder="$t('common.pleaseSelect')"
            @change="selectedNodeChanged"
          >
            <emqx-option v-for="{ name } in deviceList" :key="name" :value="name" :label="name" />
          </emqx-select>
        </emqx-form-item>
        <emqx-form-item prop="group" :label="$t('config.group')">
          <emqx-select v-model="subscriptionForm.group" filterable :placeholder="$t('common.pleaseSelect')">
            <emqx-option v-for="{ name } in groupList" :key="name" :value="name" :label="name" />
          </emqx-select>
        </emqx-form-item>
      </section>

      <!-- mqtt -->
      <emqx-form-item v-if="isMQTTPugin" prop="topic" :label="$t('config.topic')">
        <emqx-input v-model="subscriptionForm.topic" />
      </emqx-form-item>

      <!-- gewu -->
      <emqx-form-item v-if="isGewuPugin" prop="productKey" label="productKey">
        <emqx-input v-model="subscriptionForm.productKey" />
      </emqx-form-item>

      <emqx-form-item v-if="isSupportBatchSub" prop="driverGroups" :label="$t('config.subscribeSouthDriverData')">
        <SouthGroupsCheckbox v-model="subscriptionForm.driverGroups" />
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
import { ElDialog, ElAlert } from 'element-plus'
import { useAddSubscription } from '@/composables/config/useSubscription'
import { useDriverInfo } from '@/composables/config/useDriver'
import SouthGroupsCheckbox from '@/views/config/components/SouthGroupsCheckbox.vue'

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
  topicWarning,
  subscriptionForm,
  deviceList,
  groupList,
  isSubmitting,

  initForm,
  selectedNodeChanged,
  submitData,
} = useAddSubscription(props)

const { isMQTTPugin, isGewuPugin, isSupportBatchSub } = useDriverInfo()

const submit = async () => {
  await submitData()
  showDialog.value = false
  emit('submitted')
}

watch(showDialog, (val) => {
  if (val) {
    initForm()
  } else {
    formCom.value.resetField()
    groupList.value = []
  }
})
</script>

<style lang="scss" scoped>
:deep {
  .auto-selector {
    display: block;
    width: 100%;
  }
}
</style>
