<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex">
      <div class="dd-title">Overview</div>
      <el-button @click="submit">submit</el-button>
    </div>
    <p>Driver Name: {{deviceObj.label}} &nbsp;&nbsp;&nbsp;&nbsp; {{deviceObj.type}}</p>
    <div class="dd-mb">
      <p>Object:</p>
      <ObjectTable showAttr />
    </div>

    <div class="dd-mb">
      <p>Event:</p>
      <EventTable :eventList='res.msgd' />
    </div>
  </Container>
</template>

<script>
import indexMixin from '../mixins'
import { mapGetters } from 'vuex'
import { clone } from '@/utils'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'
export default {
  mixins: [indexMixin],
  data () {
    return {
      minWidth: '150',
      driverName: '',
      driverType: ''
    }
  },
  computed: {
    ...mapGetters(['res', 'deviceObj']),
    driverList () {
      return this.$store.state.Device.deviceList
    }
  },
  methods: {
    submit () {
      let res = clone(this.res)
      res.objd.forEach(i => {
        if (i.preAndSuff) delete i.preAndSuff
      })
      res.func = 21
      this.$ws().set({ success: this.handleSuccess }).send(res)
    },
    handleSuccess (data) {
      if (data.func === 21) {
        this.$ws().remove(this.handleSuccess)
        this.$message.success('submit success!')
      }
    }
  },
  components: {
    EventTable,
    ObjectTable
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/public";
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
