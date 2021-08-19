<template>
  <el-dialog custom-class="lang" :title="$t('common.lang')" v-model="dialogVisible" width="700px">
    <emqx-radio-group v-model="lang">
      <emqx-radio label="en">English</emqx-radio>
      <emqx-radio label="zh">简体中文</emqx-radio>
    </emqx-radio-group>
    <template #footer>
      <div class="dialog-footer">
        <emqx-button type="primary" @click="save">{{ $t('common.submit') }}</emqx-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import { ElDialog } from 'element-plus'

export default {
  name: 'LangDialog',
  components: {
    ElDialog,
  },
  props: {
    modelValue: { type: Boolean },
  },
  data() {
    return {
      lang: 'en',
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
  created() {
    this.lang = this.$store.state.base.lang
  },
  methods: {
    ...mapMutations(['setLang']),
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
