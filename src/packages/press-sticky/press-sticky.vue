<template>
  <div>
    <!-- 注释不要写在第一行，否则 vue3 中的 this.$el 会取到注释 -->
    <!-- 需要再加一个最外层，因为 this.$el.querySelector 找不到最外层的元素 -->
    <div
      ref="sticky"
      class="press-sticky"
      :class="customClass"
      :style="containerStyle"
    >
      <div
        :class="wrapClass"
        :style="wrapStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
// #ifdef H5
import getWindowOffset from '../common/utils/get-window-offset';
// #endif
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getRect } from '../common/dom/rect';
import { getScroller } from '../common/dom/scroll';
import { nextTick } from '../common/utils/system';
import utils from '../common/utils/utils';


import { isDef } from '../common/utils/validator';

import { BindEventMixin } from '../mixins/basic/bind-event';
import { pageScrollMixin } from '../mixins/basic/page-scroll';

import computed from './index';


const ROOT_ELEMENT = '.press-sticky';

const scrollMixin = pageScrollMixin(function (event) {
  if (this.scrollTop !== null) {
    return;
  }
  this.onScroll(event);
});


export default {
  name: 'PressSticky',
  options: {
    ...defaultOptions,
  },
  mixins: [
    // 小程序：页面级滚动，通过动态挂载 page.onPageScroll 监听
    // #ifndef H5 || APP-PLUS || APP
    scrollMixin,
    // #endif

    // H5：是 webview，存在真实 DOM 事件，直接绑 scroll / touchmove
    // #ifdef H5
    BindEventMixin(function (bind /* isBind*/) {
      if (!this.scroller) {
        this.scroller = getScroller(this.$el);
      }

      bind(this.scroller, 'scroll', this.onScroll, true);
      bind(this.scroller, 'touchmove', this.onScroll, true);
      this.onScroll();
    }),
    // #endif

    // APP：逻辑层没有 window/document，拿不到 DOM 也无法直接绑事件。
    // 但 createSelectorQuery 在 APP 上能正常返回 boundingClientRect
    // （坐标空间与 H5 的 getBoundingClientRect 一致：相对 webview 视口顶端），
    // 因此用轮询方式模拟页面级滚动监听 —— 自给自足，不依赖页面配合声明 onPageScroll。
    // #ifdef APP-PLUS || APP
    {
      mounted() {
        // 节流：rAF 不可用时退到 16ms
        const tick = () => {
          this.onScroll();
          this._stickyRaf = setTimeout(tick, 16);
        };
        this._stickyRaf = setTimeout(tick, 16);
      },
      beforeUnmount() {
        if (this._stickyRaf) {
          clearTimeout(this._stickyRaf);
          this._stickyRaf = null;
        }
      },
    },
    // #endif
  ],
  props: {
    ...defaultProps,
    zIndex: {
      type: Number,
      default: 99,
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
    },
    container: {
      // 支持两种形式：
      // 1. 字符串选择器，如 '#container' —— 三端通用（推荐，APP 端只支持这种）
      // 2. 返回 ref 的函数 —— H5 / 小程序的旧用法
      type: [Function, String],
      default: null,
    },
    scrollTop: {
      type: [Number, null],
      default: null,
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: ['scroll'],
  data() {
    return {
      height: 0,
      fixed: false,
      transform: 0,

      scrollTopData: this.scrollTop,
    };
  },
  computed: {
    containerStyle() {
      const { fixed, height, zIndex } = this;
      const res = computed.containerStyle({ fixed, height, zIndex });
      return res;
    },
    wrapStyle() {
      const { fixed, offsetTop, transform, zIndex, customStyle } = this;
      const wrapStyle = computed.wrapStyle({ fixed, offsetTop, transform, zIndex, customStyle });
      return wrapStyle;
    },
    wrapClass() {
      const { fixed } = this;
      return utils.bem2('sticky-wrap', { fixed });
    },
  },
  watch: {
    offsetTop: {
      handler() {
        this.onScroll();
      },
    },
    disabled: {
      handler() {
        this.onScroll();
      },
    },
    container: {
      handler() {
        this.onScroll();
      },
    },
    scrollTop: {
      handler(val) {
        this.onScroll({ scrollTop: val });
        this.scrollTopData = val;
      },
    },
  },
  created() {
  },
  mounted() {
    this.scrollTopData = this.scrollTop;
    this.onScroll();
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    onScroll({ scrollTop } = {}) {
      const { container, offsetTop, disabled } = this;
      if (disabled) {
        this.setDataAfterDiff({
          fixed: false,
          transform: 0,
        });
        return;
      }

      this.scrollTopData = scrollTop || this.scrollTopData;

      // container 支持字符串选择器（三端通用）或返回 ref 的函数（H5 / 小程序）
      const hasContainer = (typeof container === 'string' && container)
        || (typeof container === 'function' && container());

      if (hasContainer) {
        Promise.all([
          getRect(this, ROOT_ELEMENT),
          this.getContainerRect(),
        ]).then(([root, container]) => {
          if (root && container && offsetTop + root.height > container.height + container.top) {
            this.setDataAfterDiff({
              fixed: false,
              transform: container.height - root.height,
            });
          } else if (root && offsetTop >= root.top) {
            this.setDataAfterDiff({
              fixed: true,
              height: root.height,
              transform: 0,
            });
          } else {
            this.setDataAfterDiff({ fixed: false, transform: 0 });
          }
        })
          .catch((error) => {
            console.warn('error', error);
          });
        return;
      }

      getRect(this, ROOT_ELEMENT).then((root) => {
        if (!isDef(root)) {
          return;
        }

        if (offsetTop >= root.top) {
          this.setDataAfterDiff({ fixed: true, height: root.height });
          this.transform = 0;
        } else {
          this.setDataAfterDiff({ fixed: false });
        }
      });
    },
    setDataAfterDiff(data) {
      nextTick(() => {
        const diff = Object.keys(data).reduce((prev, key) => {
          if (data[key] !== this[key]) {
            prev[key] = data[key];
          }
          return prev;
        }, {});

        if (Object.keys(diff).length > 0) {
          this.setData(diff);
        }

        this.$emit('scroll', {
          scrollTop: this.scrollTopData,
          isFixed: data.fixed || this.fixed,
        });
      });
    },
    getContainerRect() {
      const containerProp = this.container;
      let res;

      // 方式一（推荐，三端通用）：字符串选择器，如 '#container'
      if (typeof containerProp === 'string' && containerProp) {
        // #ifdef H5
        const el = document.querySelector(containerProp);
        if (el) {
          const rect = el.getBoundingClientRect();
          // 与 getRect 的 H5 分支保持同一坐标空间：减去 windowTop（导航栏高度）
          const { top } = getWindowOffset();
          res = Promise.resolve({
            ...rect,
            top: rect.top - top,
            bottom: rect.bottom - top,
          });
        }
        // #endif

        // #ifndef H5
        // 小程序 / APP：页面级选择器查询（container 通常在页面模板里，
        // 不在本组件内部，所以不能 .in(this)）
        res = new Promise((resolve) => {
          uni.createSelectorQuery()
            .select(containerProp)
            .boundingClientRect()
            .exec((rect = []) => resolve(rect[0] || {}));
        });
        // #endif

        return res || Promise.resolve({});
      }

      // 方式二：返回 ref 的函数（旧用法）
      const nodesRef = typeof containerProp === 'function' ? containerProp() : null;
      if (!nodesRef) return Promise.resolve({});

      // #ifdef H5
      if (typeof nodesRef.getBoundingClientRect === 'function') {
        const rect = nodesRef.getBoundingClientRect();
        const { top } = getWindowOffset();
        res = Promise.resolve({
          ...rect,
          top: rect.top - top,
          bottom: rect.bottom - top,
        });
      }
      // #endif

      // #ifndef H5
      if (typeof nodesRef.boundingClientRect === 'function') {
        // 小程序：ref 返回的是节点对象，直接查询
        res = new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
      }
      // #endif

      return res || Promise.resolve({});
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
