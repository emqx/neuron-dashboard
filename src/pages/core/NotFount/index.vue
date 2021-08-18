<template>
  <!-- <Container type="card-full"> -->
  <div class="not">
    <p>404</p>
    <p>{{ $t('common.notFound') }}</p>
    <div class="dd-mt">
      <el-button @click="$router.push({ name: 'index' })">Index</el-button>
    </div>
  </div>
  <!-- </Container> -->
</template>

<style scoped lang="scss">
@import '@/assets/style/public.scss';
.not {
  display: flex;
  height: 100%;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  p {
    font-size: 24px;
    color: $color-text-main;
    margin: 20px;
  }
}
</style>
