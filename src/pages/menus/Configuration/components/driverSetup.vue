<template>
  <div class="driver-setup" style="display: inline-block;">
    <el-button @click="dialogTableVisible = true">{{
      driverData.chdv === '' ? $t('configuration.newDriver') : $t('configuration.editDriver')
    }}</el-button>
    <el-dialog :title="$t('configuration.driverSetup')" @closed="close" :visible.sync="dialogTableVisible">
      <h3 class="driver-type-title">
        {{ $t('configuration.driverProtocolName') }}
      </h3>
      <el-row class="type-row" :gutter="20" type="flex" align="middle">
        <el-col :span="12">
          <el-select v-model="chdv">
            <el-option v-for="item in southDriverList" :key="item.val" :label="item.label" :value="item.val">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <div>{{ southDriverType }}</div>
        </el-col>
      </el-row>
      <el-row class="edit-drivers-row" :gutter="20">
        <template v-if="southDriverType === 'Ethernet drivers'">
          <el-col :span="24">
            <h3>Ethernet {{ $t('configuration.driverSetup') }}</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupForm" label-width="80px" label-position="left">
              <el-col :span="12">
                <el-form-item label="Host name">
                  <el-input v-model="chnl[0].tcph"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Port no">
                  <el-input-number v-model="chnl[0].tcpp" :controls="false" :precision="0" :min="0" />
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </template>
        <template v-else-if="southDriverType === 'Serial drivers'">
          <el-col :span="24">
            <h3>Serial {{ $t('configuration.driverSetup') }}</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupForm" label-width="100px" :model="chnl[0]">
              <el-form-item label="Device name">
                <el-input v-model="chnl[0].ttyc"></el-input>
              </el-form-item>
              <el-form-item label="Baud rate">
                <el-select v-model="chnl[0].ttyb">
                  <el-option v-for="value in ttybList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Data bit">
                <el-select v-model="chnl[0].ttyd">
                  <el-option v-for="value in ttydList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Stop bit">
                <el-select v-model="chnl[0].ttys">
                  <el-option v-for="value in ttysList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Parity bit">
                <el-select v-model="chnl[0].ttyp">
                  <el-option
                    v-for="item in ttypList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </template>
        <el-col v-if="southDriverType === 'Serial drivers' || southDriverType === 'Ethernet drivers'" :span="24">
          <el-table v-if="chnl[0].parm && chnl[0].parm.length" class="script-table" :data="chnl[0].parm">
            <el-table-column label="Vars" prop="vars"> </el-table-column>
            <el-table-column label="Pars" prop="pars" min-width="180px">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.pars"> </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <h3>{{ $t('configuration.northServiceProtocolName') }}</h3>
      <el-row class="type-row" :gutter="20" type="flex" align="middle">
        <el-col :span="12">
          <el-select v-model="north">
            <el-option v-for="item in northDriverList" :key="item.val" :label="item.label" :value="item.val">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <div>{{ northDriverType }}</div>
        </el-col>
      </el-row>
      <el-row class="edit-drivers-row" :gutter="20">
        <template v-if="northDriverType === 'Ethernet drivers'">
          <el-col :span="24">
            <h3>Ethernet {{ $t('configuration.driverSetup') }}</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupForm" label-width="80px" label-position="left">
              <el-col :span="12">
                <el-form-item label="Host name">
                  <el-input v-model="chnl[1].tcph"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Port no">
                  <el-input-number v-model="chnl[1].tcpp" :controls="false" :precision="0" :min="0" />
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
        </template>
        <template v-else-if="northDriverType === 'Serial drivers'">
          <el-col :span="24">
            <h3>Serial {{ $t('configuration.driverSetup') }}</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupForm" label-width="100px" :model="chnl[1]">
              <el-form-item label="Device name">
                <el-input v-if="north !== 'rs232'" v-model="chnl[1].ttyc"></el-input>
                <el-select
                  :class="{ 'error-permission': fdrw === -1 }"
                  v-else
                  v-model="chnl[1].ttyc"
                  @change="handleTtycChange"
                >
                  <el-option
                    v-for="(item, index) in rs232Options"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <p v-if="fdrw === -1" class="permission-tip">{{ $t('configuration.noPermissions') }}</p>
              </el-form-item>
              <el-form-item label="Baud rate">
                <el-select v-model="chnl[1].ttyb">
                  <el-option v-for="value in ttybList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Data bit">
                <el-select v-model="chnl[1].ttyd">
                  <el-option v-for="value in ttydList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Stop bit">
                <el-select v-model="chnl[1].ttys">
                  <el-option v-for="value in ttysList" :key="value" :label="value" :value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Parity bit">
                <el-select v-model="chnl[1].ttyp">
                  <el-option
                    v-for="item in ttypList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </template>
        <el-col v-if="northDriverType === 'Serial drivers' || northDriverType === 'Ethernet drivers'" :span="24">
          <el-table v-if="chnl[1].parm && chnl[1].parm.length" class="script-table" :data="chnl[1].parm">
            <el-table-column label="Vars" prop="vars"> </el-table-column>
            <el-table-column label="Pars" prop="pars" min-width="180px">
              <template slot-scope="scope">
                <el-input :type="scope.row.vars === 'PASSWORD' ? 'password' : ''" size="mini" v-model="scope.row.pars">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button @click="submit">{{ $t('common.submit') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
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
      this.$ws().set({ success: this.setParams }).send({ func: 24, drvn })
    },
    setParams(data) {
      if (data.func === 24 && !data.errc) {
        this.$ws().remove(this.setParams)
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
        this.$ws().remove(this.setDeviceList)
      }
    },
    getDeviceList(north) {
      if (north === 'rs232') {
        this.$ws().set({ success: this.setDeviceList }).send({ func: 26 })
      }
    },
    handleTtycChange(val) {
      const { fdrw } = this.rs232Options.find((item) => item.name === val)
      this.fdrw = fdrw
    },
  },
  created() {
    this.init()
    this.getDeviceList(this.north)
  },
  watch: {
    chdv(val) {
      if (this.dialogTableVisible) {
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
  },
  computed: {
    ...mapState({
      driverData: (state) => state.SetUpData.driverData,
    }),
    southDriverType() {
      let tmp = this.southDriverList.find((i) => i.val === this.chdv)
      return tmp ? tmp.type : ''
    },
    southDriverList() {
      return this.$store.state.Device.southDriverList
    },
    northDriverType() {
      let tmp = this.northDriverList.find((i) => i.val === this.north)
      return tmp ? tmp.type : ''
    },
    northDriverList() {
      return this.$store.state.Device.northDriverList
    },
  },
}
</script>

<style lang="scss">
.driver-setup {
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
