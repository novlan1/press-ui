<template>
  <div class="press-notice-bar-index">
    <div
      v-if="show"
      :class="noticeBarClass"
      :style="noticeBarStyle"
      @click="onClick"
    >
      <PressIconPlus
        v-if="leftIcon"
        :name="leftIcon"
        :class="[leftIconClass]"
        :custom-class="leftIconCustomClass"
      />
      <slot
        v-else
        name="left-icon"
      />

      <div class="press-notice-bar__wrap">
        <div
          :class="'press-notice-bar__content '+(scrollable === false && !wrapable ? 'press-ellipsis' : '')"
          :style="animationStyle"
        >
          {{ text }}
          <slot v-if="(!text)" />
        </div>
      </div>

      <PressIconPlus
        v-if="mode === 'closeable'"
        :class="[rightIconClass]"
        :custom-class="rightIconCustomClass"
        name="cross"
        @click="onClickIcon"
      />

      <template
        v-else-if="mode === 'link'"
      >
        <PressIconPlus
          v-if="isNotInUni"
          :class="[rightIconClass]"
          :custom-class="rightIconCustomClass"
          name="arrow"
        />
        <navigator
          v-else
          :url="url"
          :open-type="openType"
        >
          <PressIconPlus
            :class="[rightIconClass]"
            :custom-class="rightIconCustomClass"
            name="arrow"
          />
        </navigator>
      </template>

      <slot
        v-else
        name="right-icon"
      />
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import { requestAnimationFrame } from '../common/utils/system';
import { getRect } from '../common/dom/rect';
import utils, { isNotInUni } from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getEventDetail } from '../common/dom/event';


export default {
  name: 'PressNoticeBar',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    openType: {
      type: String,
      default: 'navigate',
    },
    delay: {
      type: Number,
      default: 1,
    },
    speed: {
      type: Number,
      default: 60,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
      default: '',
    },
    color: { type: String, default: '' },
    backgroundColor: { type: String, default: '' },
    background: { type: String, default: '' },
    wrapable: Boolean,
    ...defaultProps,
  },
  emits: ['close', 'click'],
  data() {
    return {
      show: true,

      duration: 0,
      animationDuration: 0,
      contentWidth: 0,
      translateX: 0,
      isNotInUni: isNotInUni(),
    };
  },
  computed: {
    noticeBarClass() {
      const { mode, wrapable, customClass } = this;
      return `${customClass} ${utils.bem2('notice-bar', { withicon: mode, wrapable })}`;
    },
    noticeBarStyle() {
      const { color, backgroundColor, background } = this;
      return computed.rootStyle({ color, backgroundColor, background });
    },
    animationStyle() {
      const { animationDuration, delay, translateX } = this;
      const res = [
        `transform: translateX(${translateX}px);`,
        `transition: -webkit-transform ${animationDuration}ms linear ${delay}ms, transform ${animationDuration}ms linear ${delay}ms;`,
        'transform-origin: 50% 50% 0px;',
      ].join(' ');

      return res;
    },
    leftIconClass() {
      return 'press-notice-bar__left-icon';
    },
    leftIconCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.leftIconClass}`;
      // #endif
      return result;
    },
    rightIconClass() {
      return 'press-notice-bar__right-icon';
    },
    rightIconCustomClass() {
      let result = '';
      // #ifdef MP-ALIPAY
      result = `${result} ${this.rightIconClass}`;
      // #endif
      return result;
    },
  },
  watch: {
    text: {
      handler() {
        this.init();
      },
    },
    speed: {
      handler() {
        this.init();
      },
    },
  },
  created() {
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.onDestroyed();
  },
  unmounted() {
    this.onDestroyed();
  },
  methods: {
    onDestroyed() {
      this.timer && clearTimeout(this.timer);
    },
    init() {
      requestAnimationFrame(() => {
        Promise.all([
          getRect(this, '.press-notice-bar__content'),
          getRect(this, '.press-notice-bar__wrap'),
        ]).then((rects) => {
          const [contentRect, wrapRect] = rects;
          const {
            speed,
            scrollable,
            // delay,
          } = this;
          if (contentRect == null
                        || wrapRect == null
                        || !contentRect.width
                        || !wrapRect.width
                        || scrollable === false) {
            return;
          }
          if (scrollable || wrapRect.width < contentRect.width) {
            const duration = ((wrapRect.width + contentRect.width) / speed) * 1000;
            this.wrapWidth = wrapRect.width;
            this.contentWidth = contentRect.width;
            this.duration = duration;
            // this.animation = uni.createAnimation({
            //   duration,
            //   timingFunction: 'linear',
            //   delay,
            // });
            this.scroll(true);
          }
        });
      });
    },
    scroll(isInit = false) {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.translateX = isInit ? 0 : this.wrapWidth;
      this.animationDuration = 0;

      requestAnimationFrame(() => {
        this.translateX = -this.contentWidth;
        this.animationDuration = this.duration;
      });

      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },
    onClickIcon(event) {
      if (this.mode === 'closeable') {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.show = false;
        this.$emit('close', getEventDetail(event));
      }
    },
    onClick(event) {
      this.$emit('click', event);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-notice-bar {
  display: flex;
  align-items: center;
  height: var(--notice-bar-height, $notice-bar-height);
  padding: var(--notice-bar-padding, $notice-bar-padding);
  font-size: var(--notice-bar-font-size, $notice-bar-font-size);
  color: var(--notice-bar-text-color, $notice-bar-text-color);
  line-height: var(--notice-bar-line-height, $notice-bar-line-height);
  background-color: var(
    --notice-bar-background-color,
    $notice-bar-background-color
  );

  &--withicon {
    position: relative;
    padding-right: 40px;
  }

  &--wrapable {
    height: auto;
    padding: var(--notice-bar-wrapable-padding, $notice-bar-wrapable-padding);

    .press-notice-bar {
      &__wrap {
        height: auto;
      }

      &__content {
        position: relative;
        white-space: normal;
      }
    }
  }

  /* #ifdef MP-ALIPAY */
  ::v-deep &__left-icon,
/* #endif */
   &__left-icon {
    display: flex;
    align-items: center;
    margin-right: 4px;
    vertical-align: middle;
    font-size: var(--notice-bar-icon-size, $notice-bar-icon-size);
    min-width: var(--notice-bar-icon-min-width, $notice-bar-icon-min-width);
  }

  /* #ifdef MP-ALIPAY */
  ::v-deep &__right-icon,
  /* #endif */
  &__right-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: var(--notice-bar-icon-size, $notice-bar-icon-size);
    min-width: var(--notice-bar-icon-min-width, $notice-bar-icon-min-width);
  }

  &__wrap {
    position: relative;
    flex: 1;
    overflow: hidden;
    height: var(--notice-bar-line-height, $notice-bar-line-height);

    // 【修改点】增加垂直居中
    display: flex;
    align-items: center;
  }

  &__content {
    position: absolute;
    white-space: nowrap;

    &.press-ellipsis {
      max-width: 100%;
    }
  }
}
</style>
