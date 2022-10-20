<template>
  <emqx-card class="about">
    <div class="card-hd-with-btn">
      <h3 class="card-title">{{ $t('common.changePassword') }}</h3>
    </div>
    <emqx-form ref="formRef" :model="formData" :rules="rules" class="pw-form" @submit.prevent>
      <emqx-form-item prop="oldPass" :label="$t('common.oldPassword')" required>
        <emqx-input v-model.trim="formData.oldPass" />
      </emqx-form-item>
      <emqx-form-item prop="newPass" :label="$t('common.newPassword')" required>
        <emqx-input v-model.trim="formData.newPass" type="password" :placeholder="$t('common.password')" />
      </emqx-form-item>
      <emqx-form-item prop="newPassConfirm" :label="$t('common.confirmPassword')" required>
        <emqx-input v-model.trim="formData.newPassConfirm" type="password" :placeholder="$t('common.password')" />
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
import { reactive, ref, toRefs, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { changePassword } from '@/api/common'
import { EmqxMessage } from '@emqx/emqx-ui'
import { createCommonErrorMessage } from '@/utils/utils'

const { t } = useI18n()

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
  const { newPassConfirm } = formState.formData

  if (!newPassConfirm || (newPassConfirm && isNewPassMatch.value)) {
    if (newPassConfirm) {
      const { form } = formRef.value
      form.validateField(['newPassConfirm'])
    }
    callback()
  } else {
    callback(new Error(`${t('common.notmatch')}`))
  }
}

const checkNewPassConfirmMatch = (rule: any, value: string, callback: any) => {
  const { form } = formRef.value
  if (isNewPassMatch.value) {
    form.validateField(['newPass'])
    callback()
  } else {
    callback(new Error(`${t('common.notmatch')}`))
  }
}

const rules = {
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

const changeUserPassword = async () => {
  try {
    isSubmitting.value = true
    const { name, oldPass: old_pass, newPass: new_pass } = formState.formData
    await changePassword({ name, old_pass, new_pass })
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
}
</style>
