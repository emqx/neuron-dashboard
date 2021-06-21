<template>
  <el-menu mode="horizontal" :default-active="index">
    <template v-for="item in menu">
      <template v-if="item.children.length > 1">
        <el-submenu :key="item.name" :index="item.name" @click.native="active(item)">
          <template slot="title">{{ item.title }}</template>
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
              <el-menu-item @click="licensedialogVisible = true">License</el-menu-item>
              <el-menu-item @click="getData(74)">{{ $t('common.about') }}</el-menu-item>
              <el-menu-item @click="showLangDialog">{{ $t('common.lang') }}</el-menu-item>
            </div>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="item.name" :index="item.name" @click.native="active(item)">
          {{ item.title }}
        </el-menu-item>
      </template>
    </template>
    <About ref="about" />
    <Lang ref="lang" />
    <el-dialog
      class="license-upload"
      :title="$t('administration.uploadLicense')"
      :visible.sync="licensedialogVisible"
      width="500px"
      @open="handleOpenDialog"
    >
      <el-upload
        class="upload-license"
        name="license"
        action="/api/v1/license"
        :headers="{
          Authorization: `Bearer ${uploadToken}`,
        }"
        :disabled="uploadToken === ''"
        :limit="1"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
      >
        <el-button :disabled="uploadToken === ''" icon="el-icon-upload" type="primary">{{
          $t('common.upload')
        }}</el-button>
      </el-upload>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapMutations } from 'vuex'
import { menu } from '@/router/menu'
import axios from 'axios'

export default {
  data() {
    return {
      menu,
      curFunc: 0,
      licensedialogVisible: false,
      uploadToken: '',
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
                    this.$store.commit('clearAlarmList')
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
    getData(func) {
      this.curFunc = func
      this.$ws().set({ success: this.setData }).send({ func })
    },
    showLangDialog() {
      this.$refs['lang'].showDialog()
    },
    setData(data) {
      if (data.func === this.curFunc) {
        this.$ws().remove(this.setData)
        if (data.func === 74) {
          this.$refs['about'].showDialog(data)
        }
      }
    },
    handleUploadSuccess() {
      this.$message.success(this.$t('common.uploadSuccess'))
      this.uploadToken = ''
    },
    handleUploadError() {
      this.$message.error(this.$t('common.uploadFailed'))
    },
    handleOpenDialog() {
      const user = JSON.parse(sessionStorage.getItem('user'))
      const body = {
        ...user,
        wtrm: 'neuron',
        func: 10,
      }
      axios.post('/api/v1/funcno10', body).then((res) => {
        this.uploadToken = res.headers.cookie
      })
    },
  },
  components: {
    About: () => import('./about'),
    Lang: () => import('./lang'),
  },
}
</script>

<style lang="scss">
.license-upload {
  .el-icon-document,
  .el-upload-list__item-name {
    color: #fff;
    &:hover,
    &:focus {
      .el-icon-document {
        color: #34c388;
      }
    }
  }
  i {
    font-size: 16px;
  }
  .el-dialog__body {
    .el-icon-warning {
      color: #ffc600;
    }
    text-align: center;
  }
}
</style>
