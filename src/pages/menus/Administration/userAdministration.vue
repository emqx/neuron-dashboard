<template>
  <Container type="card-full" :scorll="false">
    <div class="row flex">
      <div class="dd-title">{{ $t('administration.userAdmin') }}</div>
      <div class="btnGroup">
        <el-button @click="dialogVisible = true">{{ $t('common.add') }}</el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="name" :label="$t('common.username')" />
      <el-table-column :label="$t('common.actions')" width="280px">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleRemove(scope.row)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="!isEdit ? $t('administration.addNewUser') : $t('administration.editUser')"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="700px"
      @closed="close"
      @opened="opened"
    >
      <UserForm ref="userForm" :oper="isEdit ? 'edit' : 'add'" @submit="save" />
    </el-dialog>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
export default {
  mixins: [Mixins],
  components: {
    UserForm: () => import('./components/userForm'),
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      isEdit: false,
      currentName: '',
    }
  },
  methods: {
    setData(data) {
      if (data.func === 13) {
        if (data.user) {
          this.tableData = data.user.map((item) => ({
            name: item,
          }))
        } else {
          this.tableData = []
        }
      }
    },
    handleRemove({ name }) {
      this.$confirm(this.$t('common.confirmDelete'), this.$t('common.delete'), {
        type: 'warning',
      })
        .then(() => {
          const user = {
            func: 16,
            name,
          }
          this.$ws().set({ success: this.setUser }).send(user)
        })
        .catch(() => {})
    },
    handleChange({ name }) {
      this.currentName = name
      this.isEdit = true
      this.dialogVisible = true
    },
    close() {
      this.currentName = ''
      this.isEdit = false
      this.$refs.userForm && this.$refs.userForm.resetForm()
    },
    save(user) {
      this.$ws().set({ success: this.setUser }).send(user)
      this.dialogVisible = false
    },
    setUser(data) {
      if (data.func === 15 || data.func === 16) {
        this.$ws().remove(this.setUser)
        if (!data.errc) {
          this.$openMessage.success('Success')
        }
        this.$ws().set({ success: this.setData }).send({ func: 13 })
      }
    },
    opened() {
      if (this.isEdit) {
        this.$refs.userForm.loadDetail(this.currentName)
      } else {
        this.$refs.userForm.resetForm()
      }
    },
  },
  mounted() {
    this.$ws().set({ success: this.setData }).send({ func: 13 })
  },
}
</script>
