<template>
  <el-dialog
    v-model="showDialog"
    :width="500"
    custom-class="license-tip-dialog"
    :show-close="false"
    :title="''"
    :z-index="2000"
  >
    <span class="tip-text">
      <!-- No License -->
      <span v-if="!isHasLicense" v-html="$t('admin.licenseEvaluationTip')" />

      <!-- License-->
      <span v-else-if="isHasLicense">
        <!-- Invalid -->
        <span v-if="isLicenseInvalid" v-html="$t('admin.licenseInvalidTip')" />
        <!-- Expired  -->
        <span v-else-if="isLicenseExpiry" v-html="$t('admin.licenseExpiryTip')" />
        <!--  Over Maximum Nodes-->
        <span v-else-if="isOverMaximumNodes" v-html="$t('admin.licenseOverMaximumNodesTip')" />
        <!--  Over Maximum Tags-->
        <span v-else-if="isOverMaximumTags" v-html="$t('admin.licenseOverMaximumTagsTip')" />
        <!--  Hardware Mismatch-->
        <span v-else-if="isHardwareMismatch" v-html="$t('admin.licenseHardwareMismatchTip')" />
        <!-- Ready Expiry -->
        <span v-else-if="isLicenseReadyExpiry" v-html="$t('admin.licenseReadyExpiryTip')" />
      </span>
    </span>

    <template #footer>
      <span class="dialog-footer">
        <el-checkbox v-model="noPrompt" :label="$t('admin.noPrompt')" class="no-prompt" />
        <emqx-button type="primary" size="small" @click="submit">
          {{ $t('admin.konw') }}
        </emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { ElDialog, ElCheckbox } from 'element-plus'
import Cookies from 'js-cookie'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  isHasLicense: { type: Boolean, default: false },
  isLicenseInvalid: { type: Boolean, default: false },
  isLicenseExpiry: { type: Boolean, default: false },
  isLicenseReadyExpiry: { type: Boolean, default: false },
  isHardwareMismatch: { type: Boolean, default: false },
  isOverMaximumNodes: { type: Boolean, default: false },
  isOverMaximumTags: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'submitted'])

const noPrompt = ref(false)

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

const submit = async () => {
  if (noPrompt.value) {
    Cookies.set('licenseTipVisible', 'false', { expires: 3 })
  } else {
    Cookies.set('licenseTipVisible', 'false')
  }
  showDialog.value = false
  emit('submitted')
}
</script>

<style lang="scss">
.license-tip-dialog .el-dialog__body {
  padding: 0px 20px 20px;
}
</style>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.mode-radio-group {
  width: 100%;
}

.tip-text {
  word-break: break-word;
}
:deep {
  a {
    color: #189bfe;
  }
}

.dialog-footer {
  @include display-flex(space-between);
}
.no-prompt {
  color: #8d8d8d;
  font-weight: 400;
  :deep(.el-checkbox__input.is-checked + .el-checkbox__label) {
    color: #8d8d8d;
  }
}
</style>
