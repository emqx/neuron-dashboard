<template>
  <div class="add-tag">
    <emqx-card shadow="none">
      <h3 class="card-title">{{ $t('config.addTags') }}</h3>
    </emqx-card>
    <ul>
      <li v-for="(item, index) in tagList" :key="item.id" class="tag-item">
        <div class="tag-item-hd common-flex">
          <p class="tag-item-index">No: {{ index }}</p>
          <emqx-button
            type="danger"
            size="mini"
            v-if="!(index === 0 && tagList.length === 1)"
            @click="deleteTagItem(index)"
            >{{ $t('common.delete') }}</emqx-button
          >
        </div>
        <emqx-card shadow="none">
          <TagForm :ref="setFormRef" :data="item" :node-plugin-info="nodePluginInfo" />
        </emqx-card>
      </li>
    </ul>
    <emqx-button class="btn-add-tag" @click="addTagItem">
      <i class="iconfont iconcreate" />
      <span>{{ $t('common.add') }}</span>
    </emqx-button>
    <emqx-card shadow="none" class="add-tag-ft">
      <emqx-button type="primary" @click="submit" :disabled="tagList.length === 0" :loading="isSubmitting">{{
        $t('common.create')
      }}</emqx-button>
      <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
    </emqx-card>
  </div>
</template>

<script lang="ts" setup>
import TagForm from './components/TagForm.vue'
import useAddTag from '@/composables/config/useAddTag'

const { nodePluginInfo, tagList, isSubmitting, addTagItem, deleteTagItem, setFormRef, cancel, submit } = useAddTag()
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
    margin-bottom: 16px;
    letter-spacing: 6px;
    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>
