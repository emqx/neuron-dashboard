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
import useFunc from '@/composables/useFunc'
import { ObjdData, Status } from '@/types/neuron'
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
    const GET_OBJECT_FUNC = useFunc('getObject')
    const store = useStore()
    let SET_STATUS = null
    let SET_OBJD = null
    const getStatus = (data: Status) => {
      if (!data.func && data.tstp) {
        if (data.mode !== 'INACTIVE' && !loadData.value) {
          loadData.value = true
        }
        SET_STATUS = store.commit('SET_STATUS', data)
      }
    }
    const getObject = (data: ObjdData) => {
      if (data.func === GET_OBJECT_FUNC) {
        SET_OBJD = store.commit('SET_OBJD', data.objd)
      }
    }
    ws().test().set({
      success: getStatus,
    })
    ws().set({ success: getObject }).send({ func: GET_OBJECT_FUNC })
    return {
      SET_STATUS,
      SET_OBJD,
    }
  },
})
</script>
