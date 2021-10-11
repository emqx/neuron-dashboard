<template>
  <emqx-card class="overview">
    <h3 class="card-title">{{ $t('common.home') }}</h3>
    <div class="overview-body">
      <div class="row up">
        <SetupItemCard class="row-block" v-for="item in showList(northDriverList)" :data="item" :key="item.id" />
        <router-link class="row-link north" :to="{ name: 'NorthDriver' }">{{ northDriverLinkText }}</router-link>
      </div>
      <div class="canvas-container">
        <div class="edge-canvas up" ref="upEdgeContentEl"></div>
      </div>
      <div class="row center">
        <NeuronInfoCard />
      </div>
      <div class="canvas-container">
        <div class="edge-canvas down" ref="downEdgeContentEl"></div>
      </div>
      <div class="row down">
        <SouthDriveItemCard class="row-block" v-for="item in showList(southDriverList)" :data="item" :key="item.id" />
        <router-link class="row-link south" :to="{ name: 'SouthDriver' }">{{ southDriverLinkText }}</router-link>
      </div>
    </div>
  </emqx-card>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import useNorthDriver from '@/composables/config/useNorthDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import useDrawEdge from '@/composables/useDrawEdge'
import { DriverItem } from '@/types/config'
import { DriverData } from '@/types/neuron'
import SetupItemCard from '@/views/config/northDriver/components/SetupItemCard.vue'
import SouthDriveItemCard from '@/views/config/southDriver/components/SouthDriveItemCard.vue'
import { computed } from '@vue/reactivity'
import { useI18n } from 'vue-i18n'
import NeuronInfoCard from './components/NeuronInfoCard.vue'

const { t } = useI18n()

const { northDriverList, getNorthDriverList } = useNorthDriver(false)
const { southDriverList, getSouthDriverList } = useSouthDriver(false)

const { upEdgeContentEl, downEdgeContentEl, draw } = useDrawEdge()

const northDriverLinkText = computed(() =>
  northDriverList.value.length > 3 ? t('config.moreApp') : t('config.northApp'),
)
const southDriverLinkText = computed(() =>
  southDriverList.value.length > 3 ? t('config.moreDriver') : t('config.southDriver'),
)

const showList = (list: Array<DriverItem>) => list.slice(0, 3)

onMounted(async () => {
  await Promise.all([getSouthDriverList(), getNorthDriverList()])
  draw(northDriverList.value.length, southDriverList.value.length)
})
</script>

<style lang="scss">
.overview {
  $btn-more-width: 88px;
  // If you change the value here,
  // also change the relevant value in the src/composables/useDrawEdge.ts file
  $block-distance: 24px;
  .row,
  .canvas-container {
    padding-right: $btn-more-width + $block-distance;
  }
  .edge-canvas {
    position: relative;
    left: 0;
    z-index: 1;
    &.up {
      top: -5px;
    }
    &.down {
      bottom: -5px;
    }
  }
  .row {
    display: flex;
    justify-content: center;
    position: relative;
  }
  .row-block {
    box-sizing: border-box;
    width: calc((100% - 2 * $block-distance) / 3);
    flex-grow: 0;
    &:not(:last-of-type) {
      margin-right: $block-distance;
    }
  }
  .center {
    display: flex;
    justify-content: center;
  }
  .edge-canvas {
    height: 60px;
  }
  .row-link {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: $btn-more-width;
    text-align: center;
    text-decoration: none;
    color: #189bfe;
    &.north {
      background-color: #f6fcff;
    }
    &.south {
      background-color: #f3f3ff;
    }
  }
  .x6-edge > * {
    cursor: inherit !important;
  }
}
</style>
