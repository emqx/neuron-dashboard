<template>
  <div class="tabs-head">
    <emqx-breadcrumb>
      <emqx-breadcrumb-item>{{ this.$t('common.neuronNode') }}</emqx-breadcrumb-item>
      <emqx-breadcrumb-item>
        <emqx-select
          v-model="selectNode"
          class="node-select"
          label-in-value
          :placeholder="$t('common.currentNode')"
          @on-change="handleNodeChange"
        >
          <emqx-option v-for="node in nodes" :key="node.value" :value="node.value" :label="node.label"> </emqx-option>
        </emqx-select>
      </emqx-breadcrumb-item>
    </emqx-breadcrumb>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TabsCardHead',

  data() {
    return {
      selectNode: '',
    }
  },

  computed: {
    currentNode() {
      return this.$store.state.currentNode
    },
    nodes() {
      return this.$store.state.nodes
    },
  },

  created() {
    this.selectNode = this.currentNode.id
  },

  methods: {
    ...mapActions(['SET_CURRENTNODE']),
    handleNodeChange(val) {
      if (!val) {
        return
      }
      const { value: id, label: name } = val
      this.SET_CURRENTNODE({ id, name, refresh: true })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.tabs-head {
  .ivu-breadcrumb {
    margin-bottom: 12px;
    margin-top: 36px;
    position: relative;
    left: 20px;
  }
  .crud-title {
    color: #a2a2a2;
    width: 90px;
    height: auto;
    padding-bottom: 6px;
    line-height: 32px;
    text-align: center;
    background-color: transparent;
    display: inline-block;
    font-size: 14px;
    position: relative;
    top: 1px;
  }
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
  .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    font-size: 18px;
    height: 28px;
    line-height: 28px;
  }
  .ivu-select {
    width: 230px;
    .ivu-select-visible .ivu-select-selection,
    .ivu-select-selection {
      border: none;
    }
    .ivu-select-arrow {
      top: 14px;
    }
  }
}
</style>
