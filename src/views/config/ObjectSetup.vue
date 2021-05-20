<template>
  <div class="object-setup">
    <emqx-card>
      <h3 class="card-title">{{ $t('config.objectSetup') }}</h3>
      <div class="steps-wrap">
        <emqx-row>
          <emqx-col :span="16">
            <el-steps :active="activeStep" finish-status="success">
              <el-step :title="`1. ${$t('config.objectSetup')}`"></el-step>
              <el-step :title="`2. ${$t('config.objectIndexsetup')}`"></el-step>
            </el-steps>
          </emqx-col>
          <div class="line"></div>
        </emqx-row>
      </div>
      <div class="object-setup-main" v-if="activeStep === 1">
        <emqx-row>
          <emqx-col :span="12">
            <emqx-form :model="objectSetupForm" ref="formComponent" :rules="rules">
              <emqx-form-item label="Object name" required prop="objn">
                <emqx-input v-model="objectSetupForm.objn" size="small" :disabled="isEdit" class="normal-disabled" />
              </emqx-form-item>
              <emqx-form-item label="Object size" required prop="obsz">
                <el-input-number
                  v-model="objectSetupForm.sizeInput"
                  size="small"
                  :controls="false"
                  @change="handleInputNumber(objectSetupForm, 'obsz', $event), handleSizeChanged($event)"
                />
              </emqx-form-item>
              <emqx-form-item
                :label="`Update time ${
                  objectSetupForm.updateTimeInput ? `(${objectSetupForm.updateTimeInput}ms)` : ''
                }`"
                required
                prop="updt"
              >
                <el-input-number
                  v-model="objectSetupForm.updateTimeInput"
                  size="small"
                  :controls="false"
                  @change="handleInputNumber(objectSetupForm, 'updt', $event)"
                />
              </emqx-form-item>
              <emqx-form-item
                :label="`Log time ${objectSetupForm.logTimeInput ? `(${objectSetupForm.logTimeInput}ms)` : ''}`"
                required
                prop="logt"
              >
                <el-input-number
                  v-model="objectSetupForm.logTimeInput"
                  size="small"
                  :controls="false"
                  @change="handleInputNumber(objectSetupForm, 'logt', $event)"
                />
              </emqx-form-item>
            </emqx-form>
          </emqx-col>
        </emqx-row>
        <div class="ft">
          <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
          <emqx-button type="primary" @click="nextStep">{{ $t('common.nextStep') }}</emqx-button>
        </div>
      </div>
      <div class="object-setup-main" v-else>
        <emqx-row>
          <emqx-col :span="12">
            <emqx-table :data="objectSetupForm.odes">
              <emqx-table-column label="Index">
                <template #default="scope">
                  {{ scope.index }}
                </template>
              </emqx-table-column>
              <emqx-table-column label="Description">
                <template #default="scope">
                  <emqx-input v-model="scope.row.otxt" size="small" />
                </template>
              </emqx-table-column>
            </emqx-table>
          </emqx-col>
        </emqx-row>
        <div class="ft">
          <emqx-button @click="cancel">{{ $t('common.cancel') }}</emqx-button>
          <emqx-button type="primary" @click="submit">{{ $t('common.submit') }}</emqx-button>
        </div>
      </div>
    </emqx-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { ElSteps, ElStep } from 'element-plus'
import { useObjectSetup } from '@/composables/config/useConfig'
import useAPI from '@/composables/useAPI'
import { ElInputNumber } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash'
import { ObjdModel, OdesModel } from '@/types/neuron'

const createInputNumberRule = (msg: string) => ({
  type: 'number',
  required: true,
  min: 1,
  trigger: 'blur',
  message: msg,
})

export default defineComponent({
  components: {
    ElSteps,
    ElStep,
    ElInputNumber,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const activeStep = ref(1)
    const formComponent = ref()
    const { objectSetupForm, handleInputNumber, createObjDescTable } = useObjectSetup()
    const rules = {
      obsz: [createInputNumberRule('Please input the object size')],
      logt: [createInputNumberRule('Please input the log time')],
      updt: [createInputNumberRule('Please input the update time')],
    }
    const attrTable: Ref<Array<OdesModel>> = ref([])
    const isEdit = computed(() => route.name === 'EditObjectSetup')
    onMounted(() => {
      if (!isEdit.value) {
        return
      }
      const obj = store.state.objd.find(({ objn }: ObjdModel) => objn === route.query.obj)
      objectSetupForm.value = cloneDeep(obj)
      const { value } = objectSetupForm
      value.sizeInput = value.obsz
      value.logTimeInput = value.logt
      value.updateTimeInput = value.updt
      attrTable.value = objectSetupForm.value.odes
    })

    const handleSizeChanged = (num: number) => {
      let diff = 0
      if (!isEdit.value) {
        objectSetupForm.value.odes = createObjDescTable(num)
      } else {
        diff = num - objectSetupForm.value.odes.length
        if (diff > 0) {
          objectSetupForm.value.odes.push(...createObjDescTable(diff, objectSetupForm.value.odes.length))
        } else {
          objectSetupForm.value.odes.splice(objectSetupForm.value.odes.length + diff, -diff)
        }
      }
    }
    const checkForm = async () => {
      try {
        await formComponent.value.$refs.form.validate()
      } catch (error) {
        return Promise.reject(error)
      }
    }
    const nextStep = async () => {
      try {
        await checkForm()
        activeStep.value = 2
      } catch (error) {
        // ignore
      }
    }
    const { addObjectData, updateObj } = useAPI()
    const cancel = () => {
      router.back()
    }
    const submit = () => {
      try {
        let { objn, obsz, odes, updt, logt, oatt } = objectSetupForm.value
        let params
        if (isEdit.value) {
          params = { objn, obsz, odes, updt, logt, oatt }
          updateObj(objn, params as ObjdModel)
        } else {
          params = [{ objn, obsz, odes, updt, logt, oatt }]
          addObjectData(params)
        }
        router.back()
        // TODO: NEED TEST
      } catch (error) {
        //
      }
    }
    return {
      activeStep,
      formComponent,
      objectSetupForm,
      rules,
      attrTable,
      isEdit,

      handleInputNumber,
      handleSizeChanged,
      nextStep,
      cancel,
      submit,
    }
  },
})
</script>

<style lang="scss">
.object-setup {
  .steps-wrap {
    margin-bottom: 24px;
  }
  .el-step__title {
    padding: 0 10px;
    background-color: #fff;
    display: inline-block;
  }
  $icon-radius: 24px;
  .el-step__head {
    padding-right: 10px;
  }
  .el-step__title.is-success,
  .el-step__head.is-success {
    color: #189bfe;
  }
  .el-step__head.is-success {
    border-color: #189bfe;
  }
  .el-step__title.is-process,
  .el-step__head.is-process {
    color: #999;
  }
  .el-step__head.is-process {
    border-color: #999;
  }
  .el-step__main {
    position: absolute;
    top: ($icon-radius - 38px) / 2;
    left: $icon-radius;
  }
  .el-step:last-of-type.is-flex {
    padding-right: 190px;
  }
  .el-step__line {
    background-color: #e2e7ea;
  }
  .el-step.is-horizontal .el-step__line {
    right: 20px;
  }
  .line {
    position: absolute;
    height: 2px;
    width: 33.3%;
    top: 11px;
    right: 0;
    background-color: #e2e7ea;
  }

  .el-form-item__label {
    color: #96999c;
    line-height: 26px;
  }
  .el-input-number {
    width: 100%;
    .el-input__inner {
      text-align: left;
    }
  }
  .el-input__inner {
    border-radius: 8px;
  }
  .ft {
    margin-top: 20px;
  }
  .el-table th,
  .el-table td {
    padding: 8px 0;
  }
}
</style>
