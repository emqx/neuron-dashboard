<template>
  <el-menu-item :index="menu.name">
    <i :class="`fa fa-${menu.icon || 'file-o'}`"></i>
    &nbsp;&nbsp;
    {{ menu.title || menu.name }}
  </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
}
</script>
