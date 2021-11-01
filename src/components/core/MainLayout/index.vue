<template>
  <div class="layout-main" :class="theme">
    <div class="dd-layout-header">
      <div class="header-content">
        <div class="logo-group">
          <img class="neuron-logo" :src="`${baseUrl}logo/logo.png`" alt="neuron logo" width="138" />
        </div>
        <HeaderMenu></HeaderMenu>
        <HeaderRight></HeaderRight>
      </div>
    </div>
    <div class="dd-layout-container">
      <div class="dd-layout-main">
        <router-view></router-view>

        <!-- <router-view v-slot="{ Component }">
          <transition name="fade-transverse">
            <component :is="Component"></component>
          </transition>
        </router-view> -->
        <StatuBar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getData } from '@/api/data.js'
import HeaderMenu from './components/HeaderMenu/index.vue'
import HeaderRight from './components/HeaderRight'
import StatuBar from './components/StatuBar'
import { EmqxMessage } from '@emqx/emqx-ui'

export default {
  components: {
    HeaderMenu,
    HeaderRight,
    StatuBar,
  },
  data() {
    return {
      theme: 'default',
      collapse: false,
      loadData: false,
      pollingStatusTimer: undefined,
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
    baseUrl() {
      return process.env.BASE_URL
    },
  },
  mounted() {
    this.initData()
    this.checkRestartnewTimestampNHandle()
  },
  methods: {
    ...mapMutations(['setAllData', 'setAlarmStatus', 'setNorthDriverList', 'setSouthDriverList']),
    initData() {
      this.setData()
      this.setDevice()
      this.getStatus()
    },
    setData() {
      getData(this.nodeId, {
        func: 22,
        wtrm: 'neuron',
      }).then((res) => {
        this.setAllData(res.data)
      })
    },
    setDevice() {
      getData(this.nodeId, {
        func: 23,
        type: 1,
        wtrm: 'neuron',
      }).then((southRes) => {
        this.setSouthDriverList(southRes.data.rows)
        getData(this.nodeId, {
          func: 23,
          type: 2,
          wtrm: 'neuron',
        }).then((northRes) => {
          this.setNorthDriverList(northRes.data.rows)
        })
      })
    },
    getStatus() {
      getData(this.nodeId, {
        func: 61,
        actn: 'act_en',
        wtrm: 'neuron',
      }).then((res) => {
        this.receiveStatus(res.data)
      })
    },
    receiveStatus(data) {
      if (!data.func && data.tstp) {
        if (data.mode !== 'INACTIVE' && !this.loadData) {
          this.loadData = true
        }
        this.setAlarmStatus(data)
      } else {
        EmqxMessage.error(data.emsg)
      }
    },
    refreshStatus() {
      getData(this.nodeId, {
        func: 61,
        actn: 'act_en',
        wtrm: 'neuron',
      }).then((res) => {
        const { data } = res
        if (!data.func && data.tstp) {
          this.setAlarmStatus(data)
        }
      })
    },
    pollingStatus() {
      if (this.pollingStatusTimer) {
        window.clearInterval(this.pollingStatusTimer)
      }
      this.pollingStatusTimer = window.setInterval(() => {
        this.refreshStatus()
      }, 2000)
      window.setTimeout(() => {
        window.clearInterval(this.pollingStatusTimer)
      }, 2000 * 30 * 2)
    },
    /**
     * After the restart, poll the status data for two minutes to solve
     * the status data display error caused by the restart still in progress
     * when the status data is obtained after the restart.
     */
    checkRestartnewTimestampNHandle() {
      const restartnewTimestamp = window.localStorage.getItem('restartnewTimestamp')
      if (
        restartnewTimestamp &&
        !Number.isNaN(Number(restartnewTimestamp)) &&
        Date.now() - Number(restartnewTimestamp) < 10 * 1000
      ) {
        this.pollingStatus()
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/style/theme/default.scss';
</style>
