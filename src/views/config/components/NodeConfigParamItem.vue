<template>
  <emqx-col :span="paramInfo.type === TypeOfPluginParam.Array ? 24 : 12">
    <emqx-form-item class="node-config-param-item" :rules="rules" :prop="paramKey" :required="isFieldRequired">
      <template #label>
        <span>{{ paramName }}</span>
        <el-popover
          v-if="paramInfo.description"
          placement="top-start"
          :width="300"
          trigger="hover"
          :content="paramDescripton"
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
      <template v-else-if="paramInfo.type === TypeOfPluginParam.Array">
        <DynamicTable
          ref="arrayRef"
          v-model="inputValue"
          :fields="paramInfo.fields"
          :range="{ min: paramInfo?.valid?.min_length, max: paramInfo?.valid?.max_length }"
          @validateFileds="validateFileds"
        />
      </template>
    </emqx-form-item>
  </emqx-col>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, defineProps, defineExpose } from 'vue'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { fromByteArray } from 'base64-js'
import md5 from 'blueimp-md5'
import { ElPopover } from 'element-plus'
import useNodeConfigParamItem from '@/composables/config/useNodeConfigParamItem'
import useNodeConfigParamCommon from '@/composables/config/useNodeConfigParamCommon'
import useUploadFileAndRead from '@/composables/config/useUploadFileAndRead'
import useLang from '@/composables/useLang'
import type { ParamInfo } from '@/types/config'
import { FileType, TypeOfPluginParam } from '@/types/enums'
import DynamicTable from '@/components/DynamicTable.vue'
import { IGNORE_PLUGINS } from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: [Number, String, Boolean, Array],
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
  plugin: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'validateFileds'])

const { t } = useI18n()
const { currentLang, i18nContent } = useLang()
const { upperFirstLetter, showLabel } = useNodeConfigParamCommon()

const arrayRef = ref()

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

const pluginNameLowerCase = computed(() => {
  let pluginName = props.plugin.toLocaleLowerCase().replaceAll(' ', '')
  pluginName = pluginName.replace(/_|-/g, '')
  return pluginName
})

const paramKeyLowerCase = computed(() => {
  let keyName = props.paramKey.toLocaleLowerCase()

  let lineRegx = /-(\w)/g
  if (props.paramKey.includes('_')) {
    lineRegx = /_(\w)/g
  }
  keyName = upperFirstLetter(keyName.replace(lineRegx, ($0, $1) => $1.toUpperCase()))
  return keyName
})

// If the subsequent English also needs front-end support, please modify the logic and i18/schema.ts
const paramName = computed(() => {
  let desc = showLabel(props.paramInfo)

  if (IGNORE_PLUGINS.includes(pluginNameLowerCase.value)) {
    const i18nKey = `${pluginNameLowerCase.value}${paramKeyLowerCase.value}`
    desc = currentLang.value === 'zh' ? t(`schema.${i18nKey}`) : showLabel(props.paramInfo)
  }
  return desc
})
const paramDescripton = computed(() => {
  let desc = i18nContent(props.paramInfo, 'description')
  if (IGNORE_PLUGINS.includes(pluginNameLowerCase.value) && currentLang.value === 'zh') {
    const i18nKey = `${pluginNameLowerCase.value}${paramKeyLowerCase.value}`
    desc = t(`schema.${i18nKey}Desc`)
  }

  return desc
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

const fileContentPreview = md5

const validateFileds = () => {
  emit('validateFileds', [`${props.paramKey}`])
}

const validateArrayParam = async () => {
  try {
    const { validate } = arrayRef.value
    await validate()
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}

defineExpose({
  arrayRef,
  validateArrayParam,
})
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
