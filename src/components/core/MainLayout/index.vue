<template>
  <div class="layout-main" :class="theme">
    <div class="dd-layout-header">
      <div class="logo-group">
        <p>RD_EDGE</p>
      </div>
      <HeaderMenu></HeaderMenu>
      <HeaderRight></HeaderRight>
    </div>
    <div class="dd-layout-container">
      <div class="dd-layout-main">
        <transition name="fade-transverse">
          <router-view></router-view>
        </transition>
        <StatuBar />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  components: {
    HeaderMenu: () => import('./components/HeaderMenu'),
    HeaderRight: () => import('./components/HeaderRight'),
    StatuBar: () => import('./components/StatuBar'),
  },
  data() {
    return {
      theme: 'default',
      collapse: false,
      loadData: false,
    }
  },
  methods: {
    initData() {
      this.$ws()
        .test()
        .set({ success: this.receiveStatus })
        .set({ success: this.receiveAlarmList })
        .set({ success: this.setData })
        .set({ success: this.getWritableObj })
        .set({ success: this.setSouthDrivers })
      this.$ws().send({
        func: 23,
        type: 1,
      })
    },
    ...mapMutations(['setAllData', 'setAlarmStatus', 'setAlarmList']),
    setData(res) {
      if (+res.func === 22) {
        this.$ws().send({
          func: 60,
        })
        this.$ws().remove(this.setData)
        this.setAllData(res)
      }
    },
    setNorthDrivers(data) {
      if (+data.func === 23) {
        this.$ws().remove(this.setNorthDrivers)
        this.$store.commit('setNorthDriverList', data.rows)
      }
    },
    setSouthDrivers(data) {
      if (+data.func === 23) {
        this.$ws().remove(this.setSouthDrivers)
        this.$store.commit('setSouthDriverList', data.rows)
        setTimeout(() => {
          this.$ws().set({ success: this.setNorthDrivers }).send({
            func: 23,
            type: 2,
          })
        }, 2000)
      }
    },
    getWritableObj(data) {
      if (+data.func === 60) {
        this.$ws().remove(this.getWritableObj)
        this.$store.commit('setWritableList', data.tele)
      }
    },
    receiveStatus(data) {
      if (!data.func && data.tstp) {
        if (data.mode !== 'INACTIVE' && !this.loadData) {
          this.loadData = true
          this.$ws().send({
            func: 22,
          })
        }
        this.setAlarmStatus(data)
      }
    },
    receiveAlarmList(data) {
      if (!data.func && data.tele) {
        this.setAlarmList(data.tele)
      }
    },
  },
  mounted() {
    this.initData()
  },
  beforeDestroy() {
    this.$ws().remove(this.receiveStatus)
  },
}
</script>

<style lang="scss">
@import '@/assets/style/theme/default.scss';
</style>
