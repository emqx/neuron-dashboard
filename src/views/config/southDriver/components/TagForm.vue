<template>
  <el-form ref="formCom" :model="formData" @submit.prevent>
    <el-table :data="formData.tagList" :empty-text="$t('common.emptyData')" :header-row-class-name="'thead-row'">
      <el-table-column width="120" fixed>
        <template #header>
          <span class="thead-title">{{ $t('common.name') }}</span>
        </template>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.name`" :rules="rules.name" required>
            <emqx-input v-model.trim="row.name" :disabled="edit" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="180">
        <template #header>
          <span class="thead-title">{{ $t('common.attribute') }}</span>
        </template>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.attribute`" :rules="rules.attribute" required>
            <TagAttributeSelect v-model="row.attribute" :collapseTags="true" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="130">
        <template #header>
          <span class="thead-title">{{ $t('common.type') }}</span>
        </template>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.type`" :rules="rules.type" required>
            <emqx-select v-model="row.type" :placeholder="$t('common.pleaseSelect')" @change="changeType(row, $index)">
              <emqx-option
                v-for="item in tagTypeOptListAfterFilter"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </emqx-select>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column width="130">
        <template #header>
          <span class="thead-title">{{ $t('config.address') }}</span>
        </template>
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.address`" :rules="rules.address" required>
            <emqx-input v-model="row.address" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('config.desc')" width="120">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.description`">
            <emqx-input v-model="row.description" type="text" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('config.decimal')" width="110">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.decimal`">
            <emqx-input-number v-model="row.decimal" :step="0.1" controls-position="right" />
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('config.precision')" width="110">
        <template #default="{ row, $index }">
          <el-form-item :prop="`tagList.${$index}.precision`">
            <emqx-input-number
              v-if="isShowPrecisionField(row.type)"
              v-model="row.precision"
              :min="0"
              :max="17"
              controls-position="right"
            />
            <span v-else>-</span>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.oper')" fixed="right" min-width="80">
        <template #default="{ $index }">
          <emqx-button
            type="danger"
            size="mini"
            :disabled="$index === 0 && formData.tagList.length === 1"
            @click="deleteItem($index)"
          >
            {{ $t('common.delete') }}
          </emqx-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script lang="ts" setup>
import type { PropType, WritableComputedRef } from 'vue'
import { ref, defineExpose, computed, defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElTable, ElForm, ElFormItem, ElTableColumn } from 'element-plus'
import { useTagTypeSelect, useTagPrecision } from '@/composables/config/useAddTag'
import TagAttributeSelect from './TagAttributeSelect.vue'
import type { PluginInfo, AddTagForm, TagFormItem, TagRegex } from '@/types/config'
import type { TagType } from '@/types/enums'

const { t } = useI18n()
const props = defineProps({
  data: {
    type: Object as PropType<AddTagForm>,
    required: true,
  },
  nodePluginInfo: {
    type: Object as PropType<PluginInfo>,
  },
  edit: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue', 'deleteTagItem'])

const formCom = ref()
const { tagTypeOptList } = useTagTypeSelect()

const tagRegex = computed(() => {
  return props?.nodePluginInfo?.tag_regex
})

/**
 * The available tag types are restricted by
 * the plug-in type bound to the current node.
 */
const tagTypeOptListAfterFilter = computed(() => {
  if (!tagRegex.value) {
    return tagTypeOptList
  }

  return tagTypeOptList.filter((tagType) =>
    (props.nodePluginInfo as PluginInfo).tag_regex.some(
      (canSelectTagType: TagRegex) => canSelectTagType.type === tagType.value,
    ),
  )
})

const formData: WritableComputedRef<AddTagForm> = computed({
  get() {
    return props.data
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const { isShowPrecisionField } = useTagPrecision()

// valid address: valid address by type
const validAddress = (rule: any, value: string, callback: any) => {
  const { field } = rule
  const $index = field.split('.')[1]
  const cuurentType = formData.value.tagList[$index].type

  const curentTagRegex = tagRegex.value?.find((item: TagRegex) => item.type === Number(cuurentType))
  if (!curentTagRegex) {
    callback()
    return
  }
  const regex = curentTagRegex?.regex ? new RegExp(curentTagRegex.regex) : null
  if (!regex) {
    callback()
    return
  }

  if (!regex.test(value)) {
    callback(new Error(`${t('config.tagAddressValid')}`))
  } else {
    callback()
  }
}

const rules = {
  name: [{ required: true, message: t('config.tagNameRequired') }],
  address: [
    { required: true, message: t('config.tagAddressRequired') },
    { validator: validAddress, trigger: ['blur', 'change'] },
  ],
  attribute: [
    { required: true, message: t('config.tagAttributeRequired') },
    {
      validator(rule: unknown, value: Array<TagType>) {
        if (!value || value.length === 0) {
          return [new Error(t('config.tagAttributeRequired'))]
        }
        return []
      },
    },
  ],
  type: [{ required: true, message: t('config.tagTypeRequired') }],
}

// validate address when change tag type
const changeType = (row: TagFormItem, $index: number) => {
  formCom.value.validateField(`tagList.${$index}.address`)
}

const deleteItem = (index: number) => {
  emit('deleteTagItem', index)
}

const validate = () => {
  // When the component is deleted, the form component is no longer available
  // but the validate method can still be called
  if (!formCom.value) {
    return Promise.resolve()
  }
  return formCom.value.validate()
}

const resetFields = () => {
  return formCom.value.resetField()
}

defineExpose({
  validate,
  resetFields,
})
</script>

<style lang="scss" scoped>
:deep {
  .el-table .el-form-item {
    margin-bottom: 0;
  }
  .thead-row > th {
    background-color: var(--color-header-bg);
  }
}

.thead-title {
  &::before {
    content: '*';
    color: #f56c6c;
    padding-right: 2px;
  }
}
</style>
