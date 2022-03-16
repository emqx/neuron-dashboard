<template>
  <emqx-card v-emqx-loading="isDataLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">License</h3>
    </div>
    <div class="license">
      <emqx-descriptions :column="1" v-if="hasLicense">
        <emqx-descriptions-item :label="$t('admin.licenseType')">
          {{ licenseData.license_type }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.licenseStatus')">
          {{ licenseData.valid }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.effectiveDate')">
          {{ licenseData.valid_since }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.expireDate')">
          {{ licenseData.valid_until }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.maxNodes')">
          {{ licenseData.max_nodes }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.maxNodeTags')">
          {{ licenseData.max_node_tags }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.enabledPlugins')">
          {{ pluginsStr }}
        </emqx-descriptions-item>
      </emqx-descriptions>
      <div class="placeholder" v-else>
        <img :src="require('@/assets/images/license.png')" width="400" />
        <p class="placeholder-text">{{ $t('admin.licensePlaceholder') }}</p>
        <emqx-upload class="file-upload" :show-file-list="false" :before-upload="handleUpload">
          <emqx-button size="mini">{{ t('common.uploadFile') }}</emqx-button>
        </emqx-upload>
      </div>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { License } from '@/types/admin'
import { queryLicense, uploadLicense } from '@/api/admin'
import useUploadFileAndRead from '@/composables/config/useUploadFileAndRead'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isDataLoading = ref(false)
const licenseData: Ref<License | undefined> = ref(undefined)

const hasLicense = computed(() => !!licenseData.value)

const pluginsStr = computed(() => {
  const { enabled_plugins } = licenseData.value || {}
  if (enabled_plugins && Array.isArray(enabled_plugins)) {
    return enabled_plugins.join(', ')
  }
  return ''
})

const getLicense = async () => {
  try {
    const { data } = await queryLicense()
    const { error, ...license } = data
    licenseData.value = license
  } catch (error) {
    console.error(error)
  }
}

const { readFile } = useUploadFileAndRead()
const handleUpload = async (file: any) => {
  try {
    const content: string = await readFile(file)
    await uploadLicense(content)
    EmqxMessage.success(t('admin.uploadSuccessful'))
    getLicense()
  } catch (error) {
    console.error(error)
  }
}

getLicense()
</script>

<style lang="scss" scoped>
.placeholder {
  padding: 48px;
  text-align: center;
}
.placeholder-text {
  color: #bcbcbc;
  margin: 32px 0;
}
</style>
