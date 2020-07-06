<template>
  <el-submenu :index="menu.name">
    <template slot="title">
      <i :class="`fa fa-${menu.icon || 'folder-o'}`"></i>
      <span slot="title">{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children">
      <MenuItem v-if="child.children === undefined" :key="childIndex" :menu="child"/>
      <MenuSub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuSub',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  components: {
    MenuItem: () => import('../MenuItem')
  }
}
</script>
