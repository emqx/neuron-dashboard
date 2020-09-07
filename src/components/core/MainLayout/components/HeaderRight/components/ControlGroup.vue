<template>
  <div>
    <el-button type="primary" v-if="active" size="small" @click="handleStart">{{ $t('common.start') }}</el-button>
    <el-button type="danger" v-else size="small" @click="handleStop">{{ $t('common.stop') }}</el-button>
    <el-button type="primary" size="small" @click="handleRestart">{{ $t('common.restart') }}</el-button>
    <el-button type="primary" size="small" @click="submit">{{ $t('common.send') }}</el-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { clone } from '@/utils'

export default {
  computed: {
    ...mapGetters(['res', 'deviceObj']),
    ...mapState({
      status: (state) => state.Status.status,
    }),
    active() {
      let srt = this.status.mode || ''
      return srt.indexOf('STANDBY') !== -1
    },
  },
  methods: {
    handleStart() {
      this.$ws().set().send({
        func: 71,
        stat: 'active',
      })
    },
    handleStop() {
      this.$ws().set().send({
        func: 71,
        stat: 'standby',
      })
    },
    handleRestart() {
      this.$confirm(this.$t('common.confirmRestart'), this.$t('common.restart'), {
        type: 'warning',
      })
        .then(() => {
          this.$ws().set().send({
            func: 70,
            acts: 'restart',
          })
        })
        .catch()
    },
    submit() {
      this.$confirm(this.$t('common.confirmSend'), this.$t('common.send'), {
        type: 'warning',
      })
        .then(() => {
          const res = clone(this.res)
          if (res.chdv) {
            delete res.chdv
          }
          res.objd.forEach((i) => {
            if (i.preAndSuff) delete i.preAndSuff
          })
          res.func = 21
          this.$ws().set({ success: this.handleSuccess }).send(res)
        })
        .catch()
    },
    handleSuccess(data) {
      if (data.func === 21 && data.errc === 0) {
        this.$ws().remove(this.handleSuccess)
        this.$openMessage.success(this.$t('common.submitSuccess'))
        localStorage.removeItem('chnl')
        localStorage.removeItem('objectData')
        localStorage.removeItem('eventData')
        setTimeout(() => {
          this.$openMessage.info(this.$t('common.restarting'))
          this.$ws().set().send({
            func: 70,
            acts: 'restartnew',
          })
        }, 2000)
      }
    },
  },
}
</script>

<style scoped lang="scss"></style>
