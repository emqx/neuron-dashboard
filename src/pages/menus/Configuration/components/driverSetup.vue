<template>
  <div class="driver-setup" style="display: inline-block;">
    <el-button @click="dialogTableVisible = true">{{ driverData.chdv === '' ? 'New' : 'Edit' }} Driver</el-button>
    <el-dialog title="Driver Setup" @closed="close" :visible.sync="dialogTableVisible">
      <h3 class="driver-type-title">
        Driver type
      </h3>
      <el-row class="type-row" :gutter="20" type="flex" align="middle">
        <el-col :span="12">
          <el-select v-model="chdv">
            <el-option v-for="item in driverList" :key="item.val" :label="item.label" :value="item.val"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <div>{{ driverType }}</div>
        </el-col>
      </el-row>
      <el-row class="edit-drivers-row" :gutter="20">
        <template v-if="driverType === 'Ethernet drivers'">
          <el-col :span="24">
            <h3>Ethernet driver setup</h3>
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
        <template v-else-if="driverType === 'Serial drivers'">
          <el-col :span="24">
            <h3>Serial driver setup</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupForm" label-width="100px" :model="chnl[0]">
              <el-form-item label="Device name">
                <el-input v-model="chnl[0].ttyc"></el-input>
              </el-form-item>
              <el-form-item label="Baud rate">
                <el-input v-model="chnl[0].ttyb"></el-input>
              </el-form-item>
              <el-form-item label="Data bit">
                <el-input v-model="chnl[0].ttyd"></el-input>
              </el-form-item>
              <el-form-item label="Stop bit">
                <el-input v-model="chnl[0].ttys"></el-input>
              </el-form-item>
              <el-form-item label="Parity bit">
                <el-input v-model="chnl[0].ttyp"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </template>
        <el-col v-if="driverType === 'Serial drivers' || driverType === 'Ethernet drivers'" :span="24">
          <el-table v-if="chnl[0].parm && chnl[0].parm.length" class="script-table" :data="chnl[0].parm">
            <el-table-column label="Vars" prop="vars"> </el-table-column>
            <el-table-column label="Pars" prop="pars">
              <template slot-scope="scope">
                <el-input placeholder="" size="mini" v-model="scope.row.pars"> </el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24">
          <h3>MQTT</h3>
        </el-col>
        <el-col :span="12">
          <el-select v-model="mqtt">
            <el-option label="pahomq" value="pahomq"></el-option>
          </el-select>
        </el-col>
        <template v-if="mqtt">
          <el-col :span="24">
            <h3>MQTT Setup</h3>
          </el-col>
          <el-col :span="24">
            <el-form ref="driverSetupMQTTForm" label-width="80px" label-position="left">
              <el-col :span="12">
                <el-form-item label="Host name">
                  <el-input v-model="chnl[1].tcph"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Host name">
                  <el-input-number v-model="chnl[1].tcpp" :controls="false" :precision="0" :min="0" />
                </el-form-item>
              </el-col>
            </el-form>
          </el-col>
          <el-col :span="24">
            <el-table v-if="chnl[1].parm" class="script-table" :data="chnl[1].parm">
              <el-table-column label="Vars" prop="vars"> </el-table-column>
              <el-table-column label="Pars" prop="pars">
                <template slot-scope="scope">
                  <el-input
                    :type="scope.row.vars === 'PASSWORD' ? 'password' : ''"
                    placeholder=""
                    size="mini"
                    v-model="scope.row.pars"
                  >
                  </el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </template>
      </el-row>
      <span slot="footer">
        <el-button @click="submit">submit</el-button>
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
      mqtt: '',
      chnl: [
        {
          chdv: '',
          tcph: '',
          tcpp: '',
          ttyc: '',
          ttyb: 0,
          ttyd: 0,
          ttys: '',
          ttyp: '',
          parm: [],
        },
        {
          chdv: 'pahomq',
          tcph: 'broker.emqx.io',
          tcpp: '1883',
          ttyc: '',
          ttyb: 0,
          ttyd: 0,
          ttys: '',
          ttyp: 'N',
          parm: [
            {
              vars: 'USERNAME',
              pars: '',
            },
            {
              vars: 'PASSWORD',
              pars: '',
            },
            {
              vars: 'CERTIFICATE',
              pars: '',
            },
            {
              vars: 'KEYFILE',
              pars: '',
            },
          ],
        },
      ], // Channel Details
    }
  },
  methods: {
    ...mapMutations({
      setDriverData: 'setDriverData',
    }),
    submit() {
      this.dialogTableVisible = false
      let chnl = []
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
      if (ipPortChdvTypes.indexOf(this.chdv) !== -1) {
        chnl = this.chnl.filter((item) => item.tcph && item.tcpp)
        chnl[0].chdv = this.chdv
      }
      this.setDriverData({ chdv: this.chdv, chnl })
    },
    close() {
      this.$nextTick(this.init)
    },
    getDriverParams(drvn) {
      this.$ws().set({ success: this.setParams }).send({ func: 24, drvn })
    },
    setParams(data) {
      this.$ws().remove(this.setParams)
      if (data.func === 24 && !data.errc) {
        this.chnl[0].parm = data.parm
      }
    },
    init() {
      const { chdv, chnl } = this.driverData
      this.chdv = chdv
      this.chnl = chnl
      if (this.chdv) {
        this.mqtt = this.chnl[1].chdv
      }
    },
  },
  created() {
    this.init()
  },
  watch: {
    chdv(val) {
      if (this.dialogTableVisible) {
        const [driver, mqtt] = this.chnl
        this.chnl = [
          {
            chdv: val,
            tcph: '',
            tcpp: '',
            ttyc: '',
            ttyb: 0,
            ttyd: 0,
            ttys: '',
            ttyp: '',
            parm: [],
          },
          mqtt,
        ]
        this.getDriverParams(val)
      }
    },
    mqtt(val) {
      if (this.dialogTableVisible) {
        const [driver] = this.chnl
        this.chnl = [
          driver,
          {
            chdv: 'pahomq',
            tcph: 'broker.emqx.io',
            tcpp: '1883',
            ttyc: '',
            ttyb: 0,
            ttyd: 0,
            ttys: '',
            ttyp: 'N',
            parm: [
              {
                vars: 'USERNAME',
                pars: '',
              },
              {
                vars: 'PASSWORD',
                pars: '',
              },
              {
                vars: 'CERTIFICATE',
                pars: '',
              },
              {
                vars: 'KEYFILE',
                pars: '',
              },
            ],
          },
        ]
      }
    },
  },
  computed: {
    driverType() {
      let tmp = this.driverList.find((i) => i.val === this.chdv)
      return tmp ? tmp.type : ''
    },
    ...mapState({
      driverData: (state) => state.SetUpData.driverData,
    }),
    driverList() {
      return this.$store.state.Device.deviceList
    },
  },
}
</script>

<style scoped lang="scss">
.driver-setup {
  .driver-type-title {
    margin-top: 0px;
  }
  .el-select {
    width: 100%;
  }
  .edit-drivers-row {
    h3 {
      margin: 30px 0;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
.EthernetFormItem {
  display: flex;
}
</style>
