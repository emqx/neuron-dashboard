<template>
  <div class="main">
    <Header />
    <emqx-container normal fixed-nav class="body" :page-min-width="1250">
      <template #nav>
        <side-nav></side-nav>
      </template>
      <template #page-content>
        <div class="neuron-content-container">
          <Breadcrumb />
          <router-view />
          <!-- For eKuiper -->
          <emqx-card class="page-noraml-card" v-if="isKuiperPage" v-emqx-loading="isSubAppLoading">
            <!-- <h3 class="card-title">{{ pageTitle }}</h3> -->
            <div id="page-content">
              <div></div>
            </div>
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
// import useEKuiper from '@/composables/ekuiper/useEKuiper'
import { isKuiperPath } from '@/utils/forEKuiper'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideNav,
    Breadcrumb,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const isKuiperPage = computed(() => isKuiperPath(route.path))
    const isSubAppLoading = computed(() => store.state.isSubAppLoading)
    // const { pageTitle } = useEKuiper()
    return {
      isKuiperPage,
      isSubAppLoading,
      // pageTitle,
    }
  },
})
</script>
