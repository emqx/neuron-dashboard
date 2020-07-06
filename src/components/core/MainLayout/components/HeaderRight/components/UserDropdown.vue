<template>
  <el-dropdown class="dd-mr">
    <span class="el-dropdown-link">
      您好<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <!-- <el-dropdown-item @click.native="active('demo-business-user-center-home')">
        <Icon name="user-circle-o" /> user</el-dropdown-item> -->
      <el-dropdown-item @click.native="loginOut">
        <Icon name="power-off"></Icon> logout
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  methods: {
    active (name) {
      this.$router.push({
        name: name
      })
    },
    loginOut () {
      this.$confirm('Are you sure logout', 'Logout', {
        type: 'warning'
      }).then(() => {
        this.$ws().close()
        this.$router.push({
          name: 'login'
        })
      }).catch()
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
