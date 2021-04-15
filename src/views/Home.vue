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
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import SideNav from '@/components/SideNav.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    SideNav,
  },
})
</script>
