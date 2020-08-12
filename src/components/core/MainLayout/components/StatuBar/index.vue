<template>
  <div class="statu-bar">
    <div :class="status.comm === 'UP' ? 'green' : 'red'">COMM&nbsp;{{ status.comm || '' }}</div>
    <div class="mach">
      {{ status.mach || '' }}
    </div>
    <div :class="status.mode === 'ACTIVE' ? 'green' : status.mach === 'STANDBY' ? 'yellow' : 'red'">
      {{ status.mode || '' }}
    </div>
    <div :class="status.mqcn === 'MQDISCONNECT' ? 'red' : 'green'">
      {{ status.mqcn || 'MQDISCONNECT' }}
    </div>
    <div :class="galm === 'NO ALARM' ? 'green' : 'red'">
      {{ galm }}
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
    color: #fff;
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
