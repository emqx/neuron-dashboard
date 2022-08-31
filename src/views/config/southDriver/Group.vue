<template>
  <emqx-card class="group" v-emqx-loading="isListLoading">
    <h3 class="card-title">{{ $t('config.groupList') }}</h3>
    <div class="card-bar-under-title common-flex">
      <div class="bar-left common-flex">
        <p class="driver-name">
          <label>{{ $t('config.deviceName') }}</label>
          <span>{{ node }}</span>
          <!-- <i class="el-icon-edit icon-edit" :title="$t('common.edit')" @click="editNodeName" /> -->
        </p>
      </div>
      <div class="btns common-flex">
        <div class="btn-group">
          <!-- <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.import') }}</span>
          </emqx-button> -->
          <!-- <emqx-button size="small">
            <i class="icon iconfont"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button> -->
        </div>
        <div class="btn-group">
          <emqx-dropdown :hide-timeout="512" popper-class="btn-download-temp-popper">
            <emqx-upload class="uploader-tag" :before-upload="importTags" :show-file-list="false" action="placeholder">
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
          <emqx-button size="small" @click="ExportTagsByGroups" :loading="isExporting">
            <i class="iconfont icon-import iconsubmit"></i>
            <span>{{ $t('common.export') }}</span>
          </emqx-button>
          <emqx-button size="small" type="primary" @click="addGroup">{{ $t('common.create') }}</emqx-button>
          <emqx-button size="small" type="warning" :disabled="!groupList.length" @click="clearGroup">{{
            $t('common.clear')
          }}</emqx-button>
          <emqx-button size="small" type="danger" :disabled="!groupCheckedList.length" @click="batchDeleteGroup">{{
            $t('common.delete')
          }}</emqx-button>
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
        <template #default="{ index }">{{ index + 1 }}</template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.groupName')" prop="name"></emqx-table-column>
      <emqx-table-column label="Tag Count" prop="tag_count"></emqx-table-column>
      <emqx-table-column label="Interval" prop="interval"></emqx-table-column>
      <emqx-table-column align="right">
        <template #default="{ row }">
          <AComWithDesc :content="$t('common.edit')">
            <i class="el-icon-edit-outline" @click="operatorGroup(row, true)" />
          </AComWithDesc>
          <AComWithDesc :content="$t('config.tagList')">
            <i class="iconfont iconalarm" @click="goTagPage(row)" />
          </AComWithDesc>
          <AComWithDesc :content="$t('common.delete')">
            <i class="iconfont icondelete" @click="delGroup(row)" />
          </AComWithDesc>
        </template>
      </emqx-table-column>
    </emqx-table>
  </emqx-card>
  <GroupDialog
    v-model="showGroupDialog"
    :current-node="node"
    :group="currentGroup"
    :is-edit="isEditGroup"
    @submitted="getGroupList"
  />
</template>

<script lang="ts" setup>
import AComWithDesc from '@/components/AComWithDesc.vue'
import useGroupList from '@/composables/config/useGroupList'
import type { GroupData, GroupForm } from '@/types/config'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GroupDialog from './components/GroupDialog.vue'
import useUploadTagList from '@/composables/config/useUploadTagList'
import useExportTagTable from '@/composables/config/useExportTagTable'
import { queryTagList } from '@/api/config'

const router = useRouter()

const {
  node,
  groupList,
  groupCheckedList,
  isListLoading,
  allChecked,
  getGroupList,
  clearGroup,
  delGroup,
  batchDeleteGroup,
} = useGroupList()

const showGroupDialog = ref(false)
const isEditGroup = ref(false)
const currentGroup: Ref<GroupForm | undefined> = ref(undefined)

const { uploadTag } = useUploadTagList()
const { isExporting, exportTable } = useExportTagTable()

const addGroup = () => {
  currentGroup.value = undefined
  showGroupDialog.value = true
}

// view | edit group
const operatorGroup = ({ name, interval, group }: GroupData, isEdit?: boolean) => {
  isEditGroup.value = !!isEdit
  currentGroup.value = {
    interval,
    name,
    node: node.value,
    group,
  }
  showGroupDialog.value = true
}

const goTagPage = ({ name }: GroupData) => {
  router.push({
    name: 'SouthDriverGroupTag',
    params: { group: name },
  })
}

// import file
const importTags = (file: File) => {
  uploadTag(file, node.value)
    .then(() => {
      getGroupList()
    })
    .catch((error) => {
      // no upload empty content file
      if (error) {
        getGroupList()
      }
    })
  return Promise.reject()
}

// download template file
const downloadTemplate = () => {
  window.open('/template/upload-tag-template.xlsx', '_blank')
}

/**
 *  export file
 * TODO: Export according to the selected group
 */
const ExportTagsByGroups = async () => {
  const requesList = groupList.value.map((group: GroupData) => queryTagList(node.value, group.name))
  const AllNodeTags: any = []
  Promise.all(requesList).then((res) => {
    for (let i = 0; i < res.length; i += 1) {
      const groupName: string = groupList.value[i].name
      res[i].forEach((item) => {
        const tag = {
          ...item,
          group: groupName,
        }
        AllNodeTags.push(tag)
      })
    }
    exportTable(AllNodeTags, node.value)
  })
}
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
  .icon-edit {
    margin-left: 8px;
  }
}
.uploader-tag {
  display: inline-block;
  margin-right: 10px;
}
.btn-download-temp {
  font-weight: normal;
  border: none;
}
.btn-download-temp-popper {
  .el-dropdown-menu {
    padding: 0;
  }
}
</style>
