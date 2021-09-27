<template>
  <div class="add-tag">
    <emqx-card shadow="none">
      <h3 class="card-title">{{ $t('config.addTags') }}</h3>
      <emqx-form @submit.prevent>
        <emqx-form-item class="tag-num" :label="$t('config.tagNum')">
          <emqx-input class="tag-num-input" v-model="tagNumForInput" @change="tagNumChanged" />
        </emqx-form-item>
      </emqx-form>
    </emqx-card>
    <ul>
      <li v-for="(item, index) in tagList" :key="index" class="tag-item">
        <p class="tag-item-index">No: {{ index }}</p>
        <emqx-card shadow="none">
          <TagForm :ref="setFormRef" :data="item" />
        </emqx-card>
      </li>
    </ul>
    <emqx-card shadow="none" class="add-tag-ft">
      <emqx-button type="primary" @click="submit" :disabled="tagList.length === 0" :loading="isSubmitting">
        {{ $t('common.create') }}
      </emqx-button>
      <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
    </emqx-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import TagForm from './components/TagForm.vue'
import useAddTag from '@/composables/config/useAddTag'

const tagFormComList: Ref<Array<typeof TagForm>> = ref([])
const { tagList, tagNumForInput, isSubmitting, tagNumChanged, setFormRef, cancel, submit } = useAddTag()
</script>

<style lang="scss">
.add-tag {
  .emqx-card {
    margin-bottom: 24px;
  }
  .card-title {
    margin-bottom: 32px;
  }
  .tag-num {
    margin-bottom: 0;
  }
  .tag-num-input {
    width: 280px;
  }
  .tag-item-index {
    line-height: 1.5;
    margin-bottom: 4px;
    opacity: 0.6;
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
}
</style>
