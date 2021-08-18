<template>
  <emqx-menu-item :index="menu.name">
    <i :class="`fa fa-${menu.icon || 'file-o'}`"></i>
    {{ menu.title || menu.name }}
  </emqx-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
}
</script>
