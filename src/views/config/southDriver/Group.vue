<template>
  <emqx-card class="group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('config.driverName') }}</label>
          <span>XXXXX</span>
        </p>
        <emqx-button size="small">{{ $t('config.editDriver') }}</emqx-button>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.import') }}</span>
          </emqx-button>
          <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button>
        </div>
        <div class="btn-group">
          <emqx-button size="small" type="primary">{{ $t('common.create') }}</emqx-button>
          <emqx-button size="small" type="warning">{{ $t('common.clear') }}</emqx-button>
          <emqx-button size="small" type="danger">{{ $t('common.delete') }}</emqx-button>
        </div>
      </div>
    </div>
    <emqx-table :data="groupList">
      <emqx-table-column :width="28">
        <template #header>
          <emqx-checkbox v-model="allChecked" />
        </template>
        <template #default="{ row }">
          <emqx-checkbox v-model="row.checked" />
        </template>
      </emqx-table-column>
      <emqx-table-column label="No" :width="60">
        <template #default="{ index }">
          {{ index + 1 }}
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.groupName')" prop="name"></emqx-table-column>
      <emqx-table-column label="Tag Count" prop="tag_count"></emqx-table-column>
      <emqx-table-column label="Update Time"> </emqx-table-column>
      <emqx-table-column align="right">
        <i class="iconfont icondisplay"></i>
        <i class="iconfont iconalarm"></i>
        <i class="iconfont icondelete" @click="delGroup"></i>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
</template>

<script lang="ts" setup>
import useGroupList from '@/composables/config/useGroupList'
const { groupList, isListLoading, allChecked, delGroup } = useGroupList()
</script>

<style lang="scss">
.group {
  .driver-name {
    margin-right: 22px;
  }
  .btn-group {
    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}
</style>
