<template>
  <div class="btn-group">
    <ControlGroup />
    &nbsp;&nbsp;
    <!-- <FullScreen></FullScreen> -->
    &nbsp;&nbsp;
    <!-- <UserDropdown></UserDropdown> -->
  </div>
</template>

<script>
export default {
  components: {
    // FullScreen: () => import('./components/FullScreen'),
    // UserDropdown: () => import('./components/UserDropdown'),
    ControlGroup: () => import('./components/ControlGroup'),
  },
}
</script>

<style scoped></style>
