<template>
  <div class="collapse-all">
    <el-radio-group v-model="isCollapseAll" size="mini" @change="switchCollapseAll">
      <el-radio-button class="item" label="expand">{{ $t('common.expandAll') }}</el-radio-button>
      <el-radio-button class="item" label="collapse">{{ $t('common.collapseAll') }}</el-radio-button>
    </el-radio-group>
  </div>

  <section class="southGroupCheckboxGroups" :class="{ 'empty-southGroupCheckboxGroups': !southNodeList.length }">
    <el-collapse v-if="southNodeList.length" v-model="activeNames" @change="handleCollapseStatus">
      <template v-for="node in southNodeList" :key="node.name">
        <el-collapse-item v-if="isHasGroups(node.name)" :title="node.name" :name="node.name">
          <template #title>
            <i
              class="icon-arrow"
              :class="activeNames.includes(node.name) ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
            />
            <el-checkbox
              v-model="node.checkedAll"
              :indeterminate="isIndeterminateValues[node.name]"
              class="node-name"
              @change="handelCheckedAll($event, node.name)"
            >
              {{ node.name }}
            </el-checkbox>
          </template>

          <main class="groups-wrapper">
            <el-checkbox-group
              v-if="isHasGroups(node.name)"
              v-model="checkedValue[node.name]"
              @change="handleCheckedGroups($event, node.name)"
            >
              <el-checkbox v-for="group in allSouthGroups[node.name]" :key="group" :label="group" class="group-item">
                {{ group }}
              </el-checkbox>
            </el-checkbox-group>
            <span v-else class="empty-groups">{{ $t('common.emptyData') }}</span>
          </main>
        </el-collapse-item>
      </template>
    </el-collapse>

    <span v-else class="empty-groups">{{ $t('common.emptyData') }}</span>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, nextTick, computed } from 'vue'
import type { Ref, PropType } from 'vue'
import { ElCollapse, ElCollapseItem, ElCheckbox, ElCheckboxGroup, ElRadioGroup, ElRadioButton } from 'element-plus'
import { queryGroupList, querySouthDriverList } from '@/api/config'
import type { RawDriverData } from '@/types/config'

const props = defineProps({
  // e.i. { node: [checked groups] }
  modelValue: { type: Object as PropType<Record<string, Array<any>>>, default: () => null },
  disabled: { type: Boolean, default: false },
})
const emits = defineEmits(['update:modelValue'])

interface RawDriverDataInCheck extends RawDriverData {
  checkedAll: boolean
}

type NodeGroupsType = Record<string, Array<string>>

const isCollapseAll = ref('collapse') // default collapse all
const activeNames: Ref<Array<string>> = ref([])

const checkedValue: Ref<Record<string, Array<string>>> = ref({})
const isIndeterminateValues: Ref<Record<string, boolean>> = ref({}) // Mark all selected

const southNodeList: Ref<Array<RawDriverDataInCheck>> = ref([])
const allSouthGroups: Ref<NodeGroupsType> = ref({}) // { node: [gorups] }

const allNodeNameList = computed(() => {
  const list = southNodeList.value.map((item) => item.name)
  return list
})

const isHasGroups = computed(() => (nodeName: string) => {
  return allSouthGroups.value[nodeName]?.length
})

watch(
  () => props.modelValue,
  (newV) => {
    nextTick(() => {
      // need set defualt checkedValue,void v-model value is undefined
      setDefaultCheckedValue(newV)
      initCollapse()
    })
  },
)
watch(checkedValue.value, (newV) => {
  emits('update:modelValue', newV)
})

const switchCollapseAll = (value: string) => {
  if (value === 'expand') {
    activeNames.value = allNodeNameList.value
  } else {
    activeNames.value = []
  }
}

// set expand and collapse all status when expand or collapse item
const handleCollapseStatus = () => {
  if (activeNames.value.length === allNodeNameList.value.length) {
    isCollapseAll.value = 'expand'
  } else if (!activeNames.value.length) {
    isCollapseAll.value = 'collapse'
  } else {
    isCollapseAll.value = ''
  }
}

const handelCheckedAll = (val: boolean, nodeName: string) => {
  checkedValue.value[nodeName] = val ? allSouthGroups.value[nodeName] : []
  isIndeterminateValues.value[nodeName] = false
}

const setCheckedAllValue = (nodeName: string, isLength = true) => {
  const groupLen = allSouthGroups.value[nodeName].length
  const checkedValueLen = checkedValue.value[nodeName].length

  const index = southNodeList.value.findIndex((item) => item.name === nodeName)
  if (index >= 0) {
    southNodeList.value[index].checkedAll = checkedValueLen === groupLen && isLength
  }
}
const handleCheckedGroups = (value: string[], nodeName: string) => {
  const groupLen = allSouthGroups.value[nodeName].length
  const checkedGroupsLen = value.length

  setCheckedAllValue(nodeName)
  isIndeterminateValues.value[nodeName] = checkedGroupsLen > 0 && checkedGroupsLen < groupLen
}

const setDefaultCheckedValue = (data: Record<string, Array<any>>): any => {
  checkedValue.value = data || {}

  southNodeList.value.forEach((node) => {
    const nodeName = node.name
    if (!checkedValue.value[nodeName]) {
      checkedValue.value[nodeName] = []
    }

    setCheckedAllValue(nodeName, false) // void length === 0
    // set Indeterminate
    const checkedValueLen = checkedValue.value[nodeName].length
    const groupLen = allSouthGroups.value[nodeName].length
    isIndeterminateValues.value[nodeName] = checkedValue.value[nodeName].length > 0 && checkedValueLen < groupLen
  })
}
const initCollapse = () => {
  isCollapseAll.value = 'collapse'
  activeNames.value = []
}

const getGroupList = async (nodeName: string) => {
  try {
    const data = await queryGroupList(nodeName.toString())
    const list = data.map((item) => item.name)
    return Promise.resolve({ node: nodeName, groups: list })
  } catch (error) {
    return Promise.reject(error)
  }
}
const getSouthNodeList = async () => {
  try {
    const list = await querySouthDriverList()
    southNodeList.value = (list || []).map((item) => {
      return Object.assign(item, { checkedAll: false })
    })
    return Promise.resolve(southNodeList.value)
  } catch (error) {
    southNodeList.value = []
    return Promise.reject(error)
  }
}

const initData = async () => {
  const southList = await getSouthNodeList()

  const requests: any[] = []
  southList.forEach((item) => {
    const request = getGroupList(item.name.toString())
    requests.push(request)
  })

  Promise.allSettled(requests)
    .then((res) => {
      res.forEach((item: any) => {
        if (item?.value) {
          const { node, groups } = item.value
          allSouthGroups.value[node] = groups || []

          checkedValue.value[node] = [] // reset checked value for every node
        }
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

initData()
</script>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';

.collapse-all {
  text-align: right;

  .item {
    display: inline-block;
    cursor: pointer;
    color: #189bfe;
    &:not(:last-child) {
      margin-right: 0px;
    }
  }
}
.southGroupCheckboxGroups {
  width: 100%;
  max-height: 400px;
  min-height: 200px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  padding: 0 10px;
}
.empty-southGroupCheckboxGroups {
  @include display-flex(center, center);
}

.icon-arrow {
  color: #c0c4cc;
}
.node-name {
  padding-left: 10px;
}
.groups-wrapper {
  padding: 0 46px;
}
.group-item {
  display: block;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.empty-groups {
  color: var(--color-grey-font);
}
.empty-driver-groups {
  @extend .empty-groups;
  font-size: 16px;
}
</style>

<style lang="scss">
.southGroupCheckboxGroups {
  .el-collapse,
  .el-collapse .el-collapse-item__header,
  .el-collapse .el-collapse-item__wrap {
    border: none;
  }
  .el-collapse .el-collapse-item__arrow {
    display: none;
  }

  .el-collapse-item__header {
    height: 36px;
    line-height: 36px;
  }
  .el-collapse-item__content {
    padding-bottom: 10px;
  }
}
</style>
