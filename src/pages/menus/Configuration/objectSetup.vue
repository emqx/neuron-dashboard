<template>
  <Container type="card-full" :scorll="false">
    <div class="row flex">
      <div class="dd-title">{{ $t('configuration.objectSetup') }}</div>
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
import { mapGetters } from 'vuex'

export default {
  mixins: [indexMixin],
  computed: {
    ...mapGetters(['deviceObj']),
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
  margin-right: 510px;
}
.ObjectSetup {
  margin-top: -68px;
}
</style>
