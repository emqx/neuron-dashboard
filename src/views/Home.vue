<template>
  <div class="main">
    <Header />
    <emqx-container normal fixed-nav class="body">
      <template #nav>
        <side-nav></side-nav>
      </template>
      <template #page-content>
        <router-view />
      </template>
    </emqx-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { Status } from '@/types/neuron'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideNav,
  },
  setup() {
    const loadData = ref(false)
    const { ws } = useWebsocket()
    const store = useStore()
    let SET_STATUS = null
    const receiveStatus = (data: Status) => {
      if (!data.func && data.tstp) {
        if (data.mode !== 'INACTIVE' && !loadData.value) {
          loadData.value = true
        }
        SET_STATUS = store.commit('SET_STATUS', data)
      }
    }
    ws().test().set({
      success: receiveStatus,
    })
    return {
      SET_STATUS,
    }
  },
})
</script>
