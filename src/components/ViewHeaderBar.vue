<template>
  <emqx-row class="header-bar-container">
    <emqx-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" class="header-col">
      <div class="header-left">
        <slot name="left"></slot>
      </div>
      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </emqx-col>
  </emqx-row>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.header-bar-container {
  :deep(.header-col) {
    @include display-flex(space-between, center);
    height: auto;
    margin-bottom: 6px;
  }

  .header-left,
  .header-right {
    display: flex;
  }

  :deep(.header-item) {
    display: inline-block;
    margin-bottom: 10px;
  }

  :deep(.header-item.btn),
  :deep(.header-left .header-item) {
    margin-left: 0px !important;
    margin-right: 6px !important;
  }

  :deep(.header-right .header-item:not(:last-child)) {
    margin-right: 6px;
  }

  /* search */
  :deep(.search-group) {
    display: inline-block;
  }

  :deep(.search-group.margin20) {
    display: inline-block;
    margin: 0 16px;
  }

  :deep(.search-group.margin10) {
    display: inline-block;
    margin: 0 6px;
  }

  :deep(.search-group .group-item:not(:last-child)) {
    margin-right: 6px;
  }

  :deep(.search-group .group-item.btn) {
    width: 80px;
  }

  :deep(.label) {
    display: inline-block;
    text-align: left;
    min-width: 60px;
    color: #999;
    font-size: 14px;
    line-height: 40px;
  }
}
</style>
