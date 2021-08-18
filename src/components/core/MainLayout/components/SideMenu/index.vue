<template>
  <div style="height: 100%; position: relative">
    <div :style="{ height: `${asideHeight}px` }">
      <emqx-menu :collapse="collapse" :default-active="routeName" @select="active">
        <template v-for="(menu, index) in sideMenu">
          <!--没有子菜单-->
          <menu-item :key="index" v-if="menu.children === undefined && menu.name !== undefined" :menu="menu" />
          <!--有子菜单-->
          <emqx-submenu :key="index" :index="String(index)" v-if="menu.children">
            <template v-slot:title>
              <!-- FIXME:ICON -->
              <Icon :name="menu.icon"></Icon>
              <span>{{ menu.title }}</span>
            </template>
            <template v-for="(menuItem, menuItemIndex) in menu.children">
              <menu-item
                :key="menuItemIndex"
                v-if="!menuItem.children && menuItem.title"
                :menu="menuItem"
                :class="{ 'is-active': menuItem.name === routeName }"
              />
            </template>
          </emqx-submenu>
        </template>
      </emqx-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 插件
import BScroll from 'better-scroll'
import MenuItem from '../MenuItem'

export default {
  data() {
    return {
      asideHeight: 300,
    }
  },
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    ...mapState({
      sideMenu: state => state.menu.sideMenu,
    }),
  },
  components: {
    MenuItem,
  },
  mounted() {
    this.scrollInit()
    this.updateAsideHeight()
    window.onresize = () => {
      this.updateAsideHeight()
    }
  },
  beforeUnmount() {
    this.scrollDestroy()
    window.onresize = null
  },
  methods: {
    active(name) {
      this.$router.push({ name })
    },
    updateAsideHeight() {
      this.asideHeight = this.$el.offsetHeight
    },
    scrollInit() {
      this.BS = new BScroll(this.$el.childNodes[0], {
        mouseWheel: true,
        scrollbar: {
          fade: true,
          interactive: false,
        },
      })
    },
    scrollDestroy() {
      if (this.BS) {
        this.BS.destroy()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.side-menu-wrap {
  height: 100%;
  position: relative;
}
</style>
