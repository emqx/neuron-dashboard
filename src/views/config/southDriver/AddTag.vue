<template>
  <div class="add-tag">
    <emqx-card shadow="none">
      <h3 class="card-title">{{ $t('config.addTags') }}</h3>
    </emqx-card>

    <!-- table -->
    <emqx-card shadow="none">
      <TagListForm
        ref="tagFormRef"
        :data="formData"
        :node-plugin-info="nodePluginInfo"
        @deleteTagItem="deleteTagItem"
      />
      <emqx-button class="btn-add-tag" @click="addTagItem">
        <i class="iconfont iconcreate" />
        <span>{{ $t('common.add') }}</span>
      </emqx-button>
    </emqx-card>

    <emqx-card shadow="none" class="footer add-tag-ft">
      <emqx-button type="primary" @click="submit" :disabled="formData.tagList.length === 0" :loading="isSubmitting">{{
        $t('common.create')
      }}</emqx-button>
      <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
    </emqx-card>
  </div>
</template>

<script lang="ts" setup>
import TagListForm from './components/TagListForm.vue'
import useAddTag from '@/composables/config/useAddTag'

const { nodePluginInfo, formData, isSubmitting, addTagItem, deleteTagItem, tagFormRef, cancel, submit } = useAddTag()
</script>

<style lang="scss">
.add-tag {
  .emqx-card {
    margin-bottom: 24px;
  }
  .card-title {
    margin-bottom: 0;
  }
  .tag-num {
    margin-bottom: 0;
  }
  .tag-num-input {
    width: 280px;
  }
  .tag-item-index {
    line-height: 1.5;
    opacity: 0.6;
  }
  .tag-item-hd {
    margin-bottom: 12px;
  }
  .tag-item {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
  .add-tag-ft {
    text-align: center;
    .emqx-button {
      width: 130px;
    }
  }
  .btn-add-tag {
    width: 100%;
    margin-top: 32px;
    letter-spacing: 6px;
    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>
