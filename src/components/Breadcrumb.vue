<template>
  <emqx-breadcrumb v-if="isShowBreadcrumbs" separator="/" class="breadcrumb">
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
import { defineComponent, onBeforeMount, watch, reactive, toRefs, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setBreadcrumbFullPaths, getBreadcrumbFullPaths } from '@/utils/user'

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

const isShowBreadcrumbs = computed(() => !$route.meta.hiddenBreadcrumb)

// get localstorage breadcrumbs && exchan
const getBreadcrumbsToMap = (): Map<string, string> => {
  const nameFullPaths = getBreadcrumbFullPaths()
  if (!nameFullPaths) return new Map()

  const nameFullPathArray: string[] = nameFullPaths.split(';') // ['name: fullpath', 'name2:fullpath2']
  const fullPathArray: any = nameFullPathArray.map((item: string) => item.split(':')) // [[naem,fullpath], [namefullpath22, ]]
  const fullPathsMap: Map<string, string> = new Map(fullPathArray)
  fullPathsMap.delete('')
  return fullPathsMap
}
// set fullpath to all matched routes
const getRoutesWithFullPath = (routes: any[]): any[] => {
  const fullPaths = getBreadcrumbsToMap()
  const newRoute = routes.map((item: any) => {
    const fullPath = fullPaths.get(item.name)
    if (fullPath) {
      item.fullPath = fullPath
    }
    return item
  })
  return newRoute
}

const getBreadcrumbs = () => {
  const { fullPath, matched } = $route

  if ($route.meta.hiddenBreadcrumb) {
    state.levelList = []
    setBreadcrumbFullPaths('')
    return
  }

  const newMatched = matched.filter((item: any) => item.meta && item.meta.title)
  // set curent route fullpath
  const currentRoute = {
    ...newMatched[newMatched.length - 1],
    fullPath,
  }
  newMatched[newMatched.length - 1] = currentRoute

  const lastMatchedToString = getBreadcrumbFullPaths()
  const lasteMatchedMap = getBreadcrumbsToMap() // last time matched

  const lastMatchedL = lasteMatchedMap.size
  const newMatchedL = newMatched?.length
  const rootRouteName: any = newMatchedL ? newMatched[0].name : ''

  if (lastMatchedL && newMatchedL && rootRouteName && lasteMatchedMap.get(rootRouteName)) {
    // same parent node
    if (lastMatchedL < newMatchedL) {
      // into new page
      const routeName: string = String(currentRoute.name) || ''
      const nameFullPathGroup = `${routeName}:${fullPath};`
      setBreadcrumbFullPaths(`${lastMatchedToString}${nameFullPathGroup}`)
    }
  } else {
    const namePaths = newMatched.map((item: any) => {
      const fullpath = item.fullPath || item.path
      return `${item.name}:${fullpath}`
    })
    const namePathToString = namePaths
      ? namePaths.reduce((arr, cur) => {
          return `${arr};${cur};`
        })
      : ''
    setBreadcrumbFullPaths(namePathToString)
  }
  state.levelList = getRoutesWithFullPath(newMatched)
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
@import '@/styles/edge-layout-variables.scss';

.breadcrumb {
  padding-bottom: $--padding-tb-normal;
  padding-top: 0;
}
.nav-breadcrumb {
  height: 32px;
  background: #fff;
  line-height: 32px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}
</style>
