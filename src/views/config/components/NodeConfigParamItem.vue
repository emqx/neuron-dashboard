<template>
  <emqx-form-item class="node-config-param-item" :rules="rules" :prop="paramKey">
    <template #label>
      <span>{{ showLabel() }}</span>
      <el-popover placement="top-start" :width="300" trigger="hover" :content="paramInfo.description">
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
    <!-- Enum -->
    <!-- <emqx-select v-else-if="paramInfo.type === TypeOfPluginParam.Enum">
      <emqx-option />
    </emqx-select>-->
  </emqx-form-item>
</template>

<script lang="ts" setup>
import { defineProps, PropType, computed, defineEmits, ref } from 'vue'
import { ElPopover } from 'element-plus'
import { ParamInfo } from '@/types/config'
import { TypeOfPluginParam } from '@/types/enums'
import useNodeConfigParamItem from '@/composables/config/useNodeConfigParamItem'

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

const showLabel = () => {
  const label = props.paramInfo?.name || ''
  if (/^[a-z]/.test(label)) {
    return label.slice(0, 1).toUpperCase() + label.slice(1)
  }
  return label
}
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
}
</style>
