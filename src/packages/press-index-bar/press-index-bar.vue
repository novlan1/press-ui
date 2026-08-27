<template>
  <div
    class="press-index-bar-container"
  >
    <scroll-view
      id="pressIndexBarWrapper"
      class="press-index-bar-wrapper"
      enhanced
      :scroll-with-animation="false"
      scroll-y
      :scroll-top="curScrollTop"
      @scroll="onWatchScroll"
    >
      <div class="press-index-bar">
        <slot />
      </div>
    </scroll-view>
    <div
      v-if="showSidebar"
      class="press-index-bar__sidebar"
      @click.stop.prevent="onClick"
      @touchmove.stop.prevent="onTouchMove"
      @touchend.stop="onTouchStop"
      @touchcancel.stop.prevent="onTouchStop"
    >
      <div
        v-for="(item,index) in (indexList)"
        :key="index"
        class="press-index-bar__index"
        :style="'z-index: '+(zIndex + 1)+'; color: '+(activeAnchorIndex === index ? highlightColor : '')"
        :data-index="index"
        @click.stop="onClickInner"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { GREEN } from '../common/constant/color';
import { PARENT_INDEX_BAR  as PARENT } from '../common/constant/parent-map';

import { getRect, getRealPageYOrClientY } from '../common/dom/rect';
import { getScrollSelector } from '../common/dom/scroll';
import { nextTick } from '../common/utils/system';

import { isDef } from '../common/utils/validator';
import { ParentMixin } from '../mixins/basic/relation';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';


const indexList = () => {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
};


export default {
  name: 'PressIndexBar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  mixins: [
    ParentMixin(PARENT),
    ScrollViewPureMixin,
  ],
  props: {
    sticky: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    highlightColor: {
      type: String,
      default: GREEN,
    },
    stickyOffsetTop: {
      type: Number,
      default: 0,
    },
    indexList: {
      type: Array,
      default: () => indexList(),
    },
    ...defaultProps,
  },
  emits: ['select'],
  data() {
    return {
      activeAnchorIndex: null,
      showSidebar: false,

      sidebar: {},

      curScrollTop: 0,
    };
  },
  created() {
    this.scrollTop = 0;
    this.children = [];
  },
  mounted() {
    this.updateData();
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((item) => {
        this[item] = data[item];
      });
    },
    updateData() {
      nextTick(() => {
        if (this.timer != null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.showSidebar = !!this.children.length;
          nextTick(() => {
            this.setRect().then(() => {
              this.onScroll();
            });
          });
        }, 0);
      });
    },
    setRect() {
      return Promise.all([
        this.setAnchorsRect(),
        this.setListRect(),
        this.setSiderbarRect(),
      ]);
    },
    setAnchorsRect() {
      return Promise.all(this.children.map(anchor => getRect(anchor, '.press-index-anchor-wrapper').then((rect) => {
        Object.assign(anchor, {
          height: rect.height,
          top: rect.top + this.scrollTop,
        });
        return anchor;
      })));
    },
    setListRect() {
      return getRect(this, '.press-index-bar').then((rect) => {
        if (!isDef(rect)) {
          return;
        }
        Object.assign(this, {
          height: rect.height,
          top: rect.top + this.scrollTop,
        });
      });
    },
    setSiderbarRect() {
      return getRect(this, '.press-index-bar__sidebar').then((res) => {
        if (!isDef(res)) {
          return;
        }
        this.sidebar = {
          height: res.height,
          top: res.top,
        };
      });
    },
    setDiffData({ target, data }) {
      const diffData = {};
      Object.keys(data).forEach((key) => {
        if (target[key] !== data[key]) {
          diffData[key] = data[key];
        }
      });
      if (Object.keys(diffData).length) {
        target.setData(diffData);
      }
    },
    getAnchorRect(anchor) {
      return getRect(anchor, '.press-index-anchor-wrapper').then(rect => ({
        height: rect.height,
        top: rect.top,
      }));
    },
    getActiveAnchorIndex() {
      const { children, scrollTop } = this;
      const { sticky } = this;
      for (let i = this.children.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
        const reachTop = sticky ? preAnchorHeight : 0;
        // 是否到顶，当前 index 以上的高度 + scrollTop，大于 当前 index 的 top
        // 均不包含 windowTop
        if (reachTop + scrollTop >= children[i].top) {
          return i;
        }
      }
      return -1;
    },
    onScroll(event) {
      if (event && (event.target || event.detail)) {
        this.scrollTop = event.target?.scrollTop || event.detail?.scrollTop || 0;
      }

      const { children = [], scrollTop } = this;
      if (!children.length) {
        return;
      }
      const { sticky, stickyOffsetTop, zIndex, highlightColor } = this;
      const active = this.getActiveAnchorIndex();

      this.setDiffData({
        target: this,
        data: {
          activeAnchorIndex: active,
        },
      });
      if (sticky) {
        let isActiveAnchorSticky = false;
        if (active !== -1) {
          // 当前 active 的 top，小于 scrollTop，即表示要 sticky 样式了
          isActiveAnchorSticky = children[active].top <= + scrollTop;
        }
        children.forEach((item, index) => {
          if (index === active) {
            let wrapperStyle = '';
            let anchorStyle = `
              color: ${highlightColor};
            `;
            if (isActiveAnchorSticky) {
              wrapperStyle = `
                height: ${children[index].height}px;
              `;
              anchorStyle = `
                position: fixed;
                top: ${stickyOffsetTop}px;
                z-index: ${zIndex};
                color: ${highlightColor};
              `;
            }
            this.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle,
                wrapperStyle,
              },
            });
          } else if (index === active - 1) {
            const currentAnchor = children[index];
            const currentOffsetTop = currentAnchor.top;
            const targetOffsetTop = index === children.length - 1
              ? this.top
              : children[index + 1].top;
            const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
            const translateY = parentOffsetHeight - currentAnchor.height;
            const anchorStyle = `
              position: relative;
              transform: translate3d(0, ${translateY}px, 0);
              z-index: ${zIndex};
              color: ${highlightColor};
            `;
            this.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle,
              },
            });
          } else {
            this.setDiffData({
              target: item,
              data: {
                active: false,
                anchorStyle: '',
                wrapperStyle: '',
              },
            });
          }
        });
      }
    },
    onClick() {
      // this.scrollToAnchor(+event.target.dataset.index);
    },
    onTouchMove(event) {
      const sidebarLength = this.children.length;
      const touch = event.touches[0];
      const itemHeight = this.sidebar.height / sidebarLength;
      let index;
      // #ifdef H5
      // 不再 + windowTop， 因为 sidebar.top (getRect) 已经减去过了
      index = Math.floor((getRealPageYOrClientY(touch.clientY) - this.sidebar.top) / itemHeight);
      // #endif
      // #ifndef H5
      index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);
      // #endif

      if (index < 0) {
        index = 0;
      } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1;
      }

      this.scrollToAnchor(index);
    },
    onTouchStop() {
      this.scrollToAnchorIndex = null;
    },
    scrollToAnchor(index) {
      if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
        return;
      }
      this.scrollToAnchorIndex = index;
      const anchor = this.children.find(item => item.index === this.indexList[index]);
      if (anchor !== undefined) {
        anchor.scrollIntoView(this.scrollTop, this.changeScrollerTop);


        this.$emit('select', anchor.index);
      }
    },
    onClickInner(event) {
      const index = event.currentTarget?.dataset?.index;
      if (index === undefined) return;

      this.scrollToAnchor(+index);
    },
    onWatchScroll(e) {
      this.onScroll(e);
    },
    changeScrollerTop(top) {
      const selector = getScrollSelector('pressIndexBarWrapper');

      // #ifdef H5
      const ref = document
        ?.querySelector(selector);
      if (!ref) return;
      ref.scrollTop = top;
      // #endif

      // #ifdef MP-QQ || MP-ALIPAY
      this.curScrollTop = top;
      // #endif

      // #ifdef MP-WEIXIN || APP-PLUS
      this?.createSelectorQuery?.()
        ?.select?.(selector)
        ?.node?.()
        ?.exec?.((res) => {
          const scrollView = res[0]?.node;
          if (!scrollView) return;

          scrollView.scrollTo({
            top,
            duration: 0,
          });
        });
      // #endif
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
