<template>
  <div
    ref="pressTabs"
    :class="tabsClass"
  >
    <PressSticky
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
          :upper-threshold="scrollViewProps.upperThreshold"
          :lower-threshold="scrollViewProps.lowerThreshold"
          @scrolltoupper="scrolltoupper"
          @scrolltolower="scrolltolower"
          @scroll="scrollViewScroll"
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
            <template v-if="useTitleSlot">
              <div
                v-if="tabs.length > 0"
                :class="[`${getSlotTabClass(0)}`]"
                :data-index="0"
                @click="onTap"
              >
                <slot name="title-0" />
              </div>
              <div
                v-if="tabs.length > 1"
                :class="[`${getSlotTabClass(1)}`]"
                :data-index="1"
                @click="onTap"
              >
                <slot name="title-1" />
              </div>
              <div
                v-if="tabs.length > 2"
                :class="[`${getSlotTabClass(2)}`]"
                :data-index="2"
                @click="onTap"
              >
                <slot name="title-2" />
              </div>
              <div
                v-if="tabs.length > 3"
                :class="[`${getSlotTabClass(3)}`]"
                :data-index="3"
                @click="onTap"
              >
                <slot name="title-3" />
              </div>
              <div
                v-if="tabs.length > 4"
                :class="[`${getSlotTabClass(4)}`]"
                :data-index="4"
                @click="onTap"
              >
                <slot name="title-4" />
              </div>
              <div
                v-if="tabs.length > 5"
                :class="[`${getSlotTabClass(5)}`]"
                :data-index="5"
                @click="onTap"
              >
                <slot name="title-5" />
              </div>
              <div
                v-if="tabs.length > 6"
                :class="[`${getSlotTabClass(6)}`]"
                :data-index="6"
                @click="onTap"
              >
                <slot name="title-6" />
              </div>
              <div
                v-if="tabs.length > 7"
                :class="[`${getSlotTabClass(7)}`]"
                :data-index="7"
                @click="onTap"
              >
                <slot name="title-7" />
              </div>
              <div
                v-if="tabs.length > 8"
                :class="[`${getSlotTabClass(8)}`]"
                :data-index="8"
                @click="onTap"
              >
                <slot name="title-8" />
              </div>
              <div
                v-if="tabs.length > 9"
                :class="[`${getSlotTabClass(9)}`]"
                :data-index="9"
                @click="onTap"
              >
                <slot name="title-9" />
              </div>
              <div
                v-if="tabs.length > 10"
                :class="[`${getSlotTabClass(10)}`]"
                :data-index="10"
                @click="onTap"
              >
                <slot name="title-10" />
              </div>
            </template>

            <template v-else>
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
                  <PressInfo
                    v-if="item.info !== null || item.dot"
                    :info="item.info"
                    :dot="item.dot"
                    custom-class="press-tab__title__info"
                  />
                </div>
              </div>
            </template>
          </div>
        </scroll-view>

        <slot name="nav-right" />
      </div>
    </PressSticky>

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
import computed from './index';
import utils from '../common/utils/utils';

import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { PARENT_TABS as PARENT } from '../common/constant/parent-map';
import { style } from '../common/utils/style';
import { forceUpdate } from '../common/vue3/adapter';
import { ScrollViewPureMixin } from '../mixins/pure/scroll-view';


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
    ScrollViewPureMixin,
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
    useTitleSlot: {
      type: Boolean,
      default: false,
    },
    scrollViewProps: {
      type: Object,
      default: () => ({
        upperThreshold: 50,
        lowerThreshold: 50,
      }),
    },
  },
  emits: ['scroll', 'disabled', 'click', 'input', 'change', 'scrolltoupper', 'scrolltolower', 'scrollViewScroll'],
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
    nextTick(() => {
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
        disabled: item.disabled || false,
        complete: !ellipsis,
      })} ${this.bem3('ellipsis')} ${realTabClass} ${index === currentIndex ? realActiveClass : ''}`;
    },
    getSlotTabClass(index) {
      return this.getTabClass(this.tabs[index] || {}, index);
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
    scrolltoupper(e) {
      this.$emit('scrolltoupper', e);
    },
    scrolltolower(e) {
      this.$emit('scrolltolower', e);
    },
    scrollViewScroll(e) {
      this.$emit('scrollViewScroll', e);
    },
  },
// });
};
</script>
<style lang="scss" src="./css/index.scss"></style>
<style lang="scss" scoped src="./css/e-sport.scss"></style>
<style lang="scss" scoped src="./css/hor.scss"></style>
