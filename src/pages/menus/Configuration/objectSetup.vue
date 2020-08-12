<template>
  <Container type="card-full" :scorll="false">
    <div class="row flex">
      <div class="dd-title">Object Setup</div>
      <div class="driverName">{{ deviceObj.label }}</div>
      <div class="btnGroup">
        <DriverSetup />
      </div>
    </div>
    <div class="ObjectSetup">
      <ObjectSetup />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import DriverSetup from './components/driverSetup'
import ObjectSetup from './components/objectSetup'
import { mapState, mapGetters } from 'vuex'
export default {
  mixins: [indexMixin],
  computed: {
    ...mapGetters(['deviceObj']),
    ...mapState({
      driverData: (state) => state.SetUpData.driverData,
      driverList: (state) => state.Device.deviceList,
    }),
  },
  components: {
    DriverSetup,
    ObjectSetup,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public';
/deep/.el-input-number {
  width: 100%;
  &.is-without-controls .el-input__inner {
    text-align: left;
  }
}
.flex {
  display: flex;
  justify-content: space-between;
  .driverName {
    line-height: 40px;
  }
}
.btnGroup {
  margin-right: 303px;
}
.ObjectSetup {
  margin-top: -68px;
}
</style>
