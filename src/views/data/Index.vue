<template>
  <div class="data">data</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useWebsocket from '@/plugins/ws/useWebsocket'
import { NeuronData } from '@/types/neuron'

export default defineComponent({
  name: 'Data',
  setup() {
    const { ws } = useWebsocket()
    const setData = (res: NeuronData) => {
      console.log('data', res)
    }
    const initData = () => {
      ws().test().set({
        success: setData,
      })
    }
    initData()
  },
})
</script>
