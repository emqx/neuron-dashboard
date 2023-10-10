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
  const isLicenseInvalid = ref(false)
  const isHardwareMismatch = ref(false)
  const isOverMaximumTags = ref(false)
  const isDefaultLicense = ref(false)

  const checkLicense = async () => {
    try {
      const { data } = await queryLicense()
      licenseData.value = data

      const isShowTip = Cookies.get('licenseTipVisible')

      if (isShowTip !== 'false') {
        const { error, valid_until, license_type, max_nodes } = data

        isHasLicense.value = !(Number(error) === 2400) //  no License
        isLicenseInvalid.value = Number(error) === 2401 // Invalid
        isLicenseExpiry.value = Number(error) === 2402 // expired
        isOverMaximumTags.value = Number(error) === 2405 // over Maximum Tags
        isHardwareMismatch.value = Number(error) === 2406 // hardware mismatch

        isLicenseReadyExpiry.value = new Date(valid_until).getTime() - 1000 * 60 * 60 * 24 * 3 < Date.now()
        isDefaultLicense.value = license_type === 'trial' && max_nodes === 30 // default license

        if (
          !isHasLicense.value ||
          isLicenseInvalid.value ||
          isLicenseExpiry.value ||
          isHardwareMismatch.value ||
          isOverMaximumTags.value ||
          isLicenseReadyExpiry.value ||
          isDefaultLicense
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
    isLicenseInvalid,
    isLicenseExpiry,
    isLicenseReadyExpiry,
    isHardwareMismatch,
    isOverMaximumTags,
    isDefaultLicense,
  }
}
