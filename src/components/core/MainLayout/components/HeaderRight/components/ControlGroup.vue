<template>
  <div>
    <el-button type="primary"
               v-if="active"
               size="small"
               @click="handleStart">Start</el-button>
    <el-button type="primary"
               v-else
               size="small"
               @click="handleStop">Stop</el-button>
    <el-button type="primary"
               size="small"
               @click="handleRestartNew">New</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
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
    handleRestartNew () {
      this.$confirm('Are you sure New operation', 'New', {
        type: 'warning'
      }).then(() => {
        this.$ws().set().send({
          func: 70,
          'acts': 'restartnew'
        })
      }).catch()
    }
  }
}
</script>

<style scoped lang="scss">
</style>
