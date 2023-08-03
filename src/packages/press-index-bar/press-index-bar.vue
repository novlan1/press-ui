<template>
  <div>
    <div class="press-index-bar">
      <slot />

      <div
        v-if="showSidebar"
        class="press-index-bar__sidebar"
        @click.stop.prevent="onClick"
        @touchmove.stop.prevent="onTouchMove"
        @touchend.stop.prevent="onTouchStop"
        @touchcancel.stop.prevent="onTouchStop"
      >
        <div
          v-for="(item,index) in (indexList)"
          :key="item.index"
          class="press-index-bar__index"
          :style="'z-index: '+(zIndex + 1)+'; color: '+(activeAnchorIndex === index ? highlightColor : '')"
          :data-index="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { GREEN } from '../common/constant/color';
import { getRect } from '../common/dom/rect';
import { isDef } from '../common/utils/validator';
import { pageScrollMixin } from '../mixins/page-scroll';
import { defaultOptions, defaultProps } from '../common/component-handler/press-component';
import { ParentMixin } from '../mixins/relation';
import { PARENT_INDEX_BAR  as PARENT } from '../common/constant/parent-map';
import { BindEventMixin } from '../mixins/bind-event';
import { getScroller } from '../common/dom/scroll';

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
    // #ifndef H5
    pageScrollMixin(function (event) {
      this.scrollTop = event ? event.scrollTop : 0;
      this.onScroll();
    }),
    // #endif

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

    ParentMixin(PARENT),
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
  data() {
    return {
      activeAnchorIndex: null,
      showSidebar: false,

      sidebar: {},
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
      this.$nextTick(() => {
        if (this.timer != null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.showSidebar = !!this.children.length;
          this.$nextTick(() => {
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
      const { sticky, stickyOffsetTop } = this;
      for (let i = this.children.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
        const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;
        if (reachTop + scrollTop >= children[i].top) {
          return i;
        }
      }
      return -1;
    },
    onScroll(event) {
      if (event && event.target) {
        this.scrollTop = event.target.scrollTop;
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
          isActiveAnchorSticky = children[active].top <= stickyOffsetTop + scrollTop;
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
    onClick(event) {
      this.scrollToAnchor(+event.target.dataset.index);
    },
    onTouchMove(event) {
      const sidebarLength = this.children.length;
      const touch = event.touches[0];
      const itemHeight = this.sidebar.height / sidebarLength;
      let index;
      // #ifdef H5
      index = Math.floor((touch.clientY - this.sidebar.top + (this.top || 0)) / itemHeight);

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
        // #ifdef H5
        anchor.$el.scrollIntoView(this.scrollTop);
        // #endif

        // #ifndef H5
        anchor.scrollIntoView(this.scrollTop);
        // #endif

        this.$emit('select', anchor.index);
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/var.scss";

.press-index-bar {
  position: relative;

  &__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    user-select: none;
  }

  &__index {
    font-weight: 500;
    padding: 0 var(--padding-base, $padding-base) 0
      var(--padding-md, $padding-md);
    font-size: var(--index-bar-index-font-size, $index-bar-index-font-size);
    line-height: var(
      --index-bar-index-line-height,
      $index-bar-index-line-height
    );
  }
}
</style>
