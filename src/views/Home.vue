<template>
  <div class="main">
    <Header />
    <emqx-container normal fixed-nav class="body" :page-min-width="1250">
      <template #nav>
        <side-nav></side-nav>
      </template>
      <template #page-content>
        <div>
          <Breadcrumb />
          <router-view />
        </div>
      </template>
    </emqx-container>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'
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
    const store = useStore()
    const isSubAppLoading = computed(() => store.state.isSubAppLoading)
    return {
      isSubAppLoading,
    }
  },
})
</script>
