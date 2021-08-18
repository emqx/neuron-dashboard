<template>
  <emqx-submenu :index="menu.name">
    <template v-slot:title>
      <i :class="`fa fa-${menu.icon || 'folder-o'}`"></i>
      <span>{{ menu.title }}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <menu-item v-if="child.children === undefined" :key="childIndex" :menu="child" />
      <emqx-menu-sub v-else :menu="child" :key="childIndex" />
    </template>
  </emqx-submenu>
</template>

<script>
import MenuItem from '../MenuItem'

export default {
  name: 'MenuSub',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  components: {
    MenuItem,
  },
}
</script>
