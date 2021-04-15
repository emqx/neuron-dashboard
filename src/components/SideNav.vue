<template>
  <emqx-menu class="el-menu-vertical-demo side-nav" router :default-active="actvieMenu">
    <template v-for="(nav, index) in navList">
      <emqx-menu-item class="nav-item" v-if="!nav.subMenus" style="padding-left: 0" :key="index" :index="nav.label">
        <div class="nav-item-content">
          <i class="nav-icon iconfont" :class="nav.icon"></i>
          <span class="nav-label">{{ nav.label }}</span>
        </div>
      </emqx-menu-item>
      <emqx-submenu v-else :key="nav.to" :index="nav.label">
        <template #title>
          <div class="nav-item-content">
            <i class="nav-icon iconfont" :class="nav.icon"></i>
            <span class="nav-label">{{ nav.label }}</span>
          </div>
        </template>
        <div class="sub-menu-list">
          <emqx-menu-item
            class="nav-item"
            v-for="(subMenuItem, index) in nav.subMenus"
            :key="index"
            :index="subMenuItem.to"
          >
            <div class="nav-item-content">
              <span class="nav-label">{{ subMenuItem.label }}</span>
            </div>
          </emqx-menu-item>
        </div>
      </emqx-submenu>
    </template>
  </emqx-menu>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideNav',
  setup() {
    const state = reactive({
      navList: [],
    })
    const actvieMenu = computed(() => {
      const firstLevelPath = useRoute().path.match(/^\/[^/]+/)
      return firstLevelPath ? firstLevelPath[0] : ''
    })
    return {
      ...toRefs(state),
      actvieMenu,
    }
  },
})
</script>

<style lang="scss"></style>
