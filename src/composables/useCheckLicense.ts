import type { Ref } from 'vue'
import { ref } from 'vue'
import { queryLicense } from '@/api/admin'
import type { License } from '@/types/admin'
import Cookies from 'js-cookie'

export default () => {
  // currently unused
  const licenseData: Ref<License | undefined> = ref(undefined)

  const licenseTipVisible = ref(false)
  const isHasLicense = ref(false)
  const isLicenseExpiry = ref(false)
  const isLicenseReadyExpiry = ref(false)
  const isTrialLicense = ref(false)
  const isLicenseInvalid = ref(false)
  const isHardwareMismatch = ref(false)
  const isOverMaximumTags = ref(false)
  const isOverMaximumNodes = ref(false)

  const checkLicense = async () => {
    try {
      const { data } = await queryLicense()
      licenseData.value = data

      const isShowTip = Cookies.get('licenseTipVisible')

      if (isShowTip !== 'false') {
        const { error, valid_until, license_type } = data

        isHasLicense.value = !(Number(error) === 2400) //  no License
        isLicenseInvalid.value = Number(error) === 2401 // Invalid
        isLicenseExpiry.value = Number(error) === 2402 // expired
        isOverMaximumNodes.value = Number(error) === 2404 // over Maximum nodes
        isOverMaximumTags.value = Number(error) === 2405 // over Maximum Tags
        isHardwareMismatch.value = Number(error) === 2406 // hardware mismatch

        isTrialLicense.value = license_type === 'trial' // trial license
        isLicenseReadyExpiry.value = new Date(valid_until).getTime() - 1000 * 60 * 60 * 24 * 3 < Date.now()

        if (
          !isHasLicense.value ||
          isLicenseInvalid.value ||
          isLicenseExpiry.value ||
          isHardwareMismatch.value ||
          isOverMaximumNodes.value ||
          isOverMaximumTags.value ||
          isLicenseReadyExpiry.value
        ) {
          licenseTipVisible.value = true
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    checkLicense,

    licenseTipVisible,
    isHasLicense,
    isTrialLicense,
    isLicenseInvalid,
    isLicenseExpiry,
    isLicenseReadyExpiry,
    isHardwareMismatch,
    isOverMaximumNodes,
    isOverMaximumTags,
  }
}
