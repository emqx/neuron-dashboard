<template>
  <emqx-card class="group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('template.templateName') }}</label>
          <span>{{ template }}</span>
          <!-- <i class="el-icon-edit icon-edit" :title="$t('common.edit')" @click="editNodeName" /> -->
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <emqx-dropdown :hide-timeout="512" popper-class="btn-download-temp-popper">
            <emqx-upload
              class="uploader-tag"
              :before-upload="importTagsByGroups"
              :show-file-list="false"
              action="placeholder"
            >
              <emqx-button size="small">
                <i class="iconfont icon-import icondownload"></i>
                <span>{{ $t('common.import') }}</span>
              </emqx-button>
            </emqx-upload>
            <template #dropdown>
              <emqx-dropdown-menu>
                <emqx-button plain class="btn-download-temp" @click="downloadTemplate">
                  <span>{{ $t('config.downloadTemplate') }}</span>
                </emqx-button>
              </emqx-dropdown-menu>
            </template>
          </emqx-dropdown>

          <!-- :loading="isExporting" -->
          <emqx-button
            size="small"
            class="export-tags--btn"
            :disabled="!groupCheckedList.length"
            @click="ExportTagsByGroups"
          >
            <i class="iconfont icon-import iconsubmit"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button>
          <emqx-button size="small" type="primary" @click="addGroup">
            {{ $t('common.create') }}
          </emqx-button>
          <emqx-button size="small" type="warning" :disabled="!groupList.length" @click="clearGroup">{{
            $t('common.clear')
          }}</emqx-button>
          <emqx-button size="small" type="danger" :disabled="!groupCheckedList.length" @click="batchDeleteGroup">{{
            $t('common.delete')
          }}</emqx-button>
        </div>
      </div>
    </div>

    <emqx-table
      :data="groupList"
      :empty-text="$t('common.emptyData')"
      :row-class-name="'table-row-click'"
      @row-click="goTagPage"
    >
      <emqx-table-column :width="28">
        <template #header>
          <emqx-checkbox v-model="allChecked" />
        </template>
        <template #default="{ row }">
          <emqx-checkbox v-model="row.checked" @click.stop="() => {}" />
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('common.No')" :width="60">
        <template #default="{ index }">{{ index + 1 }}</template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.groupName')" prop="name">
        <template #default="{ row }">
          <el-link type="primary" :underline="false" href="javascript:;" @click.stop="goTagPage(row)">
            {{ row.name }}
          </el-link>
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.tagCounts')" prop="tag_count"></emqx-table-column>
      <emqx-table-column :label="$t('config.interval')" prop="interval"></emqx-table-column>
      <emqx-table-column align="left" :label="$t('common.oper')" width="140px">
        <template #default="{ row }">
          <div class="operator-wrap">
            <AComWithDesc :content="$t('common.edit')">
              <i class="el-icon-edit-outline" @click.stop="operatorGroup(row, true)" />
            </AComWithDesc>
            <AComWithDesc :content="$t('common.delete')">
              <i class="iconfont icondelete" @click.stop="delGroup(row)" />
            </AComWithDesc>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
</template>

<script lang="ts" setup>
// import type { Ref } from 'vue'
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { ElLink } from 'element-plus'
import AComWithDesc from '@/components/AComWithDesc.vue'
import useGroupList from '@/composables/config/useTemplateGroupList'
import type { GroupData } from '@/types/config'

// const router = useRouter()

const {
  template,
  isListLoading,
  groupList,
  groupCheckedList,
  allChecked,

  delGroup,
  batchDeleteGroup,
  clearGroup,

  downloadTemplate,
  importTagsByGroups,
  ExportTagsByGroups,

  goTagPage,
} = useGroupList()

// const showGroupDialog = ref(false)
// const isEditGroup = ref(false)
// const currentGroup: Ref<GroupForm | undefined> = ref(undefined)

const addGroup = () => {
  // TODO
  // currentGroup.value = undefined
  // showGroupDialog.value = true
}

// // view | edit group
const operatorGroup = ({ name, interval, group }: GroupData, isEdit?: boolean) => {
  // TODO
  console.log('name, interval, group', name, interval, group, isEdit)

  // isEditGroup.value = !!isEdit
  // currentGroup.value = {
  //   interval,
  //   name,
  //   template: template.value,
  //   group,
  // }
  // showGroupDialog.value = true
}
</script>

<style lang="scss" scoped>
.driver-name {
  margin-right: 22px;
}
.btn-group {
  &:not(:last-child) {
    margin-right: 32px;
  }
}

.uploader-tag,
.export-tags--btn {
  display: inline-block;
  margin-left: 10px;
}

.btn-download-temp-popper .el-dropdown-menu {
  padding: 0;
}
.btn-download-temp {
  font-weight: normal;
  border: none;
}
</style>
