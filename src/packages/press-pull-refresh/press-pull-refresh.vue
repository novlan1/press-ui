<template>
  <div
    class="press-pull-refresh"
    :style="wrapStyle"
  >
    <div
      ref="track"
      class="press-pull-refresh__track"
      :style="innerTrackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div
        class="press-pull-refresh__head"
        :style="headStyle"
      >
        <template v-if="status === 'pulling'">
          <slot
            name="pulling"
            :distance="distance"
          >
            {{ pullingText }}
          </slot>
        </template>
        <template v-else-if="status === 'loosing'">
          <slot name="loosing">
            {{ loosingText }}
          </slot>
        </template>
        <template v-else-if="status === 'success'">
          <slot name="success">
            {{ successText }}
          </slot>
        </template>
        <template v-else-if="status === 'normal'">
          <slot name="normal" />
        </template>
        <template v-else-if="status === 'loading'">
          <slot name="loading">
            <PressLoadingPlus size="16">
              {{ statusText }}
            </PressLoadingPlus>
          </slot>
        </template>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
// #ifdef H5
import { getScrollTop, getScroller } from '../common/dom/scroll';
// #endif

import { style } from '../common/utils/style';
import { nextTick } from '../common/utils/system';
import { vModelMixin } from '../common/vue3/adapter';

import { t } from '../locale';
import { TouchMixin } from '../mixins/touch/index';

import PressLoadingPlus from '../press-loading-plus/press-loading-plus.vue';


export function preventDefault(event) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
}


const DEFAULT_HEAD_HEIGHT = 50;
const TEXT_STATUS = ['pulling', 'loosing', 'success'];


export default {
  name: 'PressPullRefresh',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    PressLoadingPlus,
  },
  mixins: [TouchMixin, vModelMixin],
  props: {
    disabled: Boolean,
    successText: {
      type: String,
      default: '',
    },
    pullingText: {
      type: String,
      default: '',
    },
    loosingText: {
      type: String,
      default: '',
    },
    loadingText: {
      type: String,
      default: '',
    },
    pullDistance: {
      type: [Number, String],
      default: '',
    },
    successDuration: {
      type: [Number, String],
      default: 500,
    },
    animationDuration: {
      type: [Number, String],
      default: 300,
    },
    headHeight: {
      type: [Number, String],
      default: DEFAULT_HEAD_HEIGHT,
    },
    trackStyle: {
      type: String,
      default: '',
    },
    customStyle: {
      type: [String, Object],
      default: '',
    },
  },
  emits: [
    'change',
    'update:modelValue',
    'refresh',
  ],
  data() {
    return {
      status: 'normal',
      distance: 0,
      duration: 0,

      TEXT_STATUS,
    };
  },
  computed: {
    wrapStyle() {
      return style(this.customStyle);
    },
    statusText() {
      const { status } = this;
      return this[`${status}Text`] || t(status);
    },
    touchable() {
      return (
        this.status !== 'loading' && this.status !== 'success' && !this.disabled
      );
    },
    innerTrackStyle() {
      return style([{
        transitionDuration: `${this.duration}ms`,
        transform: this.distance ? `translate3d(0,${this.distance}px, 0)` : '',

      }, this.trackStyle]);
    },
    headStyle() {
      if (this.headHeight !== DEFAULT_HEAD_HEIGHT) {
        return style({
          height: `${this.headHeight}px`,
        });
      }
      return '';
    },
  },
  watch: {
    realModelValue(loading) {
      this.duration = this.animationDuration;

      if (loading) {
        this.setStatus(+this.headHeight, true);
      } else if (this.successText) {
        // this.slots('success') ||
        this.showSuccessTip();
      } else {
        this.setStatus(0, false);
      }
    },
  },
  mounted() {
    // this.bindTouchEvent(this.$refs.track);
    // #ifdef H5
    this.scrollEl = getScroller(this.$el);
    // #endif
  },
  methods: {
    checkPullStart(event) {
      // 小程序可以传递 scrollTop
      this.ceiling = true;

      // #ifdef H5
      this.ceiling = getScrollTop(this.scrollEl) === 0;
      // #endif

      if (this.ceiling) {
        this.duration = 0;
        this.touchStart(event);
      }
    },

    onTouchStart(event) {
      if (this.touchable) {
        this.checkPullStart(event);
      }
    },

    onTouchMove(event) {
      if (!this.touchable) {
        return;
      }

      if (!this.ceiling) {
        this.checkPullStart(event);
      }

      this.touchMove(event);

      if (this.ceiling && this.deltaY >= 0 && this.direction === 'vertical') {
        preventDefault(event);
        this.setStatus(this.ease(this.deltaY));
      }
    },

    onTouchEnd() {
      if (this.touchable && this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;

        if (this.status === 'loosing') {
          this.setStatus(+this.headHeight, true);
          this.emitModelValue(true);
          this.$emit('change', true);

          // ensure value change can be watched
          nextTick(() => {
            this.$emit('refresh');
          });
        } else {
          this.setStatus(0);
        }
      }
    },

    ease(distance) {
      const pullDistance = +(this.pullDistance || this.headHeight);

      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2;
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
        }
      }

      return Math.round(distance);
    },

    setStatus(distance, isLoading) {
      let status;
      if (isLoading) {
        status = 'loading';
      } else if (distance === 0) {
        status = 'normal';
      } else {
        status = distance < (this.pullDistance || this.headHeight)
          ? 'pulling'
          : 'loosing';
      }

      this.distance = distance;

      if (status !== this.status) {
        this.status = status;
      }

      this.$emit('change', {
        status: this.status,
        distance,
      });
    },

    showSuccessTip() {
      this.status = 'success';

      setTimeout(() => {
        this.setStatus(0);
      }, this.successDuration);
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
