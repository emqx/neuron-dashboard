<template>
  <div class="status-bar">
    <el-divider content-position="left">{{ $t('common.systemStatus') }}</el-divider>
    <template v-if="status">
      <div :class="[status.comm === 'UP' ? 'green' : 'red', 'status-item']">
        <i class="iconfont iconcomm-down1" />
        COMM {{ status.comm || '' }}
      </div>
      <div class="mach status-item">
        <i class="iconfont iconmanu" />
        {{ status.mach || '' }}
      </div>
      <div :class="[status.mode === 'ACTIVE' ? 'green' : status.mach === 'STANDBY' ? 'yellow' : 'red', 'status-item']">
        <i class="iconfont iconstanndby" />
        {{ status.mode || '' }}
      </div>
      <div :class="[status.mqcn === 'MQDISCONNECT' ? 'red' : 'green', 'status-item']">
        <i class="iconfont iconmqdisconnect" />
        {{ status.mqcn || 'MQDISCONNECT' }}
      </div>
      <div :class="[galm === 'NO ALARM' ? 'green' : 'red', 'status-item']">
        <i class="iconfont iconalarm" />
        {{ galm }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElDivider } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'StatusBar',
  components: {
    ElDivider,
  },
  setup() {
    const store = useStore()
    const status = computed(() => store.state.status)
    const galm = computed(() => {
      let res = ''
      switch (status.value.galm) {
        case 'NON-EXIST':
          res = 'NO ALARM'
          break
        case 'UNACKNOWLEDGE':
          res = 'UNACK ALARM'
          break
        case 'EXIST':
          res = 'ALARM'
          break
      }
      return res
    })
    return {
      status,
      galm,
    }
  },
})
</script>

<style lang="scss">
.status-bar {
  font-size: 14px;
  font-weight: 500;
  padding: 0 40px 0 15px;
  .mach {
    color: var(--color-grey-font);
  }
  .red {
    color: var(--main-red-color);
  }
  .green {
    color: var(--main-green-color);
  }
  .yellow {
    color: var(--main-yellow-color);
  }
  .status-item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    i {
      margin-right: 12px;
      font-size: 20px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
  }
  .el-divider--horizontal {
    margin: 60px 0 40px 0;
  }
  .el-divider__text.is-left {
    left: -16px;
  }
}
</style>
