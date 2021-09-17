<template>
  <emqx-menu mode="horizontal" :default-active="index">
    <emqx-submenu
      v-for="item in menu"
      :key="item.name"
      :index="item.name"
      popper-class="neuron-menu"
      @click="active(item)"
    >
      <template v-slot:title>{{ item.title }}</template>
      <template v-for="(subMenu, subIndex) in item.children" :key="subMenu.name">
        <emqx-menu-item :index="subMenu.name" @click="active(subMenu)" v-show="!subMenu.meta.hide">
          {{ subMenu.title }}
        </emqx-menu-item>
        <div v-if="item.name === 'Administration' && subIndex === 0" :key="subIndex">
          <emqx-menu-item @click="licensedialogVisible = true">License</emqx-menu-item>
          <emqx-menu-item @click="loadData(74)">{{ $t('common.about') }}</emqx-menu-item>
          <emqx-menu-item @click="showLangDialog = true">{{ $t('common.lang') }}</emqx-menu-item>
        </div>
      </template>
    </emqx-submenu>
    <About ref="about" />
  </emqx-menu>
  <license-dialog v-model="licensedialogVisible" />
  <lang-dialog v-model="showLangDialog" />
</template>

<script>
import { mapMutations } from 'vuex'
import { menu } from '@/router/menu'
import { getData } from '@/api/data.js'
import About from './about'
import { EmqxMessage } from '@emqx/emqx-ui'
import LicenseDialog from '@/pages/menus/Administration/components/LicenseDialog.vue'
import LangDialog from '@/pages/menus/Administration/components/LangDialog.vue'

export default {
  components: {
    About,
    LicenseDialog,
    LangDialog,
  },
  data() {
    return {
      menu,
      curFunc: 0,
      key: '',
      licensedialogVisible: false,
      showLangDialog: false,
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    index() {
      let index = ''
      const tmp = this.routeName.split('-')
      if (tmp[1] && tmp[1] === 'index') {
        index = tmp[0]
      } else {
        index = this.routeName
      }
      return index
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  methods: {
    ...mapMutations(['setSideMenu']),
    // 跳转
    active(item) {
      const { name } = item
      if (this.routeName === name || (item.redirect && item.redirect.name === this.routeName)) {
        return
      }
      if (name === '') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ name })
      }
    },
    loadData(func) {
      this.curFunc = func
      getData(this.nodeId, { func, wtrm: 'neruon' }).then((res) => {
        this.setData(res.data)
      })
    },
    setData(data) {
      if (data.errc !== 0) {
        EmqxMessage.error(data.emsg)
      } else if (data.func === this.curFunc) {
        if (data.func === 74) {
          this.$refs.about.showDialog(data)
        }
      }
    },
  },
}
</script>

<style lang="scss">
.neuron-menu {
  .emqx-menu-item.emqx-menu-item.is-active {
    background: #fff;
    box-shadow: none;
  }
}
</style>
