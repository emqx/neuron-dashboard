<template>
  <div class="driver-setup">
    <label>{{ $t('config.driverName') }}:</label>
    <span>{{ driverName }}</span>
    <emqx-button class="driver-btn" type="primary" plain icon="el-icon-plus" size="small" @click="dialogVisible = true"
      >{{ $t('config.newDriver') }}
    </emqx-button>
    <el-dialog custom-class="driver-dialog" :title="$t('config.driverSetup')" v-model="dialogVisible" width="1000px">
      <emqx-row>
        <emqx-col :span="11">
          <h3>
            {{ $t('config.northServiceProtocolName') }}
            <span class="type-text" v-if="northDriverType">({{ setType(northDriverType) }})</span>
          </h3>
          <emqx-select v-model="north">
            <emqx-option v-for="item in northDriverList" :key="item.name" :label="item.desc" :value="item.name">
            </emqx-option>
          </emqx-select>
          <emqx-form ref="DriverSetupForm" :model="northDriverRecord" label-width="80px" label-position="top">
            <emqx-row class="config-drivers-row" :gutter="20">
              <template v-if="northDriverType === 'tcp'">
                <emqx-col :span="24">
                  <h3>Ethernet {{ $t('config.driverSetup') }}</h3>
                </emqx-col>
                <emqx-col :span="12">
                  <emqx-form-item label="Host">
                    <emqx-input v-model="northDriverRecord.tcph"></emqx-input>
                  </emqx-form-item>
                </emqx-col>
                <emqx-col :span="12">
                  <emqx-form-item label="Port">
                    <emqx-input type="number" v-model="northDriverRecord.tcpp"></emqx-input>
                  </emqx-form-item>
                </emqx-col>
              </template>
              <template v-else-if="northDriverType === 'tty'">
                <emqx-col :span="24">
                  <h3>Serial {{ $t('config.driverSetup') }}</h3>
                </emqx-col>
              </template>
            </emqx-row>
          </emqx-form>
        </emqx-col>
        <emqx-col :span="2">
          <el-divider direction="vertical"></el-divider>
        </emqx-col>
        <emqx-col :span="11">
          <h3>
            {{ $t('config.driverProtocolName') }}
            <span class="type-text" v-if="southDriverType">({{ setType(southDriverType) }})</span>
          </h3>
          <emqx-select v-model="south">
            <emqx-option v-for="item in southDriverList" :key="item.name" :label="item.desc" :value="item.name">
            </emqx-option>
          </emqx-select>
        </emqx-col>
      </emqx-row>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, readonly, Ref, ref } from 'vue'
import { ElDialog, ElDivider } from 'element-plus'
import useWebsocket from '@/plugins/ws/useWebsocket'
import useFunc from '@/composables/useFunc'
import { DriverData, DriverModel } from '@/types/neuron'

export default defineComponent({
  name: 'DriverSetup',
  components: {
    ElDialog,
    ElDivider,
  },
  setup() {
    const driverName = ref('None')
    const dialogVisible = ref(false)
    const southDriverList: Ref<DriverModel[]> = ref([])
    const northDriverList: Ref<DriverModel[]> = ref([])
    const { ws } = useWebsocket()
    const getDrivers = useFunc('getDrivers')
    const north = ref('')
    const south = ref('')
    const TYPE = readonly({
      south: 1,
      north: 2,
    })
    const northDriverRecord = reactive({})
    const setSouthDrivers = (data: DriverData) => {
      if (data.func === getDrivers) {
        ws().remove(setSouthDrivers)
        southDriverList.value = data.rows
        console.log(southDriverList.value)
        setTimeout(() => {
          ws().set({ success: setNorthDrivers }).send({
            func: getDrivers,
            type: TYPE.north,
          })
        }, 2000)
      }
    }
    const setNorthDrivers = (data: DriverData) => {
      if (data.func === getDrivers) {
        ws().remove(setNorthDrivers)
        northDriverList.value = data.rows
        console.log(northDriverList.value)
      }
    }
    const setType = (val: 'tty' | 'tcp') => {
      const typeMap = {
        tty: 'Serial drivers',
        tcp: 'Ethernet drivers',
      }
      return typeMap[val]
    }
    const findType = (list: DriverModel[], value: string) => {
      const findVal = list.find((i) => i.name === value)
      return findVal ? findVal.type : ''
    }
    const northDriverType = computed(() => {
      return findType(northDriverList.value, north.value)
    })
    const southDriverType = computed(() => {
      return findType(southDriverList.value, south.value)
    })
    ws().set({ success: setSouthDrivers }).send({
      func: getDrivers,
      type: TYPE.south,
    })
    return {
      driverName,
      north,
      south,
      northDriverRecord,
      northDriverList,
      southDriverList,
      dialogVisible,
      northDriverType,
      southDriverType,
      setType,
    }
  },
})
</script>

<style lang="scss">
.driver-setup {
  .driver-btn {
    margin-left: 20px;
  }
}
.driver-dialog {
  h3 {
    margin: 20px 0px;
    font-size: 16px;
  }
  .el-col-2 {
    text-align: center;
  }
  .el-divider--vertical {
    height: 100%;
  }
  .type-text {
    font-size: 14px;
    margin-left: 10px;
    font-weight: 500;
    color: #4d4d4d;
  }
}
</style>
