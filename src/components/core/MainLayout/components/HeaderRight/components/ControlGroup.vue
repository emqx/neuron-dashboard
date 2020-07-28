<template>
  <div>
    <el-button type="primary"
               v-if="active"
               size="small"
               @click="handleStart">Start</el-button>
    <el-button type="danger"
               v-else
               size="small"
               @click="handleStop">Stop</el-button>
    <el-button type="primary"
               size="small"
               @click="handleRestart">Restart</el-button>
    <el-button type="primary"
               size="small"
               @click="submit">Send</el-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { clone } from '@/utils'

export default {
  computed: {
    ...mapGetters(['res', 'deviceObj']),
    ...mapState({
      status: state => state.Status.status
    }),
    active () {
      let srt = this.status.mode || ''
      return srt.indexOf('STANDBY') !== -1
    }
  },
  methods: {
    handleStart () {
      this.$ws().set().send({
        func: 71,
        'stat': 'active'
      })
    },
    handleStop () {
      this.$ws().set().send({
        func: 71,
        'stat': 'standby'
      })
    },
    handleRestart () {
      this.$confirm('Are you sure Restart Gateway', 'Restart', {
        type: 'warning'
      }).then(() => {
        this.$ws().set().send({
          func: 70,
          'acts': 'restart'
        })
      }).catch()
    },
    submit () {
      this.$confirm('Are you sure send your Configuration', 'Send', {
        type: 'warning'
      }).then(() => {
        const res = clone(this.res)
        res.objd.forEach(i => {
          if (i.preAndSuff) delete i.preAndSuff
        })
        res.func = 21
        this.$ws().set({ success: this.handleSuccess }).send(res)
      }).catch()
    },
    handleSuccess (data) {
      if (data.func === 21 && data.errc === 0) {
        this.$ws().remove(this.handleSuccess)
        this.$openMessage.success('Submit success!')
        localStorage.removeItem('objectData')
        localStorage.removeItem('eventData')
        setTimeout(() => {
          this.$openMessage.info('Restarting...')
          this.$ws().set().send({
            func: 70,
            'acts': 'restartnew'
          })
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
