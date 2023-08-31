<template>
  <el-dialog
    v-model="showDialog"
    width="50%"
    custom-class="common-dialog"
    :title="$t('config.editTag')"
    :z-index="2000"
  >
    <TagFormCom ref="formRef" :data="tagData" :node-plugin-info="pluginMsg" edit />
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">{{
          $t('common.submit')
        }}</emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType, Ref } from 'vue'
import { computed, defineProps, defineEmits, ref, watch } from 'vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import { ElDialog } from 'element-plus'
import TagFormCom from './TagForm.vue'
import type { PluginInfo, TagData } from '@/types/config'
import { updateTag } from '@/api/config'
import { useI18n } from 'vue-i18n'
import { useNodePluginInfo } from '@/composables/config/usePluginInfo'
import { useHandleTagValue } from '@/composables/config/useAddTagCommon'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  tag: {
    type: Object as PropType<TagData>,
    required: true,
  },
  node: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'submitted'])

const { t } = useI18n()

const { getNodePluginInfo } = useNodePluginInfo()
const pluginMsg: Ref<undefined | PluginInfo> = ref(undefined)

const getPluginInfo = async () => {
  pluginMsg.value = await getNodePluginInfo()
}

const tagData: Ref<TagData> = ref({} as TagData)
const isSubmitting = ref(false)
const formRef = ref()

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, (val) => {
  if (val) {
    tagData.value = { ...props.tag }

    if (!pluginMsg.value) {
      getPluginInfo()
    }
  } else {
    formRef.value.resetFields()
  }
})

const { handleTagValue } = useHandleTagValue()
const submit = async () => {
  try {
    await formRef.value.validate()
    isSubmitting.value = true

    const bodyData = handleTagValue(tagData.value)
    await updateTag(props.node, props.group, bodyData)

    showDialog.value = false
    EmqxMessage.success(t('common.submitSuccess'))
    emit('submitted')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
