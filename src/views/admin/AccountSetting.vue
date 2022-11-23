<template>
  <emqx-card class="account-setting">
    <h3 class="card-title">{{ $t('common.accountSettings') }}</h3>
    <div>
      <h6 class="sub-block-title">{{ $t('common.lang') }}</h6>
      <emqx-row>
        <emqx-col :span="12">
          <emqx-select v-model="lang">
            <emqx-option v-for="item in langOptionList" :key="item.label" :value="item.value" :label="item.label" />
          </emqx-select>
        </emqx-col>
      </emqx-row>
    </div>
  </emqx-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import store from '@/store'
import i18n from '../../i18n/index'
// import { useI18n } from 'vue-i18n'
import { setDocumentTitle } from '@/utils/utils'

// const { locale } = useI18n()

const langOptionList = [
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
]

const lang = computed({
  get() {
    return store.state.lang
  },
  set(val: string) {
    store.commit('SET_LANG', val)
    i18n.global.locale.value = val
    // locale.value = val
    // set document title
    setDocumentTitle(val)
  },
})
</script>

<style lang="scss">
.account-setting {
  min-height: 500px;
  .sub-block-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
