<template>
  <emqx-breadcrumb separator="/">
    <transition-group name="breadcrumb" mode="out-in">
      <emqx-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === levelList.length - 1" class="no-redirect">
          {{ $t(`${item.meta.title}`) }}
        </span>
        <a v-else @click.prevent="onHandleLink(item)">{{ $t(`${item.meta.title}`) }}</a>
      </emqx-breadcrumb-item>
    </transition-group>
  </emqx-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Breadcrumb',
})
</script>

<script lang="ts" setup>
const $route = useRoute()
const $router = useRouter()
const state = reactive({
  levelList: [] as Array<any>,
})
const { levelList } = toRefs(state)

onBeforeMount(() => {
  getBreadcrumbs()
})

watch(
  () => $route.path,
  () => {
    getBreadcrumbs()
  },
  { immediate: false },
)

const getBreadcrumbs = () => {
  const { fullPath, matched } = $route
  if ($route.meta.hiddenBreadcrumb) {
    state.levelList = []
    return
  }
  const newMatched = matched.filter((item: any) => item.meta && item.meta.title)

  const current_route = {
    ...newMatched[newMatched.length - 1],
    fullPath,
  }
  newMatched[newMatched.length - 1] = current_route

  const formMatched = state.levelList // last time matched

  const formMatchedL = formMatched?.length
  const newMatchedL = newMatched?.length
  if (formMatchedL && newMatchedL && formMatched[0].name === newMatched[0].name) {
    // same parent node
    if (formMatchedL < newMatchedL) {
      // into new page
      formMatched.push(current_route)
      state.levelList = formMatched
    } else if (formMatchedL === newMatchedL) {
      formMatched[formMatched.length - 1] = current_route
      state.levelList = formMatched
    } else {
      // go back
      const i = formMatched.findIndex((item) => item.name === current_route.name)
      state.levelList = i > -1 ? formMatched.slice(0, i + 1) : formMatched
    }
  } else {
    state.levelList = newMatched
  }
}

const onHandleLink = (item: any) => {
  const { redirect, path, fullPath } = item
  if (redirect) {
    $router.push(redirect)
    return
  }
  const to_path = fullPath || path
  $router.push(to_path)
}
</script>

<style lang="scss" scoped>
.nav-breadcrumb {
  height: 32px;
  background: #fff;
  line-height: 32px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}
</style>
