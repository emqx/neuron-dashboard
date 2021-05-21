<template>
  <emqx-header class="header">
    <template #title>
      <img src="../assets/images/logo.png" alt="emqx-platform-logo" width="141" />
    </template>
    <template v-slot:right>
      <div>
        <emqx-dropdown>
          <span class="el-dropdown-link">
            {{ $t('common.system') }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu>
              <emqx-dropdown-item @click="handleStandby">
                <i class="iconfont iconstanndby"></i>
                {{ $t('common.standby') }}
              </emqx-dropdown-item>
              <emqx-dropdown-item @click="handleRestart">
                <i class="iconfont iconrestart"></i>
                {{ $t('common.restart') }}
              </emqx-dropdown-item>
              <emqx-dropdown-item @click="handleShutdown">
                <i class="iconfont iconshutdown"></i>
                {{ $t('common.shutdown') }}
              </emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
        <emqx-dropdown>
          <span class="el-dropdown-link">
            <span class="user-bg"><i class="iconfont iconAdministration"></i></span>{{ $t('common.user')
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <emqx-dropdown-menu>
              <emqx-dropdown-item>{{ $t('common.logout') }}</emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
      </div>
    </template>
  </emqx-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useAPI from '@/composables/useAPI'
import { ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { GatewayAction } from '@/types/enums'

export default defineComponent({
  name: 'Header',
  setup() {
    const { standby } = useAPI()
    const { t } = useI18n()
    console.log(GatewayAction.Restart)
    const handleStandby = () => {
      standby()
    }

    const handleRestart = async () => {
      await ElMessageBox.confirm(t('common.confirmRestart'))
      // controlGateway(GatewayAction.Restart)
    }

    const handleShutdown = () => {
      // controlGateway(GatewayAction.Shutdown)
    }
    return {
      handleStandby,
      handleRestart,
      handleShutdown,
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
.el-dropdown-menu__item {
  display: flex;
  align-items: center;
  i {
    font-size: 20px;
  }
}
.iconfont.iconAdministration {
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
