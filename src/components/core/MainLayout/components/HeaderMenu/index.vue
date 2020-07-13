<template>
  <el-menu mode="horizontal"
           :default-active="index">
    <template v-for="item in menu">
      <template v-if="item.children.length>1">
        <el-submenu :key="item.name"
                    :index="item.name"
                    @click.native="active(item)">
          <template slot="title">{{formatName(item.title)}}</template>
          <template v-for="(subMenu,subIndex) in item.children">
            <el-menu-item :index="subMenu.name"
                          @click.native="active(subMenu)"
                          v-if="!subMenu.meta.hide"
                          :key='subMenu.name'>
              {{subMenu.title}}
            </el-menu-item>
            <div v-if="item.name==='Administration' && subIndex===2" :key="subIndex">
              <el-menu-item @click='getData(90)'>Request License</el-menu-item>
              <el-menu-item @click='getData(91)'>Extension License</el-menu-item>
              <el-menu-item @click='getData(74)'>About</el-menu-item>
            </div>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="item.name"
                      :index="item.name"
                      @click.native="active(item)">
          {{formatName(item.title)}}
        </el-menu-item>
      </template>
    </template>
    <About ref='about' />
    <el-dialog title='Request License'
               :visible.sync="dialogVisible"
               width="700px">
      <p>{{key}}</p>
    </el-dialog>
    <el-dialog title='Extension License'
               :visible.sync="dialogVisible1"
               width="700px">
      <el-input type="textarea"
                :rows="8"
                v-model="license">
      </el-input>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="handleSubmit">submit</el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
import { formatName } from '@/utils'
import { mapMutations } from 'vuex'
import { menu } from '@/router/menu'
export default {
  data () {
    return {
      menu,
      curFunc: 0,
      dialogVisible: false,
      dialogVisible1: false,
      key: '',
      license: ''
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    index () {
      let index = ''
      let tmp = this.routeName.split('-')
      if (tmp[1] && tmp[1] === 'index') {
        index = tmp[0]
      } else {
        index = this.routeName
      }
      return index
    }
  },
  methods: {
    ...mapMutations([
      'setSideMenu'
    ]),
    // 跳转
    active (item) {
      let name = item.name
      if (this.routeName === name || (item.redirect && item.redirect.name === this.routeName)) {
        return
      }
      if (name === 'Administration-logout') {
        const currentUser = JSON.parse(sessionStorage.getItem('user'))
        const logoutInfo = {
          func: 11,
          name: currentUser.name
        }
        this.$confirm('Are you sure logout?', 'Logout', {
          type: 'warning'
        }).then(() => {
          this.$ws().set({ success: (data) => {
            if (data.func === 11 && data.errc === 0) {
              this.$router.push({ name })
              this.$ws().close()
            }
          } }).send(logoutInfo)
        }).catch()
      } else if (name === '') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ name })
      }
    },
    formatName (title) {
      return formatName(title)
    },
    getData (func) {
      this.curFunc = func
      if (func !== 91) {
        this.$ws().set({ success: this.setData }).send({ func })
      } else {
        this.dialogVisible1 = true
      }
    },
    setData (data) {
      if (data.func === this.curFunc) {
        this.$ws().remove(this.setData)
        switch (data.func) {
          case 74:
            this.$refs['about'].showDialog(data)
            break
          case 90:
            this.key = data.keyv
            this.dialogVisible = true
            break
          case 91:
            break
        }
      }
    },
    handleSubmit () {
      this.$ws().send({ func: 91, keyv: this.license })
      this.dialogVisible1 = false
    }
  },
  components: {
    About: () => import('./about')
  }
}
</script>

<style scoped lang="scss">
</style>
