<template>
  <div class="main">
    <Header />
    <emqx-container normal fixed-nav class="body" :page-min-width="1250">
      <template #nav>
        <side-nav></side-nav>
      </template>
      <template #page-content>
        <div>
          <router-view />
          <!-- For eKuiper -->
          <emqx-card v-if="isKuiperPage">
            <h3 class="card-title">{{ pageTitle }}</h3>
            <div id="page-content"></div>
          </emqx-card>
        </div>
      </template>
    </emqx-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import useEKuiper from '@/composables/ekuiper/useEKuiper'
import { isKuiperPath } from '@/utils/forEKuiper'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideNav,
  },
  setup() {
    const route = useRoute()
    const isKuiperPage = computed(() => isKuiperPath(route.path))
    const { pageTitle } = useEKuiper()
    return {
      isKuiperPage,
      pageTitle,
    }
  },
})
</script>
