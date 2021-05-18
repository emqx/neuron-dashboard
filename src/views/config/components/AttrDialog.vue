<template>
  <el-dialog
    v-model="showDialog"
    custom-class="attr-dialog"
    width="50%"
    :title="$t('config.dataAttributeSetup')"
    :z-index="2000"
  >
    <emqx-form v-if="currentStep === 0" ref="form" :model="attrForm" :rules="attrFormRules">
      <emqx-form-item label="Name" required prop="attn">
        <emqx-input v-model="attrForm.attn" :disabled="!!editingAttr" class="normal-disabled"></emqx-input>
      </emqx-form-item>
      <emqx-form-item label="Type" required prop="attt">
        <emqx-select v-model="attrForm.attt">
          <emqx-option v-for="opt in attrTypeOptArr" :key="opt.val" :value="opt.val">{{ opt.val }}</emqx-option>
        </emqx-select>
      </emqx-form-item>
      <emqx-form-item v-if="showDecimal" label="Decimal" required prop="deci">
        <emqx-input-number v-model="attrForm.deci" :controls="false" :precision="0" :min="0"></emqx-input-number>
      </emqx-form-item>
      <emqx-form-item label="Direction" prop="attr" required>
        <emqx-radio-group v-model="attrForm.attr">
          <emqx-radio label="R">R</emqx-radio>
          <emqx-radio label="W">W</emqx-radio>
          <emqx-radio label="RW">RW</emqx-radio>
        </emqx-radio-group>
      </emqx-form-item>
      <emqx-form-item label="Read time" prop="rtim" v-if="showReadTime" required>
        <emqx-input-number v-model="attrForm.rtim" :controls="false" :precision="0" :min="0"></emqx-input-number>
      </emqx-form-item>
    </emqx-form>
    <addr-edit-table v-model="addressArr" ref="addressTable" v-else> </addr-edit-table>
    <template #footer>
      <emqx-button type="primary" v-if="!editingAttr && currentStep === 0" @click="nextStep">
        {{ $t('common.nextStep') }}
      </emqx-button>
      <emqx-button type="primary" v-else @click="submit">{{ $t('common.submit') }}</emqx-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { ElDialog } from 'element-plus'
import { useAttrDialog } from '@/composables/config/useConfig'
import useAPI from '@/composables/useAPI'
import AddrEditTable from './AddrEditTable.vue'
import { cloneDeep } from 'lodash'
import { OattModel } from '@/types/neuron'

export default defineComponent({
  components: {
    ElDialog,
    AddrEditTable,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    editingAttr: {
      type: Object,
      required: false,
    },
    // number to control the length of address array
    objectSize: {
      type: Number,
      required: true,
    },
    objectName: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const currentStep = ref(0)
    const form = ref()
    const addressTable = ref()
    const {
      attrForm,
      attrTypeOptArr,
      showDecimal,
      showReadTime,
      addressArr,
      initForm,
      createAddressArr,
    } = useAttrDialog()
    const attrFormRules = {
      attn: [
        { required: true, message: 'Please input Name', trigger: 'blur' },
        { max: 30, message: 'max 30', trigger: 'blur' },
      ],
      attt: [{ required: true, message: 'Please select Type', trigger: 'blur' }],
      deci: [{ required: true, message: 'Please input Decimal', trigger: 'blur' }],
      adis: [{ required: true, message: 'Please select Display', trigger: 'blur' }],
      achg: [{ required: true, message: 'Please select Change', trigger: 'blur' }],
      attr: [{ required: true, message: 'Please select Direction', trigger: 'blur' }],
      rtim: [{ required: true, message: 'pleact input Time', trigger: 'blur' }],
    }
    const showDialog = computed({
      get: () => props.modelValue,
      set: (val: boolean) => {
        ctx.emit('update:modelValue', val)
      },
    })
    watch(showDialog, (val) => {
      if (!val) {
        return
      }
      currentStep.value = 0
      if (props.editingAttr) {
        attrForm.value = cloneDeep(props.editingAttr as OattModel)
      } else {
        attrForm.value = initForm()
        addressArr.value = createAddressArr(props.objectSize)
      }
    })
    const nextStep = async () => {
      try {
        await form.value.validate()
        currentStep.value += 1
      } catch (error) {
        //
      }
    }
    const { addAttr, updateAttr } = useAPI()
    const submit = () => {
      if (!props.editingAttr) {
        if (!addressTable.value.checkForm()) {
          return
        }
        attrForm.value.aadd = addressArr.value
        addAttr(attrForm.value, props.objectName)
      } else {
        updateAttr(attrForm.value, props.objectName)
      }
      showDialog.value = false
    }
    return {
      currentStep,
      showDialog,
      form,
      addressTable,
      attrForm,
      attrFormRules,
      showDecimal,
      showReadTime,
      attrTypeOptArr,
      addressArr,
      nextStep,
      submit,
    }
  },
})
</script>

<style lang="scss">
.attr-dialog {
  .el-input-number {
    width: 100%;
    .el-input__inner {
      text-align: left;
    }
  }
  .el-input__inner {
    border-radius: 8px;
  }
  .el-radio-group {
    width: 100%;
  }
  .normal-disabled {
    .el-input__inner {
      background-color: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
    }
  }
}
</style>
