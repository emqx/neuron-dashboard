<template>
  <el-menu mode="horizontal" :default-active="index">
    <template v-for="item in menu">
      <template v-if="item.children.length > 1">
        <el-submenu :key="item.name" :index="item.name" @click.native="active(item)">
          <template slot="title">{{ formatName(item.title) }}</template>
          <template v-for="(subMenu, subIndex) in item.children">
            <el-menu-item
              :index="subMenu.name"
              @click.native="active(subMenu)"
              v-show="!subMenu.meta.hide"
              :key="subMenu.name"
            >
              {{ subMenu.title }}
            </el-menu-item>
            <div v-if="item.name === 'Administration' && subIndex === 2" :key="subIndex">
              <el-menu-item @click="getData(74)">{{ $t('common.about') }}</el-menu-item>
            </div>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="item.name" :index="item.name" @click.native="active(item)">
          {{ formatName(item.title) }}
        </el-menu-item>
      </template>
    </template>
    <About ref="about" />
  </el-menu>
</template>

<script>
import { formatName } from '@/utils'
import { mapMutations } from 'vuex'
import { menu } from '@/router/menu'
export default {
  data() {
    return {
      menu,
      curFunc: 0,
      key: '',
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    index() {
      let index = ''
      let tmp = this.routeName.split('-')
      if (tmp[1] && tmp[1] === 'index') {
        index = tmp[0]
      } else {
        index = this.routeName
      }
      return index
    },
  },
  methods: {
    ...mapMutations(['setSideMenu']),
    // 跳转
    active(item) {
      let { name } = item
      if (this.routeName === name || (item.redirect && item.redirect.name === this.routeName)) {
        return
      }
      if (name === 'Administration-logout') {
        const currentUser = JSON.parse(sessionStorage.getItem('user'))
        const logoutInfo = {
          func: 11,
          name: currentUser.name,
        }
        this.$confirm(this.$t('common.confirmLogout'), this.$t('common.logout'), {
          type: 'warning',
        })
          .then(() => {
            this.$ws()
              .set({
                success: (data) => {
                  if (data.func === 11 && data.errc === 0) {
                    sessionStorage.removeItem('user')
                    localStorage.removeItem('chnl')
                    localStorage.removeItem('objectData')
                    localStorage.removeItem('eventData')
                    this.$router.push({ name })
                    this.$ws().close()
                  }
                },
              })
              .send(logoutInfo)
          })
          .catch()
      } else if (name === '') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ name })
      }
    },
    formatName(title) {
      return formatName(title)
    },
    getData(func) {
      this.curFunc = func
      this.$ws().set({ success: this.setData }).send({ func })
    },
    setData(data) {
      if (data.func === this.curFunc) {
        this.$ws().remove(this.setData)
        if (data.func === 74) {
          this.$refs['about'].showDialog(data)
        }
      }
    },
  },
  components: {
    About: () => import('./about'),
  },
}
</script>

<style scoped lang="scss"></style>
