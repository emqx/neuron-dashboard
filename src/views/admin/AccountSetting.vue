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
  set(val) {
    store.commit('SET_LANG', val)
    location.reload()
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
