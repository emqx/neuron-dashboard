<template>
  <emqx-menu class="el-menu-vertical-demo side-nav" router :default-active="actvieMenu">
    <template v-for="(nav, index) in navList">
      <emqx-menu-item class="nav-item" v-if="!nav.subMenus" style="padding-left: 0" :key="index" :index="nav.to">
        <div class="nav-item-content">
          <i class="nav-icon iconfont" :class="nav.icon"></i>
          <span class="nav-label ellipsis">{{ nav.label }}</span>
        </div>
      </emqx-menu-item>
      <emqx-submenu v-else :key="nav.to" :index="nav.to">
        <template #title>
          <div class="nav-item-content">
            <i class="nav-icon iconfont" :class="nav.icon"></i>
            <span class="nav-label ellipsis">{{ nav.label }}</span>
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
              <span class="nav-label ellipsis">{{ subMenuItem.label }}</span>
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
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SideNav',
  components: {
    // StatusBar,
  },
  setup() {
    const { t } = useI18n()
    const state = reactive({
      navList: [
        // {
        //   to: '/overview',
        //   label: t('common.home'),
        //   icon: 'iconattributed',
        // },
        {
          to: '/monitoring/data',
          label: t('data.monitoring'),
          icon: 'iconstatus',
          subMenus: [
            {
              to: '/monitoring/data',
              label: t('data.dataMonitoring'),
            },
          ],
        },
        {
          to: '/configuration',
          label: t('config.config'),
          icon: 'iconconfig',
          subMenus: [
            {
              to: '/configuration/north-driver',
              label: t('config.northAppSetup'),
            },
            {
              to: '/configuration/south-driver',
              label: t('config.southDeviceManagement'),
            },
            {
              to: '/configuration/plugin',
              label: t('config.pluginManagement'),
            },
          ],
        },
        {
          to: '/ekuiper',
          label: t('ekuiper.streamProcessing'),
          icon: 'iconstream',
          subMenus: [
            {
              to: '/ekuiper/nodes/single-node/rules',
              label: t('ekuiper.rule'),
            },
            {
              to: '/ekuiper/nodes/single-node/extension',
              label: t('ekuiper.extension'),
            },
          ],
        },
        {
          to: '/admin',
          label: t('admin.admin'),
          icon: 'iconAdministration1',
          subMenus: [
            {
              to: '/admin/account-settings',
              label: t('common.accountSettings'),
            },
            // {
            //   to: '/admin/log',
            //   label: t('admin.log'),
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
