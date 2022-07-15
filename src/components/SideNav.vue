<template>
  <emqx-menu class="el-menu-vertical-demo side-nav" router :default-active="actvieMenu">
    <template v-for="(nav, index) in navList">
      <emqx-menu-item class="nav-item" v-if="!nav.subMenus" style="padding-left: 0" :key="index" :index="nav.to">
        <div class="nav-item-content">
          <i class="nav-icon iconfont" :class="nav.icon"></i>
          <span class="nav-label ellipsis">{{ $t(`${nav.label}`) }}</span>
        </div>
      </emqx-menu-item>
      <emqx-submenu v-else :key="nav.to" :index="nav.to">
        <template #title>
          <div class="nav-item-content">
            <i class="nav-icon iconfont" :class="nav.icon"></i>
            <span class="nav-label ellipsis">{{ $t(`${nav.label}`) }}</span>
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
              <span class="nav-label ellipsis">{{ $t(`${subMenuItem.label}`) }}</span>
            </div>
          </emqx-menu-item>
        </div>
      </emqx-submenu>
    </template>
  </emqx-menu>
  <!-- <status-bar></status-bar> -->
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideNav',
  components: {
    // StatusBar,
  },
  setup() {
    const state = reactive({
      navList: [
        // {
        //   to: '/overview',
        //   label: 'common.home',
        //   icon: 'iconattributed',
        // },
        {
          to: '/monitoring/data',
          label: 'data.monitoring',
          icon: 'iconstatus',
          subMenus: [
            {
              to: '/monitoring/data',
              label: 'data.dataMonitoring',
            },
          ],
        },
        {
          to: '/configuration',
          label: 'config.config',
          icon: 'iconconfig',
          subMenus: [
            {
              to: '/configuration/north-driver',
              label: 'config.northAppSetup',
            },
            {
              to: '/configuration/south-driver',
              label: 'config.southDeviceManagement',
            },
            {
              to: '/configuration/plugin',
              label: 'config.pluginManagement',
            },
          ],
        },
        {
          to: '/ekuiper',
          label: 'ekuiper.streamProcessing',
          icon: 'iconstream',
          subMenus: [
            {
              to: '/ekuiper/nodes/single-node/rules',
              label: 'ekuiper.rule',
            },
            {
              to: '/ekuiper/nodes/single-node/extension',
              label: 'ekuiper.extension',
            },
          ],
        },
        {
          to: '/admin',
          label: 'admin.admin',
          icon: 'iconAdministration1',
          subMenus: [
            {
              to: '/admin/account-settings',
              label: 'common.accountSettings',
            },
            // {
            //   to: '/admin/log',
            //   label: ('admin.log'),
            // },
          ],
        },
      ],
    })

    const firstLevelRoutePathArr: Array<string> = []
    const secondLevelRoutePathArr: Array<string> = []

    const actvieMenu = computed(() => {
      const currentPath = useRoute().path
      let ret = secondLevelRoutePathArr.find((item) => currentPath.match(item))
      if (ret) {
        return ret
      }
      ret = firstLevelRoutePathArr.find((item) => currentPath.match(item))
      return ret || ''
    })

    const countRoutePath = () => {
      state.navList.forEach((menu) => {
        if (menu.subMenus) {
          menu.subMenus.forEach((item) => {
            if (item.to.match(/^\/[^/]+\/[^/]+/)) {
              secondLevelRoutePathArr.push(item.to)
            } else {
              firstLevelRoutePathArr.push(item.to)
            }
          })
        } else {
          firstLevelRoutePathArr.push(menu.to)
        }
      })
    }

    countRoutePath()

    return {
      ...toRefs(state),
      actvieMenu,
    }
  },
})
</script>
