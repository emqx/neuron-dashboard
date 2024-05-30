<template>
  <emqx-card class="about">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('common.changePassword') }}</h3>
    </div>
    <emqx-form ref="formRef" :model="formData" :rules="rules" class="pw-form" @submit.prevent>
      <emqx-form-item prop="oldPass" :label="$t('common.oldPassword')" required>
        <emqx-input
          v-model.trim="formData.oldPass"
          type="password"
          show-password
          :placeholder="$t('common.oldPassword')"
        />
      </emqx-form-item>
      <emqx-form-item prop="newPass" :label="$t('common.newPassword')" required>
        <emqx-input
          v-model.trim="formData.newPass"
          type="password"
          show-password
          :placeholder="$t('common.newPassword')"
        />
      </emqx-form-item>
      <emqx-form-item prop="newPassConfirm" :label="$t('common.confirmPassword')" required>
        <emqx-input
          v-model.trim="formData.newPassConfirm"
          type="password"
          show-password
          :placeholder="$t('common.newPassword')"
        />
      </emqx-form-item>
    </emqx-form>

    <footer class="change-psw-footer">
      <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">
        {{ $t('common.submit') }}
      </emqx-button>
    </footer>
  </emqx-card>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { changePassword } from '@/api/common'
import { EmqxMessage } from '@emqx/emqx-ui'
import { createCommonErrorMessage, encryptStr } from '@/utils/utils'
import { useStore } from 'vuex'

const { t } = useI18n()
const store = useStore()

const formRef = ref()
const formState = reactive({
  formData: {
    name: 'admin',
    oldPass: '',
    newPass: '',
    newPassConfirm: '',
  },
  isSubmitting: false,
})
const { formData, isSubmitting } = toRefs(formState)

const isNewPassMatch = computed(() => {
  return formState.formData.newPass === formState.formData.newPassConfirm
})

const checkNewPassMatch = (rule: any, value: string, callback: any) => {
  const strongRegex = new RegExp(
    '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_+\\-=\\[\\]:;\'"<>?,./|\\\\])[a-zA-Z\\d~`!@#$%^&*()_+\\-=\\[\\]:;\'"<>?,./|\\\\]{8,20}$',
  )
  const repeatRegex = new RegExp('(.)\\1{2,}')
  const filterMeta = [
    // eslint-disable-next-line prettier/prettier
    "qwertyuiop[]\\", "asdfghjkl;'", "zxcvbnm,./", "01234567890-=", "901", "abcdefghijklmnopqrstuvwxyz"
  ]
  const filterList = [
    // eslint-disable-next-line prettier/prettier
    "qaz", "wsx", "edc", "rfv", "tgb", "yhn", "ujm", "ik,", "ol.", "p;/", "esz", "rdx",
    // eslint-disable-next-line prettier/prettier
    "tfc", "ygv", "uhb", "ijn", "okm", "pl,", "[;.", "]'/", "1qa", "2ws", "3ed", "4rf",
    // eslint-disable-next-line prettier/prettier
    "5tg", "6yh", "7uj", "8ik", "9ol", "0p;", "-['", "=[;", "-pl", "0ok", "9ij", "8uh",
    // eslint-disable-next-line prettier/prettier
    "7yg", "6tf", "5rd", "4es", "3wa", "root", "admin", "mysql", "oracle", "system",
    // eslint-disable-next-line prettier/prettier
    "windows", "linux", "java", "python", "unix", "test"
  ]
  filterMeta.forEach((item) => {
    let i
    for (i = 0; i < item.length - 2; i += 1) {
      filterList.push(item.substring(i, i + 3))
    }
  })
  const metaRegex = new RegExp(
    filterList.join('|').replace(/\\/g, '\\\\\\\\').replace(/\[/g, '\\[').replace(/\]/g, '\\]'),
    'g',
  )
  if (value && !strongRegex.test(value)) {
    callback(new Error(`${t('common.passwordStrengthTip')}`))
  }
  if (value && (repeatRegex.test(value) || value.match(metaRegex))) {
    callback(new Error(`${t('common.passwordStrengthTip')}`))
  }
  const { form } = formRef.value
  const { newPassConfirm } = formState.formData
  if (newPassConfirm) {
    form.validateField(['newPassConfirm'])
  }
}

const checkNewPassConfirmMatch = (rule: any, value: string, callback: any) => {
  if (!isNewPassMatch.value) {
    callback(new Error(`${t('common.newPassNotMatch')}`))
  }
}

const rules = computed(() => {
  return {
    oldPass: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('common.oldPassword')),
      },
    ],
    newPass: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('common.newPassword')),
      },
      {
        validator: checkNewPassMatch,
        trigger: 'blur',
      },
    ],
    newPassConfirm: [
      {
        required: true,
        message: t('common.newPassConfirmRequired'),
      },
      {
        validator: checkNewPassConfirmMatch,
        trigger: 'blur',
      },
    ],
  }
})

watch(
  () => store.state.lang,
  () => {
    nextTick(() => {
      const keys = Object.keys(formState.formData)
      keys.forEach((key: string) => {
        const value = formState.formData[key]
        if (!value) {
          formRef.value.form.clearValidate()
        } else {
          formRef.value.form.validateField(key)
        }
      })
    })
  },
)

const changeUserPassword = async () => {
  try {
    isSubmitting.value = true
    const { name, oldPass: old_pass, newPass: new_pass } = formState.formData
    await changePassword({ name, old_pass: encryptStr(old_pass), new_pass: encryptStr(new_pass) })
    EmqxMessage.success(t('common.changePwSuccessful'))
    formRef.value.resetField()
  } catch (error) {
    console.log(error)
  } finally {
    isSubmitting.value = false
  }
}

const submit = () => {
  formRef.value.validate().then((valid) => {
    if (valid) {
      changeUserPassword()
    }
  })
}
</script>

<style lang="scss" scoped>
.pw-form {
  width: 50%;
  min-width: 500px;
  :deep(.el-form-item) {
    margin-bottom: 30px;
  }
}
</style>
