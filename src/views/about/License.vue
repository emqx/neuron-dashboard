<template>
  <emqx-card v-emqx-loading="isDataLoading">
    <div class="card-hd-with-btn">
      <h3 class="card-title">License</h3>
    </div>
    <div class="license">
      <emqx-descriptions v-if="hasLicense" :column="1">
        <emqx-descriptions-item :label="$t('admin.licenseType')">
          {{ licenseData.license_type }}
        </emqx-descriptions-item>
        <emqx-descriptions-item :label="$t('admin.licenseStatus')">
          {{ licenseStatus }}
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
      <div class="msg" :class="{ 'align-center': !hasLicense }">
        <img v-if="!hasLicense" :src="require('@/assets/images/license.png')" width="400">
        <div class="method-text">
          <p v-if="!hasLicense">{{ $t('admin.licensePlaceholder') }}</p>
          <p v-else>{{ $t('admin.howToGetTheCertificate') }}</p>
          <p>
            1.
            <i18n-t class="payload-desc" keypath="admin.getFreeLicense" tag="span">
              <a :href="licenseLink" target="_blank">{{ $t('admin.apply') }}</a>
            </i18n-t>
          </p>
          <p>
            2.
            <i18n-t class="payload-desc" keypath="admin.buyLicense" tag="span">
              <a :href="contactLink" target="_blank">{{ $t('admin.contactUs') }}</a>
            </i18n-t>
          </p>
        </div>
        <emqx-upload class="file-upload" :show-file-list="false" :before-upload="handleUpload">
          <emqx-button size="small" type="primary" class="btn-upload">
            {{ hasLicense ? t('common.reUpload') : t('common.upload') }}
          </emqx-button>
        </emqx-upload>
      </div>
    </div>
  </emqx-card>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import { License } from '@/types/admin'
import { queryLicense, uploadLicense } from '@/api/admin'
import useUploadFileAndRead from '@/composables/config/useUploadFileAndRead'

const { t, locale } = useI18n()
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

const licenseLink = computed(() => `https://www.emqx.com/${locale.value}/apply-licenses/neuron`)

const contactLink = computed(() => `https://www.emqx.com/${locale.value}/contact?product=neuron`)

const getLicense = async () => {
  try {
    const { data } = await queryLicense()
    const { error, ...license } = data
    licenseData.value = license
  } catch (error) {
    console.error(error)
  }
}

const licenseStatus = computed(() => {
  if (!licenseData.value) {
    return ''
  }
  const { valid_since, valid_until } = licenseData.value
  const startTime = new Date(valid_since).getTime()
  const endTime = new Date(valid_until).getTime()
  const now = Date.now()
  if (startTime > now) {
    return t('admin.notYetValid')
  }
  if (now > endTime) {
    return t('admin.expired')
  }
  return t('admin.inEffect')
})

const { readFile } = useUploadFileAndRead()
const handleUpload = async (file: any) => {
  try {
    const content: string = (await readFile(file)) as string
    await uploadLicense(content)
    EmqxMessage.success(t('admin.uploadSuccessful'))
    getLicense()
  } catch (error) {
    console.error(error)
  }
  return Promise.reject()
}

getLicense()
</script>

<style lang="scss" scoped>
.license {
  padding-bottom: 100px;
}
.placeholder {
  padding: 48px;
  text-align: center;
}
.msg.align-center {
  text-align: center;
}
.method-text {
  color: #bcbcbc;
  margin: 32px 0;
  > p {
    margin: 12px;
    margin-right: 0;
    margin-left: 0;
    a {
      margin: 0 2px;
      text-decoration: none;
      color: #459bf7;
    }
  }
}
</style>
