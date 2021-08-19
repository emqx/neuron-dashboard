<template>
  <div class="driver-setup" style="display: inline-block">
    <emqx-button @click="dialogTableVisible = true">{{
      driverData.chdv === '' ? $t('configuration.newDriver') : $t('configuration.editDriver')
    }}</emqx-button>
    <el-dialog :title="$t('configuration.driverSetup')" @closed="close" v-model="dialogTableVisible" :z-index="2000">
      <h3>{{ $t('configuration.northServiceProtocolName') }}</h3>
      <emqx-row class="type-row" :gutter="20" type="flex" align="middle">
        <emqx-col :span="12">
          <emqx-select v-model="north">
            <emqx-option v-for="item in northDriverList" :key="item.val" :label="item.label" :value="item.val">
            </emqx-option>
          </emqx-select>
        </emqx-col>
        <emqx-col :span="12">
          <div>{{ northDriverType }}</div>
        </emqx-col>
      </emqx-row>
      <emqx-row class="edit-drivers-row" :gutter="20">
        <template v-if="northDriverType === 'Ethernet drivers'">
          <emqx-col :span="24">
            <h3>Ethernet {{ $t('configuration.driverSetup') }}</h3>
          </emqx-col>
          <emqx-col :span="24">
            <emqx-form ref="driverSetupForm" label-width="80px" label-position="left">
              <emqx-col :span="12">
                <emqx-form-item label="Host name">
                  <emqx-input v-model="chnl[1].tcph"></emqx-input>
                </emqx-form-item>
              </emqx-col>
              <emqx-col :span="12">
                <emqx-form-item label="Port no">
                  <el-input-number
                    class="emqx-input-number"
                    v-model="chnl[1].tcpp"
                    :controls="false"
                    :precision="0"
                    :min="0"
                  />
                </emqx-form-item>
              </emqx-col>
            </emqx-form>
          </emqx-col>
        </template>
        <template v-else-if="northDriverType === 'Serial drivers'">
          <emqx-col :span="24">
            <h3>Serial {{ $t('configuration.driverSetup') }}</h3>
          </emqx-col>
          <emqx-col :span="24">
            <emqx-form ref="driverSetupForm" label-width="100px" :model="chnl[1]">
              <emqx-form-item label="Device name">
                <emqx-input v-if="north !== 'rs232'" v-model="chnl[1].ttyc"></emqx-input>
                <emqx-select
                  :class="{ 'error-permission': fdrw === -1 }"
                  v-else
                  v-model="chnl[1].ttyc"
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
                <emqx-select v-model="chnl[1].ttyb">
                  <emqx-option v-for="value in ttybList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Data bit">
                <emqx-select v-model="chnl[1].ttyd">
                  <emqx-option v-for="value in ttydList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Stop bit">
                <emqx-select v-model="chnl[1].ttys">
                  <emqx-option v-for="value in ttysList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Parity bit">
                <emqx-select v-model="chnl[1].ttyp">
                  <emqx-option
                    v-for="item in ttypList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></emqx-option>
                </emqx-select>
              </emqx-form-item>
            </emqx-form>
          </emqx-col>
        </template>
        <emqx-col v-if="northDriverType === 'Serial drivers' || northDriverType === 'Ethernet drivers'" :span="24">
          <emqx-table v-if="chnl[1].parm && chnl[1].parm.length" class="script-table" :data="chnl[1].parm">
            <emqx-table-column label="Vars" prop="vars"> </emqx-table-column>
            <emqx-table-column label="Pars" prop="pars" min-width="180px">
              <template v-slot="scope">
                <emqx-input
                  :type="scope.row.vars === 'PASSWORD' ? 'password' : ''"
                  size="mini"
                  v-model="scope.row.pars"
                >
                </emqx-input>
              </template>
            </emqx-table-column>
          </emqx-table>
        </emqx-col>
      </emqx-row>
      <h3 class="driver-type-title">
        {{ $t('configuration.driverProtocolName') }}
      </h3>
      <emqx-row class="type-row" :gutter="20" type="flex" align="middle">
        <emqx-col :span="12">
          <emqx-select v-model="chdv">
            <emqx-option v-for="item in southDriverList" :key="item.val" :label="item.label" :value="item.val">
            </emqx-option>
          </emqx-select>
        </emqx-col>
        <emqx-col :span="12">
          <div>{{ southDriverType }}</div>
        </emqx-col>
      </emqx-row>
      <emqx-row class="edit-drivers-row" :gutter="20">
        <template v-if="southDriverType === 'Ethernet drivers'">
          <emqx-col :span="24">
            <h3>Ethernet {{ $t('configuration.driverSetup') }}</h3>
          </emqx-col>
          <emqx-col :span="24">
            <emqx-form ref="driverSetupForm" label-width="80px" label-position="left">
              <emqx-col :span="12">
                <emqx-form-item label="Host name">
                  <emqx-input v-model="chnl[0].tcph"></emqx-input>
                </emqx-form-item>
              </emqx-col>
              <emqx-col :span="12">
                <emqx-form-item label="Port no">
                  <el-input-number
                    class="emqx-input-number"
                    v-model="chnl[0].tcpp"
                    :controls="false"
                    :precision="0"
                    :min="0"
                  />
                </emqx-form-item>
              </emqx-col>
            </emqx-form>
          </emqx-col>
        </template>
        <template v-else-if="southDriverType === 'Serial drivers'">
          <emqx-col :span="24">
            <h3>Serial {{ $t('configuration.driverSetup') }}</h3>
          </emqx-col>
          <emqx-col :span="24">
            <emqx-form ref="driverSetupForm" label-width="100px" :model="chnl[0]">
              <emqx-form-item label="Device name">
                <emqx-input v-model="chnl[0].ttyc"></emqx-input>
              </emqx-form-item>
              <emqx-form-item label="Baud rate">
                <emqx-select v-model="chnl[0].ttyb">
                  <emqx-option v-for="value in ttybList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Data bit">
                <emqx-select v-model="chnl[0].ttyd">
                  <emqx-option v-for="value in ttydList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Stop bit">
                <emqx-select v-model="chnl[0].ttys">
                  <emqx-option v-for="value in ttysList" :key="value" :label="value" :value="value"></emqx-option>
                </emqx-select>
              </emqx-form-item>
              <emqx-form-item label="Parity bit">
                <emqx-select v-model="chnl[0].ttyp">
                  <emqx-option
                    v-for="item in ttypList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></emqx-option>
                </emqx-select>
              </emqx-form-item>
            </emqx-form>
          </emqx-col>
        </template>
        <emqx-col v-if="southDriverType === 'Serial drivers' || southDriverType === 'Ethernet drivers'" :span="24">
          <emqx-table v-if="chnl[0].parm && chnl[0].parm.length" class="script-table" :data="chnl[0].parm">
            <emqx-table-column label="Vars" prop="vars"> </emqx-table-column>
            <emqx-table-column label="Pars" prop="pars" min-width="180px">
              <template v-slot="scope">
                <emqx-input size="mini" v-model="scope.row.pars"> </emqx-input>
              </template>
            </emqx-table-column>
          </emqx-table>
        </emqx-col>
      </emqx-row>
      <template #footer>
        <span>
          <emqx-button @click="submit">{{ $t('common.submit') }}</emqx-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { getData } from '@/api/data'
import { ElDialog, ElInputNumber } from 'element-plus'

export default {
  components: {
    ElDialog,
    ElInputNumber,
  },
  data() {
    return {
      dialogTableVisible: false,
      chdv: '', // Channel driver name
      north: '', // Channel north name
      paramDriverType: '',
      ttybList: [4800, 9600, 19200, 38400, 57600, 115200],
      ttydList: [5, 6, 7, 8],
      ttysList: ['1', '1.5', '2'],
      ttypList: [
        { value: 'E', label: 'Even' },
        { value: 'O', label: 'Odd' },
        { value: 'N', label: 'None' },
      ],
      chnl: [], // Channel Details
      rs232Options: [],
      fdrw: 0,
    }
  },
  computed: {
    ...mapState({
      driverData: (state) => state.SetUpData.driverData,
    }),
    southDriverType() {
      const tmp = this.southDriverList.find((i) => i.val === this.chdv)
      return tmp ? tmp.type : ''
    },
    southDriverList() {
      return this.$store.state.Device.southDriverList
    },
    northDriverType() {
      const tmp = this.northDriverList.find((i) => i.val === this.north)
      return tmp ? tmp.type : ''
    },
    northDriverList() {
      return this.$store.state.Device.northDriverList
    },
    nodeId() {
      return this.$route.params.serviceId
    },
  },
  watch: {
    chdv(val) {
      if (this.dialogTableVisible) {
        // eslint-disable-next-line
        const [driver, north] = this.chnl
        this.chnl = [
          {
            chdv: val,
            tcph: '',
            tcpp: 0,
            ttyc: '',
            ttyb: 9600,
            ttyd: 8,
            ttys: '1',
            ttyp: 'N',
            parm: [],
          },
          north,
        ]
        this.paramDriverType = 'south'
        this.getDriverParams(val)
      }
    },
    north(val) {
      if (this.dialogTableVisible) {
        const [driver] = this.chnl
        this.chnl = [
          driver,
          {
            chdv: val,
            tcph: '',
            tcpp: 0,
            ttyc: '',
            ttyb: 9600,
            ttyd: 8,
            ttys: '1',
            ttyp: 'N',
            parm: [],
          },
        ]
        this.paramDriverType = 'north'
        this.getDriverParams(val)
        this.getDeviceList(val)
      }
    },
    dialogTableVisible(val) {
      if (val) {
        this.init()
      }
    },
  },
  created() {
    this.init()
    this.getDeviceList(this.north)
  },
  methods: {
    ...mapMutations({
      setDriverData: 'setDriverData',
    }),
    submit() {
      this.dialogTableVisible = false
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
      if (ipPortChdvTypes.indexOf(this.chdv) !== -1 && ipPortChdvTypes.indexOf(this.north) !== -1) {
        _chnl = this.chnl.filter((item) => item.tcph && (item.tcpp !== '' || item.tcpp !== undefined))
      } else {
        _chnl = this.chnl
      }
      _chnl[0].chdv = this.chdv
      _chnl[1].chdv = this.north
      this.setDriverData({ chdv: this.chdv, chnl: _chnl })
    },
    close() {
      this.$nextTick(this.init)
    },
    getDriverParams(drvn) {
      getData(this.nodeId, { func: 24, drvn, wtrm: 'neruon' }).then((res) => {
        this.setParams(res.data)
      })
    },
    setParams(data) {
      if (data.func === 24 && !data.errc) {
        const chnlIndex = this.paramDriverType === 'south' ? 0 : 1
        this.chnl[chnlIndex].parm = data.parm
      }
    },
    init() {
      const { chdv, chnl } = this.driverData
      this.chdv = chdv
      if (chnl.length) {
        this.chnl = chnl
        if (this.chdv) {
          this.north = this.chnl[1].chdv
        }
      } else {
        this.chnl = [
          {
            chdv: '',
            tcph: '',
            tcpp: 0,
            ttyc: '',
            ttyb: 9600,
            ttyd: 8,
            ttys: '1',
            ttyp: 'N',
            parm: [],
          },
          {
            chdv: '',
            tcph: '',
            tcpp: 0,
            ttyc: '',
            ttyb: 9600,
            ttyd: 8,
            ttys: '1',
            ttyp: 'N',
            parm: [],
          },
        ]
      }
    },
    setDeviceList(data) {
      if (data.func === 26) {
        this.rs232Options = data.rows
      }
    },
    getDeviceList(north) {
      if (north === 'rs232') {
        getData(this.nodeId, {
          func: 26,
          wtrm: 'neuron',
        }).then((res) => {
          this.setDeviceList(res.data)
        })
      }
    },
    handleTtycChange(val) {
      const { fdrw } = this.rs232Options.find((item) => item.name === val)
      this.fdrw = fdrw
    },
  },
}
</script>

<style lang="scss">
.driver-setup {
  h3 {
    margin-bottom: 20px;
  }
  .driver-type-title {
    margin-top: 0px;
  }
  .el-select {
    width: 100%;
  }
  .edit-drivers-row {
    margin-bottom: 28px;
    h3 {
      margin: 30px 0;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  .error-permission {
    .el-input__inner {
      color: #f56c6c;
    }
  }
  .permission-tip {
    margin: 0px;
  }
}
.EthernetFormItem {
  display: flex;
}
</style>
