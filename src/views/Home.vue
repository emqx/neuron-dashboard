<template>
  <div class="main">
    <Header class="header" />
    <el-main class="main-container body">
      <div class="nav-container">
        <side-nav class="sidebar"></side-nav>
      </div>
      <div class="neuron-content-container">
        <Breadcrumb class="breadcrumb" />
        <router-view />
        <!-- For eKuiper -->
        <section class="page-noraml-card" v-if="isKuiperPage" v-emqx-loading="isSubAppLoading">
          <!-- <h3 class="card-title">{{ pageTitle }}</h3> -->
          <div id="page-content">
            <div></div>
          </div>
        </section>
      </div>
    </el-main>
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
import { ElMain } from 'element-plus'

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
