<template>
  <emqx-form-item class="node-config-param-item" :rules="rules" :prop="paramKey" :required="isFieldRequired">
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
    <emqx-input
      v-if="paramInfo.type === TypeOfPluginParam.Int"
      v-model.number="inputValue"
      :placeholder="String(defaultData[paramKey])"
    />
    <!-- String -->
    <emqx-input
      v-else-if="paramInfo.type === TypeOfPluginParam.String"
      v-model.trim="inputValue"
      :placeholder="String(defaultData[paramKey])"
    />
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
      <emqx-button v-if="inputValue" size="mini" @click="clearFile" type="text">
        {{ t('config.clearUploadedFile') }}
      </emqx-button>
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
      <emqx-select v-else v-model="inputValue" :placeholder="$t('common.pleaseSelect')">
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
import { computed, defineEmits, defineProps } from 'vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { fromByteArray } from 'base64-js'
import md5 from 'blueimp-md5'
import { ElPopover } from 'element-plus'
import useNodeConfigParamItem from '@/composables/config/useNodeConfigParamItem'
import useUploadFileAndRead from '@/composables/config/useUploadFileAndRead'
import type { ParamInfo } from '@/types/config'
import { FileType, TypeOfPluginParam } from '@/types/enums'

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
  defaultData: {
    type: Object,
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

const isFieldRequired = computed(() => {
  return props.paramInfo?.attribute === 'required'
})

const { rules } = useNodeConfigParamItem(props)
const { readFile } = useUploadFileAndRead()

const handleUpload = async (file: any) => {
  try {
    const content = await readFile(file, FileType.Binary)
    const afterBase64 = fromByteArray(new Uint8Array(content as ArrayBuffer))
    inputValue.value = afterBase64
  } catch (error) {
    console.error(error)
  }
}

const clearFile = () => {
  inputValue.value = ''
}

const upperFirstLetter = (str: string) => {
  if (/^[a-z]/.test(str)) {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }
  return str
}
const showLabel = () => upperFirstLetter(props.paramInfo?.name || '')

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
  .file-upload {
    display: inline-block;
    margin-right: 16px;
  }
}
</style>
