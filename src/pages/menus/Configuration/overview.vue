<template>
  <Container type="card-full" :scorll="false">
    <div class="flex">
      <div class="dd-title">{{ $t('configuration.overview') }}</div>
    </div>
    <p>{{ $t('configuration.driverName') }}: {{ deviceObj.label }} &nbsp;&nbsp;&nbsp;&nbsp; {{ deviceObj.type }}</p>
    <div class="dd-mb">
      <p>{{ $t('configuration.object') }}:</p>
      <ObjectTable showAttr :showSelection="false" />
    </div>

    <div class="dd-mb">
      <p>{{ $t('configuration.event') }}:</p>
      <EventTable :eventList="res.msgd" />
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'

export default {
  data() {
    return {
      minWidth: '150',
    }
  },
  computed: {
    ...mapGetters(['res', 'deviceObj']),
  },
  components: {
    EventTable,
    ObjectTable,
  },
}
</script>

<style scoped lang="scss">
@import '@/assets/style/public';
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
