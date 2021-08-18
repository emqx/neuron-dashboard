<template>
  <div class="container-component" :class="{ responsive }" v-emqx-loading="loading" ref="container">
    <!--卡片容器-->
    <emqx-card v-if="type === 'card'" style="overflow: auto; position: relative">
      <slot v-if="$slots.header" name="header"></slot>
      <slot />
    </emqx-card>
    <!--隐形-->
    <div v-if="type === 'ghost'">
      <slot />
    </div>
    <!--撑满-->
    <card-full v-if="type === 'card-full' && !scorll" :top="top" :right="right" :bottom="bottom" :left="left">
      <slot v-if="$slots.header" name="header"></slot>
      <slot></slot>
      <slot v-if="$slots.footer" name="footer"></slot>
    </card-full>
    <!--撑满滚动-->
    <card-full-bs
      v-if="type === 'card-full' && scorll === true"
      :top="top"
      :right="right"
      :bottom="bottom"
      :left="left"
    >
      <slot v-if="$slots.header" name="header"></slot>
      <slot></slot>
      <slot v-if="$slots.footer" name="footer"></slot>
    </card-full-bs>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CardFull from '../CardFull/CardFull.vue'
import CardFullBs from '../CardFull/CardFull-bs.vue'

export default {
  name: 'Container',
  components: {
    CardFull,
    CardFullBs,
  },
  props: {
    type: {
      type: String,
      require: false,
      default: 'card',
    },
    top: {
      type: Number,
      required: false,
      default: 0,
    },
    right: {
      type: Number,
      required: false,
      default: 0,
    },
    bottom: {
      type: Number,
      required: false,
      default: 50,
    },
    left: {
      type: Number,
      required: false,
      default: 0,
    },
    // 是否开启响应式尺寸变化
    responsive: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    scorll: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      BS: null,
    }
  },
  mounted() {
    if (this.type !== 'card-full') {
      this.scrollInit()
    }
  },
  beforeUnmount() {
    if (this.type !== 'card-full') {
      this.scrollDestroy()
    }
  },
  methods: {
    scrollInit() {
      this.BS = new BScroll(this.$refs.container, {
        mouseWheel: true,
        scrollbar: {
          fade: true,
          interactive: false,
        },
      })
    },
    scrollDestroy() {
      if (this.BS) {
        this.BS.destroy()
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/style/public.scss';
.container-component {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}

.container-component.responsive {
  .dd-md-responsive {
    @include MarginBottom($marginList);
  }
  .dd-mt-responsive {
    @include MarginTop($marginList);
  }
}

@media (min-width: 576px) {
  // 根据你的需要在这里添加样式 xs
}
@media (min-width: 768px) {
  // 根据你的需要在这里添加样式 sm
}
@media (min-width: 992px) {
  // 根据你的需要在这里添加样式 md
}
@media (min-width: 1200px) {
  // 根据你的需要在这里添加样式 lg
}
// 在大于1920分辨率的时候 xl
@media (min-width: 1921px) {
  // .container-component.responsive {
  //   margin: 0px auto;
  //   margin-bottom: 20px;
  //   max-width: 1920px - 200px;
  // }
}
</style>
