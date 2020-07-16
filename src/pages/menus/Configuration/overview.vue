<template>
  <Container type="card-full"
             :scorll='false'>
    <div class="flex">
      <div class="dd-title">Overview</div>
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
import { mapGetters } from 'vuex'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'

export default {
  data () {
    return {
      minWidth: '150'
    }
  },
  computed: {
    ...mapGetters(['res', 'deviceObj'])
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
