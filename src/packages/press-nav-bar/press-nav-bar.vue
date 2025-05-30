<template>
  <div class="press-nav-bar-index">
    <div
      v-if="fixed && placeholder"
      :style="'height: '+(height)+'px;'"
    />

    <div
      :class="navBarClass"
      :style="navBarStyle"
    >
      <div class="press-nav-bar__content">
        <div
          class="press-nav-bar__left"
          @click="onClickLeft"
        >
          <template v-if="leftArrow || leftText">
            <PressIconPlus
              v-if="leftArrow"
              size="16px"
              name="arrow-left"
              custom-class="press-nav-bar__arrow"
            />
            <div
              v-if="leftText"
              class="press-nav-bar__text"
              hover-class="press-nav-bar__text--hover"
              hover-stay-time="70"
            >
              {{ leftText }}
            </div>
          </template>
          <slot
            v-else
            name="left"
          />
        </div>
        <div
          :class="[
            'press-nav-bar__title',
            titleClass,
            'press-ellipsis'
          ]"
        >
          <template v-if="title">
            {{ title }}
          </template>
          <slot
            v-else
            name="title"
          />
        </div>
        <div
          class="press-nav-bar__right"
          @click="onClickRight"
        >
          <div
            v-if="rightText"
            class="press-nav-bar__text"
            hover-class="press-nav-bar__text--hover"
            hover-stay-time="70"
          >
            {{ rightText }}
          </div>
          <slot
            v-else
            name="right"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getRect, getStatusBarHeight } from '../common/dom/rect';
import { nextTick } from '../common/utils/system';

import utils from '../common/utils/utils';
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';

import computed from './computed';


export default {
  name: 'PressNavBar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
  },
  props: {
    ...defaultProps,
    title: { type: String, default: '' },
    fixed: {
      type: Boolean,
    },
    placeholder: {
      type: Boolean,
    },
    leftText: { type: String, default: '' },
    rightText: { type: String, default: '' },
    customStyle: { type: [String, Object], default: '' },
    leftArrow: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: '',
    },
  },
  emits: ['click-left', 'click-right'],
  data() {
    return {
      height: 46,
    };
  },
  computed: {
    navBarClass() {
      const { border, fixed } = this;
      return `${utils.bem2('nav-bar', { fixed })} custom-class ${border ? 'press-hairline--bottom' : ''}`;
    },
    navBarStyle() {
      const { zIndex, statusBarHeight, safeAreaInsetTop, customStyle } = this;
      return computed.barStyle({ zIndex, statusBarHeight, safeAreaInsetTop, customStyle });
    },
  },
  watch: {
    fixed: {
      handler() {
        this.setHeight();
      },
    },
    placeholder: {
      handler() {
        this.setHeight();
      },
    },
  },
  created() {
    const statusBarHeight = getStatusBarHeight();
    this.statusBarHeight = statusBarHeight;
    this.height = 46 + statusBarHeight;
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight() {
      this.$emit('click-right');
    },
    setHeight() {
      if (!this.fixed || !this.placeholder) {
        return;
      }
      nextTick(() => {
        getRect(this, '.press-nav-bar').then((res) => {
          if (res && 'height' in res) {
            this.height = res.height;
          }
        });
      });
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
