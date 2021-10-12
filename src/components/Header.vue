<template>
  <emqx-header class="header">
    <template #title>
      <img src="../assets/images/logo.png" alt="emqx-platform-logo" width="141" />
    </template>
    <template v-slot:right>
      <div>
        <emqx-dropdown>
          <span class="el-dropdown-link">
            <span class="user-bg">
              <i class="iconfont iconAdministration1"></i>
            </span>
            {{ $t('common.user') }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu class="user-menu">
              <div class="user-menu-hd">
                <p class="username">用户名用户名</p>
                <div class="account-setting">
                  <emqx-button type="text">{{ $t('common.newPassword') }}</emqx-button>
                  <emqx-button type="text">{{ $t('common.logout') }}</emqx-button>
                </div>
              </div>
              <div class="user-menu-bd">
                <emqx-dropdown-item>
                  <i class="iconfont iconuseradmin"></i>
                  <span>{{ $t('common.userAdmin') }}</span>
                </emqx-dropdown-item>
                <emqx-dropdown-item>
                  <i class="iconfont iconLicense"></i>
                  <span>License</span>
                </emqx-dropdown-item>
                <emqx-dropdown-item>
                  <i class="iconfont iconabout"></i>
                  <span>{{ $t('common.about') }}</span>
                </emqx-dropdown-item>
                <emqx-dropdown-item>
                  <i class="iconfont iconlanguage"></i>
                  <span>{{ $t('common.lang') }}</span>
                </emqx-dropdown-item>
              </div>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
      </div>
    </template>
  </emqx-header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Header',
  setup() {
    const store = useStore()

    const status = computed(() => store.state.status || {})

    const user = computed(() => store.state.status || {})

    return {
      status,
      user,
    }
  },
})
</script>

<style lang="scss">
.header {
  .el-dropdown {
    color: #fff;
  }
}
.el-dropdown-menu.user-menu {
  padding: 0;
}
.user-menu-hd {
  padding: 24px;
  border-bottom: 1px solid #e2e7ea;
}
.user-menu-bd {
  padding: 14px 0;
  .iconfont {
    color: #0d446e;
  }
  .el-dropdown-menu__item {
    padding: 0 24px;
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
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
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
