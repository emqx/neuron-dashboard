<template>
  <article v-emqx-loading="isListLoading">
    <PageTitle :title="$t('config.templateManagement')" />

    <ViewHeaderBar class="tempalte-remark">
      <template v-slot:left>
        <span class="header-item">{{ $t('template.templateRemark') }}</span>
      </template>
      <template v-slot:right>
        <!-- TODO: support when template usage document is ready-->
        <!-- <el-link type="primary" :underline="false" href="javascript:;" class="header-item">
          <i class="el-icon-document"></i>
          {{ $t('template.templateLink') }}
        </el-link> -->
      </template>
    </ViewHeaderBar>

    <ViewHeaderBar>
      <template v-slot:right>
        <emqx-button
          v-if="isAdminUser"
          type="primary"
          size="small"
          icon="iconfont iconcreate"
          class="header-item btn"
          @click="showTemplateDialog"
        >
          {{ $t('template.addTemplate') }}
        </emqx-button>
      </template>
      <template v-slot:left>
        <emqx-dropdown v-if="isAdminUser" :hide-timeout="512" popper-class="btn-download-temp-popper">
          <emqx-upload
            action=""
            :before-upload="importFile"
            :show-file-list="false"
            :accept="'application/json'"
            class="uploader"
          >
            <emqx-button size="small" class="header-item btn">
              <i class="iconfont icon-import icondownload"></i>
              <span>{{ $t('template.importTemplate') }}</span>
            </emqx-button>
          </emqx-upload>
        </emqx-dropdown>
      </template>
    </ViewHeaderBar>

    <emqx-empty v-if="!isListLoading && templateList.length === 0" class="empty" />
    <emqx-table
      v-else
      :data="templateList"
      :empty-text="$t('common.emptyData')"
      :row-class-name="'table-row-click'"
      @row-click="goGroupPage"
    >
      <emqx-table-column :label="$t('common.name')" prop="name" show-overflow-tooltip>
        <template #default="{ row }">
          <el-link type="primary" :underline="false" href="javascript:;" @click="goGroupPage(row)">
            {{ row.name }}
          </el-link>
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.plugin')" prop="plugin" />
      <emqx-table-column align="left" :label="$t('common.oper')" width="220px">
        <template #default="{ row }">
          <div class="operator-wrap">
            <!-- TODO -->
            <!-- <AComWithDesc v-if="isAdminUser" :content="$t('common.edit')">
              <i class="el-icon-edit-outline" @click.stop="editTemplate(row)" />
            </AComWithDesc> -->
            <AComWithDesc :content="$t('common.export')">
              <i class="iconfont icon-import iconsubmit" @click.stop="exportTemplate(row)" />
            </AComWithDesc>
            <AComWithDesc v-if="isAdminUser" :content="$t('common.delete')">
              <i class="iconfont icondelete" @click.stop="removeTemplate(row)" />
            </AComWithDesc>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>
  </article>

  <!-- add | edit | import -->
  <TemplateDialog
    v-model="templateDialogVisible"
    :isEdit="isEditTemplate"
    :isImport="isImportTemplate"
    :templateData="editTemplateData"
    @submitted="getTemplateList"
    @cancel="cancelOperateTemplate"
  />
</template>

<script lang="ts" setup>
import { ElLink } from 'element-plus'
import AComWithDesc from '@/components/AComWithDesc.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import useTemplateList from '@/composables/config/useTemplateList'
import TemplateDialog from './components/TemplateDialog.vue'
import PageTitle from '@/components/PageTitle.vue'
import useUser from '@/composables/useUser'

const { isAdminUser } = useUser()

const {
  templateList,
  isListLoading,
  getTemplateList,
  templateDialogVisible,
  showTemplateDialog,
  goGroupPage,
  exportTemplate,
  removeTemplate,
  importFile,
  isImportTemplate,
  editTemplateData,
  isEditTemplate,
  cancelOperateTemplate,
} = useTemplateList()
</script>

<style lang="scss" scoped>
.tempalte-remark {
  margin-bottom: 4px;
  color: var(--main-label-color);
}
</style>
