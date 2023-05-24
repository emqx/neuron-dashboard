<template>
  <div class="login-page">
    <div class="container">
      <emqx-card shadow="never">
        <img class="img-login" src="~@/assets/images/img-login.png" />
        <div class="login-main">
          <div class="logo-wrap">
            <img class="img-logo" src="~@/assets/images/logo.png" alt="logo" width="60" />
            <span class="title">{{ TITLE }}</span>
          </div>
          <emqx-form ref="formCom" :model="form" :rules="rules" @keyup.enter="login">
            <emqx-form-item prop="userName">
              <emqx-input v-model.trim="form.userName" type="text" :placeholder="$t('common.username')" />
            </emqx-form-item>
            <emqx-form-item prop="password">
              <emqx-input v-model="form.password" type="password" :placeholder="$t('common.password')" />
            </emqx-form-item>
            <emqx-button type="primary" class="login" @click="login">{{ $t('common.login') }}</emqx-button>
          </emqx-form>
        </div>
      </emqx-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { login as requestLogin } from '@/api/common'
import useCheckLicense from '@/composables/useCheckLicense'
import { createCommonErrorMessage } from '@/utils/utils'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { TITLE } from '@/utils/constants'

const router = useRouter()
const { t } = useI18n()
const store = useStore()

const { checkLicense } = useCheckLicense()

const formCom = ref()
const form = reactive({
  userName: '',
  password: '',
})
const rules = computed(() => {
  return {
    userName: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('common.username')),
      },
    ],
    password: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('common.password')),
      },
    ],
  }
})
const isLoading = ref(false)

const login = async () => {
  try {
    await formCom.value.validate()
    isLoading.value = true
    const { userName, password } = form
    const { data } = await requestLogin({ name: userName, pass: password })
    store.commit('SET_TOKEN', data.token)
    store.commit('SET_LANG', store.state.lang)
    store.commit('SET_USERNAME', userName)

    router.push({
      path: '/',
    })
    checkLicense()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
@import '@/styles/mixins.scss';

.login-page {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 62px;
  color: #888;
  text-align: center;
  background-color: #f4f9fc;

  .logo-wrap {
    @include display-flex();
    margin-bottom: 20px;

    .title {
      color: #23c2f4;
      font-size: 24px;
      font-weight: 600;
      padding: 0 10px;
    }
  }

  .container {
    width: 768px;
    height: 390px;
  }

  $img-width: 360px;
  .emqx-card {
    position: relative;
    height: 100%;
    padding-left: $img-width;
    border-radius: 16px;
    background: #0c283e;
  }

  .emqx-card.el-card .el-card__body {
    box-sizing: border-box;
    height: 100%;
    padding: 64px 64px 61px;
  }

  img {
    display: block;
  }

  .img-login {
    width: $img-width;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .emqx-form-item {
    margin-bottom: 30px;
  }
  /*
    给的页面里面，除了license，用户管理和关于之外，其他的都已经写了
    license，用户管理和关于还没有相关接口，如果有相关接口了很快就可以写完
  */

  .emqx-input .el-input__inner {
    padding-left: 0;
    padding-right: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #394f60;
    border-radius: 0px;
    color: #fff;
    background-color: transparent;
    &::placeholder {
      color: #3a5163;
    }
    &:-webkit-autofill {
      padding-left: 12px;
      padding-right: 12px;
      -webkit-text-fill-color: var(--color-normal-font);
      border-radius: 4px;
    }
  }
  .emqx-form-item.is-error .el-input__inner,
  .emqx-form-item.is-error .el-input__inner:focus {
    border-top: 1px solid transparent !important;
    border-right: 1px solid transparent !important;
    border-left: 1px solid transparent !important;
  }

  .emqx-button {
    display: block;
    width: 100%;
    margin-top: 40px;
  }
}
</style>
