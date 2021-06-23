<template>
  <el-dialog :title="$t('common.about')" :visible.sync="dialogVisible" width="700px">
    <h3>{{ data.sysn }}</h3>
    <p>{{ data.cpyr }}</p>
    <div class="detail">
      <div>
        <span>Model no.</span>:
        <span>{{ data.modl }}</span>
      </div>
      <div>
        <span>Serial no.</span>:
        <span>{{ data.srno }}</span>
      </div>
      <div>
        <span>Build version</span>:
        <span>{{ data.bver }}</span>
      </div>
      <div>
        <span>Protocol no.</span>:
        <span>{{ data.pver }}</span>
      </div>
      <div>
        <span>Hostname</span>:
        <span>{{ data.host }}</span>
      </div>
      <div>
        <span>Expired date</span>:
        <span>{{ data.expd }}</span>
      </div>
      <div>
        <span>Tag points</span>:
        <span>{{ data.tatt }}/{{ data.matt }}</span>
      </div>
      <div>
        <span>Alarms points</span>:
        <span>{{ data.talr }}/{{ data.malr }}</span>
      </div>
      <div>
        <span>Data usages</span>:
        <span>{{ data.tusg }}/{{ data.musg }}</span>
      </div>
      <div>
        <span>Email Contact</span>:
        <span>{{ data.cont }}</span>
      </div>
      <div>
        <span>UUID</span>:
        <span>{{ data.uuid }}</span>
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
      width: 100px;
    }
  }
}
</style>
