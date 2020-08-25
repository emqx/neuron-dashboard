<template>
  <div class="login-page">
    <div class="form-group">
      <el-card>
        <el-row>
          <el-col :span="12">
            <img class="login-bg" src="@/assets/login-neuron.png" alt="login-neuron" />
          </el-col>
          <el-col :span="12">
            <el-form :model="formLogin" :rules="rules" ref="loginForm">
              <div class="logo-group">
                <img class="neuron-logo" src="@/assets/neuron-logo.png" alt="neuron logo" />
              </div>
              <el-form-item prop="username">
                <el-input type="text" v-model="formLogin.username" placeholder="Username"> </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="formLogin.password" placeholder="Password"> </el-input>
              </el-form-item>
              <div class="button-login">
                <el-button @click="submit" type="primary">Login</el-button>
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
  background-color: #272a33;
  height: 100%;
  position: relative;
  // logo
  .logo-group {
    text-align: center;
    margin-bottom: $margin + 20px;
  }
  // 登陆表单
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
      background: #333844;
      border-radius: 8px;
      border: none;
      .login-bg {
        width: 500px;
        position: relative;
        top: -49px;
        left: -19px;
      }
      box-shadow: 0 0 8px 0 #2f2f2f, 0 2px 4px 0 #191919;
      padding: 2 * $margin 0;
      .el-form {
        padding: 0 20px;
      }
      .el-input__inner {
        border-radius: 0px;
        border-top: none;
        border-left: none;
        border-right: none;
      }
    }
    // 登陆按钮
    .button-login {
      button {
        width: 100%;
        box-shadow: 3px 3px 6px 0px #00b1738c;
      }
      margin-top: $margin + 20px;
      text-align: center;
    }
  }
}
</style>
