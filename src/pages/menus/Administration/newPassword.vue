<template>
  <Container type="card-full" :scorll="false">
    <div class="dd-title dd-mb">{{ $t('common.newPassword') }}</div>
    <emqx-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="150px" label-position="left">
      <emqx-form-item prop="password" :label="$t('common.password')">
        <emqx-input v-model="passwordForm.password" show-password style="width: 300px" />
      </emqx-form-item>
      <emqx-form-item prop="newPassword" :label="$t('common.newPassword')">
        <emqx-input v-model="passwordForm.newPassword" show-password style="width: 300px" />
      </emqx-form-item>
      <emqx-form-item prop="reNewPassword" :label="$t('common.reNewPassword')">
        <emqx-input v-model="passwordForm.reNewPassword" show-password style="width: 300px" />
      </emqx-form-item>
      <emqx-form-item>
        <emqx-button @click="submit">{{ $t('common.submit') }}</emqx-button>
      </emqx-form-item>
    </emqx-form>
  </Container>
</template>

<script>
import Container from '@/components/core/Container/index.vue'
export default {
  components: {
    Container,
  },
  data() {
    return {
      passwordForm: {
        password: '',
        newPassword: '',
        reNewPassword: '',
      },
      rules: {
        password: [{ required: true, message: '', trigger: 'blur' }],
        newPassword: [{ required: true, message: '', trigger: 'blur' }],
        reNewPassword: [{ required: true, message: '', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          const { password, newPassword, reNewPassword } = this.passwordForm
          const { name } = JSON.parse(sessionStorage.getItem('user'))
          if (newPassword !== reNewPassword) {
            this.$openMessage.error('error password')
            return false
          }
          this.$ws().set({ success: this.setPassword }).send({ func: 12, name, pass: password, npwd: newPassword })
        } else {
          return false
        }
      })
    },
    setPassword(data) {
      if (data.func === 12) {
        this.$ws().remove(this.setPassword)
        if (!data.errc) {
          this.$openMessage.success(this.$t('administration.loginAgain'))
          this.$ws().close()
          this.$router.push({
            name: 'login',
          })
        }
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
