<template>
  <div class="login-page">
    <div class="form-group">
      <el-card>
        <el-row>
          <el-col :span="12">
            <div class="login-bg-container">
              <img class="login-bg" src="@/assets/login-neuron.png" alt="login-neuron" />
            </div>
          </el-col>
          <el-col :span="12">
            <el-form :model="formLogin" :rules="rules" ref="loginForm">
              <div class="logo-group">
                <img class="neuron-logo" src="@/assets/neuron-logo-white.png" alt="neuron logo" width="160" />
              </div>
              <el-form-item prop="username">
                <el-input type="text" v-model="formLogin.username" :placeholder="$t('common.username')"> </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="formLogin.password" :placeholder="$t('common.password')"> </el-input>
              </el-form-item>
              <div class="button-login">
                <el-button @click="submit" type="primary">{{ $t('common.login') }}</el-button>
              </div>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
      },
      rules: {
        username: { required: true, trigger: 'blur' },
        password: { required: true, trigger: 'blur' },
      },
    }
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const { username: name, password: pass } = this.formLogin
          const loginInfo = {
            func: 10,
            name,
            pass,
          }
          this.$ws(loginInfo)
            .connect()
            .then((userInfo) => {
              sessionStorage.setItem('user', JSON.stringify(userInfo))
              this.$router.push({ name: 'index' })
            })
        } else {
          return false
        }
      })
    },
    init() {
      sessionStorage.removeItem('user')
      localStorage.removeItem('chnl')
      localStorage.removeItem('objectData')
      localStorage.removeItem('eventData')
      this.$store.commit('clearAlarmList')
    },
  },
  mounted() {
    this.init()
  },
  created() {
    if (this.$env) {
      this.formLogin = {
        username: 'admin',
        password: '0000',
      }
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/style/public.scss';
.login-page {
  background-color: #f4f9fc;
  height: 100%;
  position: relative;
  // logo
  .logo-group {
    text-align: center;
    margin-bottom: $margin + 20px;
  }

  .el-card__body {
    padding: 0;
  }
  .form-group {
    width: 600px;
    // 重新设置卡片
    .el-card {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 790px;
      height: 390px;
      background: #fff;
      border-radius: 8px;
      border: none;
      .login-bg-container {
        overflow: hidden;
        width: 360px;
        background-color: #0c283e;
      }
      .login-bg {
        width: 360px;
      }
      box-shadow: 0px 2px 4px 0px rgba(12, 40, 62, 0.09);
      .el-form {
        padding: 2 * $margin 20px;
      }
      .el-input__inner {
        border-radius: 0px;
        border-top: none;
        border-left: none;
        border-right: none;
      }
    }
    .button-login {
      button {
        width: 100%;
        box-shadow: 0px 10px 18px -6px #189bfe;
      }
      margin-top: $margin + 20px;
      text-align: center;
    }
  }
}
</style>
