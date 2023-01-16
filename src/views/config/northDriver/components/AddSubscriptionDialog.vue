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
        <AutoKeywordSearchInput
          v-if="isMQTTPugin(nodePlugin(currentNode))"
          v-model="subscriptionForm.driver"
          :all-search-data="deviceList"
          :getKeywordListFunc="filterSouthNodesByKeyword"
          :trigger-on-focus="true"
          :placeholder="$t('config.searchSouthDevicePlaceholder')"
          class="auto-selector"
          @select="autoSelectedNodeChanged"
          @enter="autoSelectedNodeChanged"
          @input="autoSelectedNodeChanged"
          @clear="autoSelectedNodeChanged"
        >
          <template v-slot:content="{ item }">
            <div class="item title">{{ item.name }}</div>
          </template>
        </AutoKeywordSearchInput>
        <emqx-select v-else v-model="subscriptionForm.driver" @change="selectedNodeChanged" filterable>
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
import AutoKeywordSearchInput from '@/components/AutoKeywordSearchInput.vue'
import useNorthDriver from '@/composables/config/useNorthDriver'

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
  filterSouthNodesByKeyword,
  groupList,
  isSubmitting,

  initForm,
  selectedNodeChanged,
  autoSelectedNodeChanged,
  submitData,
} = useAddSubscription(props)

const { isMQTTPugin, nodePlugin } = useNorthDriver()

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

<style lang="scss" scoped>
:deep {
  .auto-selector {
    display: block;
    width: 100%;
  }
}
</style>
