<template>
  <div style='height: 100%;position: relative;'>
    <div :style="{ height: `${asideHeight}px` }">
      <el-menu :collapse="collapse"
               :default-active='routeName'
               @select="active">
        <template v-for="(menu, index) in sideMenu">
          <!--没有子菜单-->
          <MenuItem :key="index"
                    v-if="menu.children === undefined && menu.name !== undefined"
                    :menu='menu' />
          <!--有子菜单-->
          <el-submenu :key="index"
                      :index="String(index)"
                      v-if="menu.children">
            <template slot="title">
              <Icon :name='menu.icon'></Icon>
              <span slot="title">{{menu.title}}</span>
            </template>
            <template v-for="(menuItem, menuItemIndex) in menu.children">
              <MenuItem :key="menuItemIndex"
                        v-if="!menuItem.children && menuItem.title"
                        :menu='menuItem'
                        :class="{'is-active': menuItem.name === routeName}" />
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 插件
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      asideHeight: 300
    }
  },
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    ...mapState({
      sideMenu: state => state.menu.sideMenu
    })
  },
  components: {
    MenuItem: () => import('../MenuItem')
  },
  mounted () {
    this.scrollInit()
    this.updateAsideHeight()
    window.onresize = () => {
      this.updateAsideHeight()
    }
  },
  beforeDestroy () {
    this.scrollDestroy()
    window.onresize = () => { }
  },
  methods: {
    active (name) {
      this.$router.push({ name })
    },
    updateAsideHeight () {
      this.asideHeight = this.$el.offsetHeight
    },
    scrollInit () {
      this.BS = new BScroll(this.$el.childNodes[0], {
        mouseWheel: true,
        scrollbar: {
          fade: true,
          interactive: false
        }
      })
    },
    scrollDestroy () {
      if (this.BS) {
        this.BS.destroy()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.side-menu-wrap {
  height: 100%;
  position: relative;
}
</style>
