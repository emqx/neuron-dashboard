<template>
  <Container type="card-full" :scorll="false">
    <template v-slot:default>
      <div class="row flex">
        <div class="dd-title">{{ $t('configuration.objectSetup') }}</div>
        <div class="driverName">{{ deviceObj.label }}</div>
        <div class="btnGroup">
          <DriverSetup />
        </div>
      </div>
      <div class="ObjectSetup">
        <ObjectSetupComponent />
      </div>
    </template>
  </Container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DriverSetup from './components/driverSetup'
import ObjectSetup from './components/objectSetup'
import Container from '@/components/core/Container/index.vue'

export default {
  computed: {
    ...mapGetters(['deviceObj']),
    ...mapState({
      driverData: state => state.SetUpData.driverData,
      driverList: state => state.Device.deviceList,
    }),
  },
  components: {
    DriverSetup,
    // the component name is same as this page,
    // if don't rename it
    // will cause endless loop that throw 'Maximum call stack size exceeded' error
    ObjectSetupComponent: ObjectSetup,
    Container,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public';
>>> .el-input-number {
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
  margin-right: 510px;
}
.ObjectSetup {
  margin-top: -68px;
}
</style>
