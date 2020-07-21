<template>
  <div class="user-form">
    <el-row>
      <el-col :span="24">
        <el-form ref="userForm"
                class="dd-mt"
                label-position="left"
                label-width="160px"
                :model="form">
          <el-form-item label="Neuron user"
                        required
                        prop="name"
                        class="form-item">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Password"
                        prop="pass"
                        required
                        class="form-item">
            <el-input v-model="form.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="Time-out(min)"
                        required
                        prop="tout"
                        class="form-item">
            <el-input v-model="form.tout"></el-input>
          </el-form-item>
          <el-form-item label="Default login level"
                        prop="defl"
                        class="form-item"
                        required>
            <el-select v-model="form.defl">
              <el-option v-for="item in options"
                        :key="item.key"
                        :label="item.label"
                        :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Levels"
                        class="form-item"
                        required>
            <el-transfer v-model="form.alwl"
                        @change='handleChange'
                        :titles='["Available levels","Allowed levels"]'
                        :data="data"></el-transfer>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
    <div class="oper-col">
      <el-button @click='handleSubmit'>submit</el-button>
    </div>
  </div>
</template>

<script>
import { UserLevels } from '@/config'
export default {
  data () {
    return {
      form: {
        name: '',
        pass: '',
        tout: '',
        alwl: [0],
        defl: 0
      },
      data: UserLevels
    }
  },
  props: {
    oper: {
      required: true,
      type: String
    }
  },
  computed: {
    options () {
      return UserLevels.filter(i => this.form.alwl.includes(i.key))
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          if (!this.form.alwl.length) {
            this.$openMessage.error('select allowed levels')
            return
          }
          const data = {
            func: 15,
            'cusr': 1,
            nalw: this.form.alwl.length,
            ...this.form,
            tout: +this.form.tout
          }
          if (this.oper === 'edit') {
            data.cusr = 0
          }
          this.$emit('submit', data)
        }
      })
    },
    handleChange (val) {
      if (!val.length) {
        this.form.defl = null
      } else if (val.length === 1) {
        this.form.defl = val[0]
      }
    },
    resetForm () {
      this.form = {
        name: '',
        pass: '',
        tout: '',
        alwl: [0],
        defl: 0
      }
      if (this.$refs.userForm) {
        this.$refs.userForm.clearValidate()
        this.$refs.userForm.resetFields()
      }
    },
    loadDetail (name) {
      const user = {
        func: 14,
        name
      }
      this.$ws().set({ success: (data) => {
        if (data.func === 14) {
          const { func, wtrm, errc, ...resetUserInfo } = data
          const currentUser = resetUserInfo
          currentUser.alwl = resetUserInfo.alwl.map((item) => item.anum)
          this.form = currentUser
          this.$refs.userForm.clearValidate()
        }
      } }).send(user)
    }
  }
}
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}
.oper-col {
  text-align: right;
  margin-top: 20px;
}
</style>
