<template>
  <emqx-header class="header">
    <template #title>
      <img src="../assets/images/logo.png" alt="neuron-logo" width="141" />
    </template>

    <template v-slot:right>
      <div>
        <emqx-dropdown class="dropdown-item">
          <span class="el-dropdown-link">
            {{ $t('common.systemInformation') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu class="header-menu">
              <emqx-dropdown-item @click="goLicense">
                <i class="iconfont iconLicense"></i>
                <span>License</span>
              </emqx-dropdown-item>
              <emqx-dropdown-item @click="goAbout">
                <i class="iconfont iconabout"></i>
                <span> {{ $t('common.about') }}</span>
              </emqx-dropdown-item>
              <emqx-dropdown-item @click="downloadLogsFile">
                <i class="iconfont icondownload"></i>
                <span> {{ $t('admin.log') }}</span>
              </emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>

        <emqx-dropdown class="dropdown-item" @command="changeLanguage">
          <span class="el-dropdown-link">
            {{ langLabel }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu class="header-menu">
              <emqx-dropdown-item
                v-for="item in langList"
                :key="item.label"
                :command="item.value"
                :class="{ 'active-lang': item.value === lang }"
              >
                {{ item.label }}
              </emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>

        <emqx-dropdown>
          <span class="el-dropdown-link">
            <span class="user-bg">
              <i class="iconfont iconAdministration1"></i>
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu class="header-menu">
              <emqx-dropdown-item @click="logout">{{ $t('common.logout') }}</emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
      </div>
    </template>
  </emqx-header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { downloadLogs } from '@/api/admin'
import { useDownload } from '@/composables/useDownload'
import useLang, { setLang } from '@/composables/useLang'
import i18n from '@/i18n/index'
import { qiankunActions } from '@/utils/forEKuiper'

const store = useStore()
const router = useRouter()

const goLicense = () => {
  router.push({ name: 'License' })
}

const goAbout = () => {
  router.push({ name: 'About' })
}

const { downloadFile } = useDownload()
const downloadLogsFile = () => {
  downloadLogs().then((res) => {
    const { data, headers } = res
    downloadFile(headers, data)
  })
}

const logout = async () => {
  try {
    store.commit('LOGOUT')
    router.push({ name: 'Login' })
  } catch (error) {
    console.error(error)
  }
}

const { langList } = useLang()
const { initLang } = setLang()

const lang = computed({
  get() {
    return store.state.lang
  },
  set(val: string) {
    store.commit('SET_LANG', val)
    i18n.global.locale.value = val
    initLang()
    // Trigger: notification microservice
    qiankunActions.setGlobalState({ lang: store.state.lang })
  },
})

const langLabel = computed(() => langList.find((item) => item.value === lang.value)?.label || '')

const changeLanguage = (command: string) => {
  lang.value = command
}
</script>

<style lang="scss">
@import '@/styles/emqx-ui-variables.scss';

.header {
  .el-dropdown {
    color: #fff;
  }
}
.dropdown-item {
  margin-left: 14px;
}
.header-menu {
  .emqx-dropdown-item {
    padding-left: 24px;
    padding-right: 24px;
  }
  .emqx-dropdown-item {
    display: flex;
    align-items: center;
  }
}
.active-lang {
  color: $--color-primary !important;
}
.username {
  margin-bottom: 12px;
}
.account-setting {
  .el-button {
    height: 20px;
    min-height: 20px;
    padding: 0;
    line-height: 20px;
    color: #0d446e;
    &:not(:last-child) {
      position: relative;
      padding-right: 6px;
      margin-right: 6px;
      &::after {
        content: '';
        height: 100%;
        width: 1px;
        background-color: #d4dbe0;
      }
    }
  }
}
.iconfont.iconAdministration1 {
  font-size: 20px;
  position: relative;
  left: 1px;
}
.user-bg {
  display: inline-block;
  margin-left: 24px;
  margin-right: 10px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  background: #104d7c;
  border-radius: 50%;
  text-align: center;
}
</style>
