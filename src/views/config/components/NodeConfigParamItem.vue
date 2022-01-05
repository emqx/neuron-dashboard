<template>
  <emqx-form-item class="node-config-param-item" :rules="rules" :prop="paramKey" :required="!!paramInfo.default">
    <template #label>
      <span>{{ showLabel() }}</span>
      <el-popover
        v-if="paramInfo.description"
        placement="top-start"
        :width="300"
        trigger="hover"
        :content="paramInfo.description"
      >
        <template #reference>
          <i class="iconfont iconalarm" />
        </template>
      </el-popover>
    </template>
    <!-- Number -->
    <emqx-input v-if="paramInfo.type === TypeOfPluginParam.Int" v-model.number="inputValue" />
    <!-- String -->
    <emqx-input v-else-if="paramInfo.type === TypeOfPluginParam.String" v-model="inputValue" />
    <!-- Boolean -->
    <emqx-radio-group v-else-if="paramInfo.type === TypeOfPluginParam.Boolean" v-model="inputValue">
      <emqx-radio :label="true">True</emqx-radio>
      <emqx-radio :label="false">False</emqx-radio>
    </emqx-radio-group>
    <!-- File -->
    <div class="file-param" v-else-if="paramInfo.type === TypeOfPluginParam.File">
      <emqx-upload class="file-upload" :show-file-list="false" :before-upload="handleUpload">
        <emqx-button size="mini">{{ t('common.uploadFile') }}</emqx-button>
      </emqx-upload>
      <div class="file-content-preview" v-if="inputValue">
        <label>Content-MD5:</label>
        <span>{{ fileContentPreview(inputValue) }}</span>
      </div>
    </div>
    <!-- Enum -->
    <!-- <emqx-select v-else-if="paramInfo.type === TypeOfPluginParam.Enum">
      <emqx-option />
    </emqx-select>-->
    <!-- Map -->
    <template v-else-if="paramInfo.type === TypeOfPluginParam.Map">
      <emqx-radio-group v-if="paramInfo.valid.map.length < 3" v-model="inputValue">
        <emqx-radio v-for="{ key, value } in paramInfo.valid.map" :key="value" :label="value">
          {{ upperFirstLetter(key) }}
        </emqx-radio>
      </emqx-radio-group>
      <emqx-select v-else v-model="inputValue">
        <emqx-option
          v-for="{ key, value } in paramInfo.valid.map"
          :key="value"
          :value="value"
          :label="upperFirstLetter(key)"
        />
      </emqx-select>
    </template>
  </emqx-form-item>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, defineEmits, ref } from 'vue'
import { ElPopover } from 'element-plus'
import { ParamInfo } from '@/types/config'
import { TypeOfPluginParam } from '@/types/enums'
import useNodeConfigParamItem from '@/composables/config/useNodeConfigParamItem'
import useUploadFileAndRead from '@/composables/config/useUploadFileAndRead'
import { useI18n } from 'vue-i18n'
import md5 from 'blueimp-md5'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean],
  },
  paramKey: {
    type: String,
    required: true,
  },
  paramInfo: {
    type: Object as PropType<ParamInfo>,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const { rules } = useNodeConfigParamItem(props)
const { setMaxSize, readFile } = useUploadFileAndRead()

const handleUpload = async (file: any) => {
  try {
    const content = await readFile(file)
    inputValue.value = content
  } catch (error) {
    console.error(error)
  }
}

const showLabel = () => upperFirstLetter(props.paramInfo?.name || '')

const upperFirstLetter = (str: string) => {
  if (/^[a-z]/.test(str)) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }
  return str
}

const fileContentPreview = md5
</script>

<style lang="scss">
.node-config-param-item {
  .el-form-item__label {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    > span {
      margin-right: 8px;
    }
    > .iconfont {
      font-size: 18px;
      cursor: pointer;
    }
  }
  .el-form-item__content::before,
  .el-form-item__content::after {
    clear: both;
  }
  .file-content-preview {
    font-size: 12px;
  }
}
</style>
