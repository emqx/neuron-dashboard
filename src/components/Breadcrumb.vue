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
import { cloneDeep } from 'lodash'

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

// Only current rou te params are supported
const getBreadcrumbs = () => {
  const { matched, meta, params } = $route
  if (meta.hiddenBreadcrumb) {
    state.levelList = []
    return
  }

  const currentMatched: any[] = matched.filter((item: any) => item.meta && item.meta.title)
  const routesL = currentMatched.length

  if (routesL >= 3) {
    // Multi-layer routing nesting
    const parmasKeys: string[] = Object.keys(params)

    if (!parmasKeys.length) {
      state.levelList = currentMatched
      return
    }

    for (let i = 1; i < routesL; i += 1) {
      const routeItem = cloneDeep(currentMatched[i])
      const { path } = routeItem
      let newPath = ''
      parmasKeys.forEach((key: string) => {
        if (path.includes(key)) {
          const param: any = params[key]
          newPath = path.replace(`:${key}`, param)
        }
      })
      if (newPath) {
        currentMatched[i].path = newPath
      }
    }
  }
  state.levelList = currentMatched
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
