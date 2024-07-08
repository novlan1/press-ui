<template>
  <div
    ref="pressTabs"
    :class="tabsClass"
  >
    <press-sticky
      :disabled="(!sticky)"
      :z-index="zIndex"
      :offset-top="offsetTop"
      :container="container"
      @scroll="onTouchScroll"
    >
      <div :class="tabsWrapClass">
        <slot name="nav-left" />

        <scroll-view
          :scroll-x="scrollable"
          :scroll-with-animation="scrollWithAnimation"
          :scroll-left="scrollLeft"
          :class="tabScrollClass"
          :style="color ? 'border-color: ' + color : ''"
        >
          <div
            :class="theNavClass"
            :style="navStyle"
          >
            <div
              v-if="type === 'line'"
              :class="[`${bem3('tabs__line')} ${lineClass}`]"
              :style="lineStyle"
            />
            <div
              v-for="(item, index) in (tabs)"
              :key="getTabKey(item, index)"
              :data-index="index"
              :class="[`${getTabClass(item, index)}`]"
              :style="[`${getTabStyle(item, index)}`]"
              @click="onTap"
            >
              <div
                :class="[`${bem3('tab__text')}`, ellipsis ? 'press-ellipsis' : '']"
                :style="item.titleStyle"
              >
                {{ item.title }}
                <press-info
                  v-if="item.info !== null || item.dot"
                  :info="item.info"
                  :dot="item.dot"
                  custom-class="press-tab__title__info"
                />
              </div>
            </div>
          </div>
        </scroll-view>

        <slot name="nav-right" />
      </div>
    </press-sticky>

    <div
      :class="[`${bem3('tabs__content')}`]"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div
        :class="trackClass"
        :style="trackStyle"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import PressInfo from '../press-info/press-info.vue';
import PressSticky from '../press-sticky/press-sticky.vue';

import { touch } from '../mixins/touch';

import {  groupSetData, nextTick, requestAnimationFrame } from '../common/utils/system';
import { getAllRect, getRect } from '../common/dom/rect';
import { isDef } from '../common/utils/validator';
import { ParentMixin } from '../mixins/relation';
import utils from '../common/utils/utils';
import computed from './index';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_TABS as PARENT } from '../common/constant/parent-map';
import { style } from '../common/utils/style';
import { forceUpdate } from '../common/vue3/adapter';


export default {
  name: 'PressTabs',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressInfo,
    PressSticky,
  },
  mixins: [
    touch,

    ParentMixin(PARENT),
  ],
  props: {
    ...defaultProps,
    navClass: {
      type: String,
      default: '',
    },
    tabClass: {
      type: String,
      default: '',
    },
    tabActiveClass: {
      type: String,
      default: '',
    },
    lineClass: {
      type: String,
      default: '',
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    swipeable: {
      type: Boolean,
      default: false,
    },
    titleActiveColor: {
      type: String,
      default: '',
    },
    titleInactiveColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    animated: {
      type: Boolean,
      default: false,
    },
    lineWidth: {
      type: [Number, String, null],
      default: 40,
      // observer: 'resize',
    },
    lineHeight: {
      type: [Number, String, null],
      default: -1,
    },
    active: {
      type: [Number, String, null],
      default: 0,
    },
    type: {
      type: String,
      default: 'line',
    },
    ellipsis: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 0.3,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    swipeThreshold: {
      type: Number,
      default: 5,
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    lazyRender: {
      type: Boolean,
      default: true,
    },
    extraClassPrefix: {
      type: String,
      // 兼容旧的class，可传入van-
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
  },
  emits: ['scroll', 'disabled', 'click', 'input', 'change'],
  data() {
    return {
      tabs: [],
      scrollLeft: 0,
      scrollable: false,
      currentIndex: 0,
      container: null,
      skipTransition: true,
      scrollWithAnimation: false,
      lineOffsetLeft: 0,

      computed,
      utils,
    };
  },
  computed: {
    tabsClass() {
      const { type, customClass, mode } = this;
      const isHor = mode === 'hor';
      const isESport = mode === 'e-sport';

      return `${this.bem3('tabs', [type, { hor: isHor, 'e-sport': isESport }])} ${customClass}`;
    },
    tabsWrapClass() {
      const { scrollable, type, border } = this;
      return `${this.bem3('tabs__wrap', { scrollable })} ${type === 'line' && border ? this.bem3('hairline--top-bottom') : ''}`;
    },
    tabScrollClass() {
      const { type } = this;
      return this.bem3('tabs__scroll', [type]);
    },
    theNavClass() {
      const { type, ellipsis, navClass } = this;
      const realNavClass = `${navClass} nav-class`;
      return `${this.bem3('tabs__nav', [type, { complete: !ellipsis }])} ${realNavClass}`;
    },
    navStyle() {
      const { color, type } = this;
      return computed.navStyle(color, type);
    },
    lineStyle() {
      const { color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth } = this;
      return computed.lineStyle({ color, lineOffsetLeft, lineHeight, skipTransition, duration, lineWidth });
    },
    trackClass() {
      const { animated } = this;
      return `${this.bem3('tabs__track', [{ animated }])}`;
    },
    trackStyle() {
      const { duration, currentIndex, animated } = this;
      return computed.trackStyle({ duration, currentIndex, animated });
    },
    realEllipsis() {
      return this.scrollable && this.ellipsis;
    },
  },
  watch: {
    animated: {
      handler() {
        this.children.forEach((child, index) => child.updateRender(index === this.currentIndex, this));
      },
    },
    lineWidth: {
      handler() {
        this.resize();
      },
    },
    active: {
      handler(name) {
        if (name !== this.getCurrentName()) {
          this.setCurrentIndexByName(name);
        }
      },
      // immediate: true,
    },
    swipeThreshold: {
      handler(value) {
        this.setData({
          scrollable: this.children.length > value || !this.ellipsis,
        });
      },
    },
  },
  created() {
    this.children = [];
  },
  mounted() {
    requestAnimationFrame(() => {
      this.swiping = true;
      this.container = () => this.$refs.pressTabs;

      this.updateTabs();
      this.resize();
      this.scrollIntoView();
    });
    this.$nextTick(() => {
      // this.updateTabs();
      this.resize();
    });
  },
  methods: {
    bem3(name, conf) {
      return utils.bem3(name, conf, this.extraClassPrefix);
    },
    getTabClass(item, index) {
      const { currentIndex, ellipsis, tabClass, tabActiveClass } = this;
      const realActiveClass = `${tabActiveClass} tab-active-class`;
      const realTabClass = `${tabClass} tab-class`;

      return `${this.bem3('tab', {
        active: index === currentIndex,
        disabled: item.disabled,
        complete: !ellipsis,
      })} ${this.bem3('ellipsis')} ${realTabClass} ${index === currentIndex ? realActiveClass : ''}`;
    },
    getTabStyle(item, index) {
      const {
        type,
        color,
        active,
        currentIndex,
        realEllipsis,
        titleActiveColor,
        titleInactiveColor,
        swipeThreshold,
      } = this;

      const flexBasis =  realEllipsis ? `${88 / swipeThreshold}%` : null;

      return type === 'card' ? style({
        borderColor: color,
        backgroundColor: !item.disabled && active ? color : null,
        color: (index === currentIndex ? titleActiveColor : titleInactiveColor)
            || (!item.disabled && !active ? color : null),
        flexBasis,
      }) : style({
        color: index === currentIndex ? titleActiveColor : titleInactiveColor,
        flexBasis,
      });
    },
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    updateTabs() {
      const { children = [] } = this;
      this.tabs = children.map(child => ({
        title: child.title,
        index: child.index,
        disabled: child.disabled,
        info: child.info,
        dot: child.dot,
        titleStyle: child.titleStyle,
      }));
      this.scrollable = children.length > this.swipeThreshold || !this.ellipsis;
      this.setCurrentIndexByName(this.active || this.getCurrentName());
    },
    trigger(eventName, child) {
      const { currentIndex } = this;
      const currentChild = child || this.children[currentIndex];
      if (!isDef(currentChild)) {
        return;
      }
      this.$emit(eventName, {
        index: currentChild.index,
        name: currentChild.getComputedName(),
        title: currentChild.title,
      });
    },
    onTap(event) {
      const index = +event.currentTarget.dataset.index;
      const child = this.children[index];
      if (child.disabled) {
        this.trigger('disabled', child);
      } else {
        this.setCurrentIndex(index);
        nextTick(() => {
          this.trigger('click');
        });
      }
    },
    // correct the index of active tab
    setCurrentIndexByName(name) {
      const { children = [] } = this;
      const matched = children.filter(child => child.getComputedName() === name);
      if (matched.length) {
        this.setCurrentIndex(matched[0].index);
      }
    },
    setCurrentIndex(currentIndex) {
      // debugger;
      const { children = [] } = this;
      if (!isDef(currentIndex)
                || currentIndex >= children.length
                || currentIndex < 0) {
        return;
      }
      groupSetData(this, () => {
        children.forEach((item, index) => {
          const active = index === currentIndex;
          if (active !== item.active || !item.initialled) {
            item.updateRender(active, this);
          }
        });
      });
      if (currentIndex === this.currentIndex) {
        return;
      }
      const shouldEmitChange = this.currentIndex !== null;
      this.setData({ currentIndex });

      forceUpdate(this);

      requestAnimationFrame(() => {
        this.resize();
        this.scrollIntoView();
      });
      nextTick(() => {
        this.trigger('input');
        if (shouldEmitChange) {
          this.trigger('change');
        }
      });
    },
    getCurrentName() {
      const activeTab = this.children[this.currentIndex];
      if (activeTab) {
        return activeTab.getComputedName();
      }
    },
    resize() {
      if (this.type !== 'line') {
        return;
      }
      const { currentIndex, ellipsis, skipTransition } = this;
      Promise.all([
        getAllRect(this, '.press-tab'),
        getRect(this, '.press-tabs__line'),
      ]).then(([rects = [], lineRect]) => {
        const rect = rects[currentIndex];
        if (rect == null) {
          return;
        }

        let lineOffsetLeft = rects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);
        lineOffsetLeft
                    += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8);

        this.setData({ lineOffsetLeft });

        this.swiping = true;
        if (skipTransition) {
          nextTick(() => {
            this.setData({ skipTransition: false });
          });
        }
      })
        .catch((err) => {
          console.log('err', err);
        });
    },
    // scroll active tab into view
    scrollIntoView() {
      const { currentIndex, scrollable, scrollWithAnimation } = this;
      if (!scrollable) {
        return;
      }
      Promise.all([
        getAllRect(this, '.press-tab'),
        getRect(this, '.press-tabs__nav'),
      ]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[currentIndex];
        const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);
        this.setData({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2,
        });
        if (!scrollWithAnimation) {
          nextTick(() => {
            this.setData({ scrollWithAnimation: true });
          });
        }
      })
        .catch((err) => {
          console.log('error', err);
        });
    },
    onTouchScroll(event) {
      this.$emit('scroll', event);
    },
    onTouchStart(event) {
      if (!this.swipeable) return;
      this.swiping = true;
      this.touchStart(event);
    },
    onTouchMove(event) {
      if (!this.swipeable || !this.swiping) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd() {
      if (!this.swipeable || !this.swiping) return;
      const { direction, deltaX, offsetX } = this;
      const minSwipeDistance = 50;
      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        const index = this.getAvailableTab(deltaX);
        if (index !== -1) {
          this.setCurrentIndex(index);
        }
      }
      this.swiping = false;
    },
    getAvailableTab(direction) {
      const { tabs, currentIndex } = this;
      const step = direction > 0 ? -1 : 1;
      for (let i = step; currentIndex + i < tabs.length && currentIndex + i >= 0; i += step) {
        const index = currentIndex + i;
        if (index >= 0
                    && index < tabs.length
                    && tabs[index]
                    && !tabs[index].disabled) {
          return index;
        }
      }
      return -1;
    },
    getTabKey(item, index) {
      return `${item.title || ''} - ${index} -${item.index}`;
    },
  },
// });
};
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
<style lang="scss" scoped src="./css/e-sport.scss"></style>
<style lang="scss" scoped src="./css/hor.scss"></style>
