<template>
  <el-table :data='attributeList'
            @selection-change="handleSelectionChange"
            style='width:100%;'>
    <el-table-column type="selection"
                     v-if='showBtn'
                     width="55">
    </el-table-column>
    <el-table-column prop="attn"
                     :min-width="80"
                     label="Name" />
    <el-table-column label="Object: Address"
                     min-width="250">
      <template slot-scope="scope">
        <div>
          <div v-for="item in scope.row.aadd"
               class="addrs"
               :key='getFullName(item.pref,item.suff)'>
            {{getFullName(item.pref,item.suff)}}:
            &nbsp;
            {{item.addr}}
          </div>
        </div>
        <!-- <span>{{scope.row.aadd}}</span> -->
      </template>
    </el-table-column>
    <el-table-column prop="attt"
                     :width="minWidth"
                     label="Type" />
    <el-table-column prop="deci"
                     :width="minWidth"
                     label="Decimal" />
    <el-table-column prop="adis"
                     :width="minWidth"
                     label="Visible">
      <template slot-scope='scope'>
        {{scope.row.adis?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="achg"
                     :width="minWidth"
                     label="Change">
      <template slot-scope='scope'>
        {{scope.row.achg?'YES':'NO'}}
      </template>
    </el-table-column>
    <el-table-column prop="attr"
                     :width="minWidth"
                     label="RW" />
    <el-table-column prop="rtim"
                     :width="minWidth"
                     label="Rtime" />
    <el-table-column :width="180"
                     v-if="showBtn">
      <template slot-scope="scope">
        <el-button type="text"
                   @click="handleEdit(scope.row)">Edit</el-button>
        <el-button type='text'
                   @click="addAddress(scope.row)">Address</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Mixins from '@/mixins'
import { clone } from '@/utils'

export default {
  mixins: [Mixins],
  props: {
    value: {
      type: Array
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    attributeList: {
      type: Array,
      required: true
    },
    objectName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minWidth: '90',
      multipleSelection: []
    }
  },
  methods: {
    addAddress (row) {
      this.$emit('add', row)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('input', this.multipleSelection)
    },
    getFullName (pref, suff) {
      pref = pref ? pref + '_' : ''
      suff = suff ? '_' + suff : ''
      return pref + this.objectName + suff
    },
    handleEdit (row) {
      this.$emit('edit', clone(row))
    }
  },
  watch: {
    value (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public.scss";

.addrs {
  border-bottom: 1px solid $color-border-main;
  padding: 5px;
  &:last-child {
    border: none;
  }
}
</style>
