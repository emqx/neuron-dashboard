<template>
  <el-dialog class="lang" :title="$t('common.lang')" :visible.sync="dialogVisible" width="700px">
    <el-radio-group v-model="lang">
      <el-radio label="en">English</el-radio>
      <el-radio label="zh">简体中文</el-radio>
    </el-radio-group>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">{{ $t('common.submit') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Lang',
  data() {
    return {
      dialogVisible: false,
      lang: 'en',
    }
  },
  created() {
    this.lang = this.$store.state.base.lang
  },
  methods: {
    ...mapMutations(['setLang']),
    showDialog() {
      this.dialogVisible = true
    },
    save() {
      if (this.lang === this.$store.state.base.lang) {
        return
      }
      this.setLang({ lang: this.lang })
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="scss" scoped></style>
