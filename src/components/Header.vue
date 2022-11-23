<template>
  <emqx-header class="header">
    <template #title>
      <img src="../assets/images/logo.png" alt="china-unicom-logo" width="141" />
    </template>
    <template v-slot:right>
      <div>
        <emqx-dropdown>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { downloadLogs } from '@/api/admin'
import { useDownload } from '@/composables/useDownload'

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
</script>

<style lang="scss">
.header {
  .el-dropdown {
    color: #fff;
  }
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
