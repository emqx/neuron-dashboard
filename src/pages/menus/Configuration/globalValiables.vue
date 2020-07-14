<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex dd-mb">
      <div class="dd-title">Global Valiables</div>
      <div>
        <el-button @click='handleSubmit'>submit</el-button>
      </div>
    </div>
    <el-table class="script-table"
              :data='varData'>
      <el-table-column label="Variable G."
                       min-width="120">
        <template slot-scope="scope">
          <el-input placeholder=""
                    @keyup.enter.native='add(scope.$index)'
                    size="mini"
                    v-model="scope.row.glov">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="Nos"
                       min-width="100">
        <template slot-scope="scope">
          <el-input placeholder=""
                    @keyup.enter.native='add(scope.$index)'
                    size="mini"
                    v-model="scope.row.leng" />
        </template>
      </el-table-column>
      <el-table-column label="Description"
                       min-width="300">
        <template slot-scope="scope">
          <el-input placeholder=""
                    size="mini"
                    v-model="scope.row.comt">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column min-width="60">
        <template slot-scope="scope">
          <div class='btn'>
            <i class="el-icon-circle-plus plus"
               @click='add(scope.$index)'></i>&nbsp;
            <i class="el-icon-remove remove"
               @click='remove(scope.$index)'></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </Container>
</template>

<script>
import Mixins from '@/mixins'
import { clone } from '@/utils'
export default {
  mixins: [Mixins],
  data () {
    return {
      varData: [],
      func: 30
    }
  },
  beforeMount () {
    this.init()
  },
  methods: {
    init () {
      this.$ws().set({ success: this.readGlobalVariable }).send({ func: this.func })
    },
    readGlobalVariable (data) {
      if (data.func === this.func) {
        this.$ws().remove(this.readGlobalVariable)
        this.varData = data.rows
        let i = 5
        while (i--) {
          this.varData.push({
            'glov': '',
            'leng': '',
            'comt': ''
          })
        }
      }
    },
    handleSubmit () {
      this.$confirm('Are you sure submit these gloabl valiables', 'Submit', {
        type: 'warning'
      }).then(() => {
        const res = clone(this.varData).filter(i => {
          i.leng = +i.leng
          return i.glov && i.leng
        })
        this.$ws().set().send({
          func: 31,
          nrow: res.length,
          rows: res
        })
      }).catch(() => {
      })
    },
    add (index) {
      this.varData.splice(index + 1, 0, {
        'glov': '',
        'leng': '',
        'comt': ''
      })
    },
    remove (index) {
      this.varData.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public";
.input-number {
  /deep/input {
    text-align: left;
  }
}
.btn {
  font-size: 24px;
  .plus {
    color: $color-primary;
    cursor: pointer;
  }
  .remove {
    color: $color-danger;
    cursor: pointer;
  }
}
</style>
