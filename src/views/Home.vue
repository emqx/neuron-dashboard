<template>
  <div class="main">
    <Header v-if="!isSubApp" class="header" />
    <main class="body" :class="{ 'as-sub-app': isSubApp }">
      <div v-if="!isSubApp" class="nav-container">
        <side-nav class="sidebar"></side-nav>
      </div>
      <div class="neuron-content-container" :class="{ 'as-sub-app': isSubApp }">
        <Breadcrumb class="breadcrumb" />
        <router-view />
        <!-- For eKuiper -->
        <section class="page-noraml-card" v-if="isKuiperPage" v-emqx-loading="isSubAppLoading">
          <PageTitle :title="pageTitle" />
          <div id="page-content">
            <div></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
import { useStore } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { isKuiperPath } from '@/utils/forEKuiper'
import { useRoute } from 'vue-router'
import { isSubApp } from '@/utils/forToBeSubApp'
import useEKuiper from '@/composables/ekuiper/useEKuiper'
import PageTitle from '@/components/PageTitle.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideNav,
    Breadcrumb,
    PageTitle,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const isKuiperPage = computed(() => isKuiperPath(route.path))

    const { pageTitle } = useEKuiper()

    const isSubAppLoading = computed(() => store.state.isSubAppLoading)

    return {
      isKuiperPage,
      isSubAppLoading,

      isSubApp,
      pageTitle,
    }
  },
})
</script>
