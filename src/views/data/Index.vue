<template>
  <div class="data">data</div>
</template>

<script lang="ts">
import useWebsocket from '@/plugins/ws/useWebsocket'
import useTeleData from '@/composables/useTeleData'
import { TeleData } from '@/types/neuron'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Data',
  setup() {
    const { ws } = useWebsocket()
    const setTeleData = (data: TeleData) => {
      if (!data.func && data.tele) {
        useTeleData(data.tele)
      }
    }
    ws().test().set({
      success: setTeleData,
    })
  },
})
</script>
