<template>
  <div class="statu-bar">
    <!-- <div :class="status.comm === 'UP' ? 'green' : 'red'">COMM&nbsp;{{ status.comm || '' }}</div> -->
    <div :class="status.comm === 'UP' ? 'green' : 'red'">
      {{ $t(status.comm ? `status.COMM ${status.comm}` : 'status.CONNECTING') }}
    </div>
    <div class="mach">
      {{ status.mach ? $t(`status.${status.mach}`) : '' }}
    </div>
    <div :class="mode === 'ACTIVE' ? 'green' : status.mach === 'STANDBY' ? 'yellow' : 'red'">
      {{ $t(`status.${mode}`) }}
    </div>
    <div :class="status.mqcn === 'MQDISCONNECT' ? 'red' : 'green'">
      {{ $t(`status.${status.mqcn || 'MQDISCONNECT'}`) }}
    </div>
    <div :class="galm === 'NO ALARM' ? 'green' : 'red'">
      {{ $t(`status.${galm}`) }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      status: (state) => state.Status.status,
    }),
    commState() {
      return this.status.model === 'ACTIVE' ? 'OK' : this.status.model
    },
    mode() {
      if (this.status.mode === 'SEMI') {
        return 'EXPIRED'
      }
      return this.status.mode || ''
    },
    galm() {
      let res
      switch (this.status.galm) {
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
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public.scss';
.statu-bar {
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
  height: 50px;
  display: flex;
  div {
    flex: 1;
    text-align: center;
    line-height: 50px;
    font-size: $font-size-sub;
    font-weight: normal;
  }
  .mach {
    color: $color-text-main;
  }
  .red {
    color: $color-danger;
  }
  .green {
    color: $color-success;
  }
  .yellow {
    color: $color-warning;
  }
}
</style>
