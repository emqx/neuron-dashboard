<template>
  <el-dialog :title="$t('common.about')" :visible.sync="dialogVisible" width="700px">
    <h3>{{ data.sysn }}</h3>
    <p>{{ data.cpyr }}</p>
    <div class="detail">
      <div>
        <span>{{ $t('common.modelNo') }}</span>
        :<span>{{ data.modl }}</span>
      </div>
      <div>
        <span>{{ $t('common.serialNo') }}</span>
        :<span>{{ data.srno }}</span>
      </div>
      <div>
        <span>{{ $t('common.buildVersion') }}</span>
        :<span>{{ data.bver }}</span>
      </div>
      <div>
        <span>{{ $t('common.protocolNo') }}</span>
        :<span>{{ data.pver }}</span>
      </div>
      <div>
        <span>{{ $t('common.hostname') }}</span>
        :<span>{{ data.host }}</span>
      </div>
      <div>
        <span>{{ $t('common.expiredDate') }}</span>
        :<span>{{ data.expd }}</span>
      </div>
      <div>
        <span>{{ $t('common.tagPoints') }}</span>
        :<span>{{ data.tatt }}/{{ data.matt }}</span>
      </div>
      <div>
        <span>{{ $t('common.alarmsPoints') }}</span>
        :<span>{{ data.talr }}/{{ data.malr }}</span>
      </div>
      <div>
        <span>{{ $t('common.dataUsages') }}</span>
        :<span>{{ data.tusg }}/{{ data.musg }}</span>
      </div>
      <div>
        <span>{{ $t('common.emailContact') }}</span>
        :<span>{{ data.cont }}</span>
      </div>
      <div>
        <span>{{ $t('common.uuid') }}</span>
        :<span>{{ data.uuid }}</span>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">{{ $t('common.submit') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      data: {},
    }
  },
  methods: {
    showDialog(data) {
      this.data = data
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  & > div {
    display: flex;
    margin-top: 10px;
    span:first-child {
      width: 120px;
    }
  }
}
</style>
