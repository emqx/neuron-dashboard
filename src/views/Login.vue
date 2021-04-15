<template>
  <div class="login-page">
    <div class="container">
      <emqx-card>
        <emqx-input v-model="userName" type="text" placeholder="Username" />
        <emqx-input v-model="password" type="password" placeholder="Password" />
      </emqx-card>
      <emqx-button type="primary" class="login" @click="login"> Login </emqx-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      userName: '',
      password: '',
    })
    const login = () => {
      const user = {
        func: 10,
        name: form.userName,
        pass: form.password,
      }
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    return {
      ...toRefs(form),
      login,
    }
  },
})
</script>

<style lang="scss">
.login-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 120px 0;
  font-size: 62px;
  color: #888;
  text-align: center;
  background-color: #fff;

  .container {
    width: 400px;
    margin: 0 auto;
  }

  .buttonafter:after {
    content: '';
    display: block;
    position: absolute;
    top: 8px;
    left: 100%;
    width: 0;
    height: 0;
    border-color: transparent transparent transparent #14a03d;
    border-style: solid;
    border-width: 5px;
  }
}
</style>
