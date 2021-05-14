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
          <emqx-select v-model="north" :placeholder="$t('common.pleaseSelect')">
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
                    <emqx-input max="65535" min="0" type="number" v-model.number="northDriverRecord.tcpp"></emqx-input>
                  </emqx-form-item>
                </emqx-col>
              </template>
              <template v-else-if="northDriverType === 'tty'">
                <emqx-col :span="24">
                  <h3>Serial {{ $t('config.driverSetup') }}</h3>
                </emqx-col>
                <emqx-col :span="24">
                  <emqx-form-item label="Device name">
                    <emqx-input v-if="north !== 'rs232'" v-model="northDriverRecord.ttyc"></emqx-input>
                    <emqx-select
                      v-else
                      :placeholder="$t('common.pleaseSelect')"
                      :class="{ 'error-permission': fdrw === -1 }"
                      v-model="northDriverRecord.ttyc"
                      @change="handleTtycChange"
                    >
                      <emqx-option
                        v-for="(item, index) in rs232Options"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                      ></emqx-option>
                    </emqx-select>
                    <p v-if="fdrw === -1" class="permission-tip">{{ $t('configuration.noPermissions') }}</p>
                  </emqx-form-item>
                  <emqx-form-item label="Baud rate">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="northDriverRecord.ttyb">
                      <emqx-option v-for="value in ttybList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Data bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="northDriverRecord.ttyd">
                      <emqx-option v-for="value in ttydList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Stop bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="northDriverRecord.ttys">
                      <emqx-option v-for="value in ttysList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Parity bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="northDriverRecord.ttyp">
                      <emqx-option
                        v-for="item in ttypList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                </emqx-col>
              </template>
            </emqx-row>
          </emqx-form>
          <div v-if="northDriverType === 'tty' || northDriverType === 'tcp'">
            <el-table
              v-if="northDriverRecord.parm && northDriverRecord.parm.length"
              class="script-table"
              :data="northDriverRecord.parm"
            >
              <el-table-column label="Vars" prop="vars"> </el-table-column>
              <el-table-column label="Pars" prop="pars" min-width="180px">
                <template v-slot="scope">
                  <emqx-input
                    :type="scope.row.vars === 'PASSWORD' ? 'password' : ''"
                    size="mini"
                    v-model="scope.row.pars"
                  >
                  </emqx-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </emqx-col>
        <emqx-col :span="2">
          <el-divider direction="vertical"></el-divider>
        </emqx-col>
        <emqx-col :span="11">
          <h3>
            {{ $t('config.driverProtocolName') }}
            <span class="type-text" v-if="southDriverType">({{ setType(southDriverType) }})</span>
          </h3>
          <emqx-select v-model="south" :placeholder="$t('common.pleaseSelect')">
            <emqx-option v-for="item in southDriverList" :key="item.name" :label="item.desc" :value="item.name">
            </emqx-option>
          </emqx-select>
          <emqx-form ref="DriverSetupForm" :model="southDriverRecord" label-width="80px" label-position="top">
            <emqx-row class="config-drivers-row" :gutter="20">
              <template v-if="southDriverType === 'tcp'">
                <emqx-col :span="24">
                  <h3>Ethernet {{ $t('config.driverSetup') }}</h3>
                </emqx-col>
                <emqx-col :span="12">
                  <emqx-form-item label="Host">
                    <emqx-input v-model="southDriverRecord.tcph"></emqx-input>
                  </emqx-form-item>
                </emqx-col>
                <emqx-col :span="12">
                  <emqx-form-item label="Port">
                    <emqx-input max="65535" min="0" type="number" v-model.number="southDriverRecord.tcpp"></emqx-input>
                  </emqx-form-item>
                </emqx-col>
              </template>
              <template v-else-if="southDriverType === 'tty'">
                <emqx-col :span="24">
                  <h3>Serial {{ $t('config.driverSetup') }}</h3>
                </emqx-col>
                <emqx-col :span="24">
                  <emqx-form-item label="Device name">
                    <emqx-input v-model="southDriverRecord.ttyc"></emqx-input>
                  </emqx-form-item>
                  <emqx-form-item label="Baud rate">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="southDriverRecord.ttyb">
                      <emqx-option v-for="value in ttybList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Data bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="southDriverRecord.ttyd">
                      <emqx-option v-for="value in ttydList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Stop bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="southDriverRecord.ttys">
                      <emqx-option v-for="value in ttysList" :key="value" :label="value" :value="value"></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                  <emqx-form-item label="Parity bit">
                    <emqx-select :placeholder="$t('common.pleaseSelect')" v-model="southDriverRecord.ttyp">
                      <emqx-option
                        v-for="item in ttypList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></emqx-option>
                    </emqx-select>
                  </emqx-form-item>
                </emqx-col>
              </template>
            </emqx-row>
          </emqx-form>
          <div v-if="southDriverType === 'tty' || southDriverType === 'tcp'">
            <el-table
              v-if="southDriverRecord.parm && southDriverRecord.parm.length"
              class="script-table"
              :data="southDriverRecord.parm"
            >
              <el-table-column label="Vars" prop="vars"> </el-table-column>
              <el-table-column label="Pars" prop="pars" min-width="180px">
                <template v-slot="scope">
                  <emqx-input size="mini" v-model="scope.row.pars"></emqx-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </emqx-col>
      </emqx-row>
      <span class="submit-btn">
        <emqx-button @click="submit">{{ $t('common.submit') }}</emqx-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, readonly, Ref, ref, watch } from 'vue'
import { ElDialog, ElDivider, ElTableColumn, ElTable } from 'element-plus'
import useWebsocket from '@/plugins/ws/useWebsocket'
import useFunc from '@/composables/useFunc'
import { useStore } from 'vuex'
import useAPI from '@/composables/useAPI'
import { DriverData, DriverModel, DeviceData, DeviceModel, ParamData, ParamModel, ChanelModel } from '@/types/neuron'
import _ from 'lodash'

export default defineComponent({
  name: 'DriverSetup',
  components: {
    ElDialog,
    ElDivider,
    ElTableColumn,
    ElTable,
  },
  setup() {
    const store = useStore()
    let SET_DRIVER_DATA = null

    const driverName = ref('None')
    const dialogVisible = ref(false)
    const paramDriverType = ref('')
    const southDriverList: Ref<DriverModel[]> = ref([])
    const northDriverList: Ref<DriverModel[]> = ref([])
    const rs232Options: Ref<DeviceModel[]> = ref([])
    const paramDataLists: Ref<ParamModel[]> = ref([])
    const { ws } = useWebsocket()
    const getDrivers = useFunc('getDrivers')
    const getDriverParams = useFunc('getDriverParams')
    const getDeviceList = useFunc('getDeviceList')
    const north = ref('')
    const south = ref('')
    const fdrw = ref(0)
    const ttybList = readonly([4800, 9600, 19200, 38400, 57600, 115200] as number[])
    const ttydList = readonly([5, 6, 7, 8] as number[])
    const ttysList = readonly(['1', '1.5', '2'] as string[])
    const ttypList = readonly([
      { value: 'E', label: 'Even' },
      { value: 'O', label: 'Odd' },
      { value: 'N', label: 'None' },
    ])
    const TYPE = readonly({
      south: 1,
      north: 2,
    })
    const defaultDriverRecord = {
      chdv: '',
      tcph: '',
      tcpp: 0,
      ttyc: '',
      ttyb: 9600,
      ttyd: 8,
      // ttys: '1',
      ttys: '',
      ttyp: 'N',
      parm: [],
    }
    const northDriverRecord: ChanelModel = reactive(_.cloneDeep(defaultDriverRecord) as ChanelModel)
    const southDriverRecord: ChanelModel = reactive(_.cloneDeep(defaultDriverRecord) as ChanelModel)

    const setDeviceList = (data: DeviceData) => {
      if (data.func === getDeviceList) {
        rs232Options.value = data.rows
        ws().remove(setDeviceList)
      }
    }
    const setParams = (data: ParamData) => {
      if (data.func === getDriverParams) {
        ws().remove(setParams)
        paramDataLists.value = data.parm
        if (paramDriverType.value === 'south') {
          southDriverRecord.parm = data.parm
        } else if (paramDriverType.value === 'north') {
          northDriverRecord.parm = data.parm
        }
      }
    }
    const setSouthDrivers = (data: DriverData) => {
      if (data.func === getDrivers) {
        ws().remove(setSouthDrivers)
        southDriverList.value = data.rows
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

    watch(south, (currentValue: string) => {
      if (dialogVisible.value) {
        // Object.assign(southDriverRecord, _.cloneDeep(defaultDriverRecord) as ChanelModel)
        paramDriverType.value = 'south'
        handleGetDriverParams(currentValue)
      }
    })
    watch(north, (currentValue: string) => {
      if (dialogVisible.value) {
        // Object.assign(northDriverRecord, _.cloneDeep(defaultDriverRecord) as ChanelModel)
        paramDriverType.value = 'north'
        handleGetDriverParams(currentValue)
      }
    })
    const handleTtycChange = (val: string) => {
      const list: Array<DeviceModel> = rs232Options.value as Array<DeviceModel>
      const findVal = list.find((item) => item.name === val)
      fdrw.value = findVal ? findVal.fdrw : 0
    }

    const handleGetDeviceList = () => {
      ws().set({ success: setDeviceList }).send({
        func: getDeviceList,
      })
    }
    const handleGetDriverParams = (drvn: string) => {
      ws().set({ success: setParams }).send({
        func: getDriverParams,
        drvn,
      })
    }

    const { setDriverData } = useAPI()

    const submit = () => {
      dialogVisible.value = false
      const chnl = [southDriverRecord, northDriverRecord]
      let _chnl = []
      const ipPortChdvTypes = [
        'ethip',
        'mbstcp',
        'mele71',
        'finstc',
        's7iso',
        'siefw',
        'tsxmbt',
        'mbstcp',
        'mbsrot',
        'bacnip',
        'opcua',
        'i61850',
        'snmpd',
        'g26875',
      ]
      if (ipPortChdvTypes.indexOf(south.value) !== -1 && ipPortChdvTypes.indexOf(north.value) !== -1) {
        _chnl = chnl.filter((item) => item.tcph && item.tcpp)
      } else {
        _chnl = chnl
      }
      _chnl[0].chdv = south.value
      _chnl[1].chdv = north.value
      SET_DRIVER_DATA = store.commit('SET_DRIVER_DATA', { _chnl })
      setDriverData(_chnl)
    }
    ws().set({ success: setSouthDrivers }).send({
      func: getDrivers,
      type: TYPE.south,
    })
    // TODO: solve the parallel problem
    setTimeout(() => handleGetDeviceList(), 3000)

    return {
      submit,
      SET_DRIVER_DATA,
      ttybList,
      ttydList,
      ttysList,
      ttypList,
      fdrw,
      handleTtycChange,
      paramDriverType,
      driverName,
      north,
      south,
      northDriverRecord,
      southDriverRecord,
      northDriverList,
      southDriverList,
      rs232Options,
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
  .submit-btn {
    margin: 10px 10px 10px 0;
    float: right;
  }
  &:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }
}
</style>
