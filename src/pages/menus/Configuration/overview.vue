<template>
  <Container type="card-full" :scorll="false">
    <div class="flex">
      <div class="dd-title">{{ $t('configuration.overview') }}</div>
    </div>
    <br />
    <p>{{ $t('configuration.driverName') }}: {{ deviceObj.label }} {{ deviceObj.type }}</p>
    <br />
    <div class="dd-mb">
      <p>Object:</p>
      <br />
      <ObjectTable showAttr :showSelection="false" />
    </div>

    <div class="dd-mb">
      <p>{{ $t('configuration.event') }}:</p>
      <br />
      <EventTable :eventList="res.msgd" />
    </div>
  </Container>
</template>

<script>
import { mapGetters } from 'vuex'
import EventTable from './components/eventTable'
import ObjectTable from './components/objectTable'
import Container from '@/components/core/Container/index.vue'

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
    Container,
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
