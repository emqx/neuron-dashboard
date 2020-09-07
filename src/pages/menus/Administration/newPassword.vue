<template>
  <Container type="card-full" :scorll="false">
    <div class="dd-title dd-mb">{{ $t('common.newPassword') }}</div>
    <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="150px" label-position="left">
      <el-form-item prop="password" :label="$t('common.password')">
        <el-input v-model="passwordForm.password" show-password style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item prop="newPassword" :label="$t('common.newPassword')">
        <el-input v-model="passwordForm.newPassword" show-password style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item prop="reNewPassword" :label="$t('common.reNewPassword')">
        <el-input v-model="passwordForm.reNewPassword" show-password style="width: 300px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </Container>
</template>

<script>
export default {
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
          this.$openMessage.success('success')
        }
        console.log(data)
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
