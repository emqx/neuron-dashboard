<template>
  <div class="layout-main" :class="theme">
    <div class="dd-layout-header">
      <div class="header-content">
        <div class="logo-group">
          <img class="neuron-logo" src="/logo/logo.png" alt="neuron logo" width="138" />
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
    }
  },
  computed: {
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  mounted() {
    this.initData()
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
  },
}
</script>

<style lang="scss">
@import '@/assets/style/theme/default.scss';
</style>
