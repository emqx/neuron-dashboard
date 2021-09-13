<template>
  <div class="control-group">
    <emqx-button type="primary" v-if="active" size="small" :loading="starting" @click="handleStart">{{
      $t('common.start')
    }}</emqx-button>
    <emqx-button type="danger" v-else size="small" :loading="stoping" @click="handleStop">{{
      $t('common.stop')
    }}</emqx-button>
    <emqx-button type="primary" size="small" :loading="restarting" @click="handleRestart">{{
      $t('common.restart')
    }}</emqx-button>
    <emqx-button type="primary" size="small" :loading="sending" @click="submit">{{ $t('common.send') }}</emqx-button>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { clone } from '@/utils'
import { postData } from '@/api/data.js'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'ControlGroup',
  data() {
    return {
      sending: false,
      restarting: false,
      stoping: false,
      starting: false,
    }
  },
  computed: {
    ...mapGetters(['res', 'deviceObj']),
    ...mapState({
      // FIXME: add to state
      status: state => state?.Status?.status,
    }),
    active() {
      const srt = this.status?.mode || ''
      return srt.indexOf('STANDBY') !== -1
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  methods: {
    handleStart() {
      this.starting = true
      postData(this.nodeId, {
        func: 71,
        stat: 'active',
        wtrm: 'neruon',
      })
        .then(res => {
          this.starting = false
          if (res.data.errc !== 0) {
            EmqxMessage.error(res.data.emsg)
          } else {
            EmqxMessage.success(this.$t('common.started'))
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        })
        .catch(() => {
          this.starting = false
        })
    },
    handleStop() {
      this.stoping = true
      postData(this.nodeId, {
        func: 71,
        stat: 'standby',
        wtrm: 'neruon',
      })
        .then(res => {
          this.stoping = false
          if (res.data.errc !== 0) {
            EmqxMessage.error(res.data.emsg)
          } else {
            EmqxMessage.success(this.$t('common.stoped'))
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          }
        })
        .catch(() => {
          this.stoping = false
        })
    },
    handleRestart() {
      ElMessageBox(this.$t('common.confirmRestart'), this.$t('common.restart'), {
        type: 'warning',
      })
        .then(() => {
          this.restarting = true
          postData(this.nodeId, {
            func: 70,
            acts: 'restart',
            wtrm: 'neruon',
          })
            .then(() => {
              this.restarting = false
              EmqxMessage.info(this.$t('common.restarting'))
            })
            .catch(() => {
              this.restarting = false
            })
        })
        .catch()
    },
    submit() {
      ElMessageBox(this.$t('common.confirmSend'), this.$t('common.send'), {
        type: 'warning',
      })
        .then(() => {
          this.sending = true
          const data = clone(this.res)
          if (data.chdv) {
            delete data.chdv
          }
          data.objd.forEach(i => {
            if (i.preAndSuff) delete i.preAndSuff
          })
          data.wtrm = 'neuron'
          data.func = 21
          postData(this.nodeId, data)
            .then(res => {
              this.handleSuccess(res.data)
            })
            .catch(() => {
              this.sending = false
            })
        })
        .catch()
    },
    handleSuccess(data) {
      this.sending = false
      if (data.func === 21 && data.errc === 0) {
        EmqxMessage.success(this.$t('common.submitSuccess'))
        this.$store.commit('clearAlarmList')
        setTimeout(() => {
          postData(this.nodeId, {
            func: 70,
            acts: 'restartnew',
            wtrm: 'neruon',
          }).then(() => {
            EmqxMessage({
              type: 'info',
              message: this.$t('common.restarting'),
              duration: 8000,
            })
            setTimeout(() => {
              window.location.reload()
            }, 8000)
          })
        }, 3000)
      } else {
        EmqxMessage.error(data.emsg)
      }
    },
  },
}
</script>
