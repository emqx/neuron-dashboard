<template>
  <el-dialog v-model="showDialog" :width="500" custom-class="common-dialog" :title="dialogTitle" :z-index="2000">
    <emqx-form ref="formCom" :model="form" :rules="rules" @submit.prevent>
      <emqx-form-item prop="name" :label="$t('common.name')" required>
        <emqx-input v-model.trim="form.name" />
      </emqx-form-item>
    </emqx-form>
    <template #footer>
      <span class="dialog-footer">
        <emqx-button type="primary" size="small" @click="submit" :loading="isSubmitting">
          {{ $t('common.submit') }}
        </emqx-button>
        <emqx-button size="small" @click="showDialog = false">{{ $t('common.cancel') }}</emqx-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps, defineEmits, ref, watch } from 'vue'
import { ElDialog } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { updateDriver } from '@/api/config'
import { EmqxMessage } from '@emqx/emqx-ui'
import { DriverDirection } from '@/types/enums'
import { cloneDeep } from 'lodash'

const { t } = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  type: {
    type: Number as PropType<DriverDirection>,
    required: true,
  },
  nodeName: {
    type: String,
    required: true,
  },
  node: {
    type: Object as PropType<{ name: string }>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'updated'])

const form = ref({
  name: '',
})
const formCom = ref()

const rules = computed(() => {
  return {
    name: [{ required: true, message: t('config.nameRequired') }],
  }
})

const dialogTitle = computed(() =>
  props.type === DriverDirection.North ? t('config.editApp') : t('config.editDevice'),
)

const isSubmitting = ref(false)

const showDialog = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit('update:modelValue', val)
  },
})

watch(showDialog, (val) => {
  if (!val) {
    formCom.value.resetField()
  } else {
    form.value = cloneDeep(props.node)
  }
})

const submit = async () => {
  try {
    await formCom.value.validate()
    isSubmitting.value = true

    await updateDriver({ name: props.nodeName, new_name: form.value.name })
    EmqxMessage.success(t('common.updateSuccess'))
    showDialog.value = false
    emit('updated')
  } catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
