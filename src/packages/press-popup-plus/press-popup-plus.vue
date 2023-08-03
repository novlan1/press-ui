<template>
  <div>
    <press-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="duration"
      :lock-scroll="lockScroll"
      @click="onClickOverlay"
    />
    <div
      v-if="inited"
      :class="popupClass"
      :style="popupStyle"
      @transitionend="onTransitionEnd"
    >
      <slot />
      <press-icon-plus
        v-if="closeable"
        :name="closeIcon"
        :class="cCloseIconClass"
        @click.native="onClickCloseIcon"
      />
    </div>
  </div>
</template>
<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressOverlay from '../press-overlay/press-overlay.vue';
import { transition } from '../mixins/transition';
import utils from '../common/utils/utils';
import computed from './computed';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressPopupPlus',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressIconPlus,
    PressOverlay,
  },
  // classes: [
  //   'enter-class',
  //   'enter-active-class',
  //   'enter-to-class',
  //   'leave-class',
  //   'leave-active-class',
  //   'leave-to-class',
  //   'close-icon-class',
  // ],
  mixins: [transition(false)],
  props: {
    enterClass: {
      type: String,
      default: '',
    },
    enterActiveClass: {
      type: String,
      default: '',
    },
    enterToClass: {
      type: String,
      default: '',
    },
    leaveClass: {
      type: String,
      default: '',
    },
    leaveActiveClass: {
      type: String,
      default: '',
    },
    leaveToClass: {
      type: String,
      default: '',
    },
    closeIconClass: {
      type: String,
      default: '',
    },

    round: Boolean,
    closeable: Boolean,
    customStyle: { type: String, default: '' },
    overlayStyle: { type: String, default: '' },
    transition: {
      type: String,
      default: '',
      // observer: 'observeClass',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: String,
      default: 'cross',
    },
    closeIconPosition: {
      type: String,
      default: 'top-right',
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'center',
      // observer: 'observeClass',
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
  },
  data() {
    return {
      classes: '',
    };
  },
  computed: {
    popupClass() {
      const {
        position,
        round,
        safeAreaInsetBottom,
        safeAreaInsetTop,
        customClass,

        classes,
      } = this;
      return `${customClass} ${classes} ${utils.bem2('popup', [position, { round, safe: safeAreaInsetBottom, safeTop: safeAreaInsetTop }])}`;
    },
    popupStyle() {
      const { zIndex, currentDuration, display, customStyle } = this;
      return computed.popupStyle({ zIndex, currentDuration, display, customStyle });
    },
    cCloseIconClass() {
      const { closeIconClass, closeIconPosition } = this;
      return `${closeIconClass} press-popup__close-icon press-popup__close-icon--${closeIconPosition}`;
    },
  },
  watch: {
    transition: {
      handler() {
        this.observeClass();
      },
    },
    position: {
      handler() {
        this.observeClass();
      },
    },
  },
  created() {
    this.observeClass();
  },
  methods: {
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    onClickCloseIcon() {
      this.$emit('close');
    },
    onClickOverlay() {
      this.$emit('click-overlay');
      if (this.closeOnClickOverlay) {
        this.$emit('close');
      }
    },
    observeClass() {
      const { transition, position, duration } = this;
      const updateData = {
        dataName: transition || position,
      };
      if (transition === 'none') {
        updateData.duration = 0;
        this.originDuration = duration;
      } else if (this.originDuration != null) {
        updateData.duration = this.originDuration;
      }
      this.setData(updateData);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-popup {
  position: fixed;
  box-sizing: border-box;
  max-height: 100%;
  overflow-y: auto;
  transition-timing-function: ease;
  animation: ease both;
  -webkit-overflow-scrolling: touch;
  background-color: var(--popup-background-color, $popup-background-color);

  &--center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);

    &.press-popup--round {
      border-radius: var(
        --popup-round-border-radius,
        $popup-round-border-radius
      );
    }
  }

  &--top {
    top: 0;
    left: 0;
    width: 100%;

    &.press-popup--round {
      border-radius: 0 0
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        );
    }
  }

  &--right {
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);

    &.press-popup--round {
      border-radius: var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        0 0
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        );
    }
  }

  &--bottom {
    bottom: 0;
    left: 0;
    width: 100%;

    &.press-popup--round {
      border-radius: var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        0 0;
    }
  }

  &--left {
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);

    &.press-popup--round {
      border-radius: 0
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        var(
          --popup-round-border-radius,
          var(--popup-round-border-radius, $popup-round-border-radius)
        )
        0;
    }
  }

  &--bottom.press-popup--safe {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  &--safeTop {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }

  &__close-icon {
    position: absolute;
    z-index: var(--popup-close-icon-z-index, $popup-close-icon-z-index);
    color: var(--popup-close-icon-color, $popup-close-icon-color);
    font-size: var(--popup-close-icon-size, $popup-close-icon-size);

    &--top-left {
      top: var(--popup-close-icon-margin, $popup-close-icon-margin);
      left: var(--popup-close-icon-margin, $popup-close-icon-margin);
    }

    &--top-right {
      top: var(--popup-close-icon-margin, $popup-close-icon-margin);
      right: var(--popup-close-icon-margin, $popup-close-icon-margin);
    }

    &--bottom-left {
      bottom: var(--popup-close-icon-margin, $popup-close-icon-margin);
      left: var(--popup-close-icon-margin, $popup-close-icon-margin);
    }

    &--bottom-right {
      right: var(--popup-close-icon-margin, $popup-close-icon-margin);
      bottom: var(--popup-close-icon-margin, $popup-close-icon-margin);
    }

    &:active {
      opacity: 0.6;
    }
  }
}

.press-scale-enter-active,
.press-scale-leave-active {
  transition-property: opacity, transform;
}

.press-scale-enter,
.press-scale-leave-to {
  transform: translate3d(-50%, -50%, 0) scale(0.7);
  opacity: 0;
}

.press-fade-enter-active,
.press-fade-leave-active {
  transition-property: opacity;
}

.press-fade-enter,
.press-fade-leave-to {
  opacity: 0;
}

.press-center-enter-active,
.press-center-leave-active {
  transition-property: opacity;
}

.press-center-enter,
.press-center-leave-to {
  opacity: 0;
}

.press-bottom-enter-active,
.press-bottom-leave-active,
.press-top-enter-active,
.press-top-leave-active,
.press-left-enter-active,
.press-left-leave-active,
.press-right-enter-active,
.press-right-leave-active {
  transition-property: transform;
}

.press-bottom-enter,
.press-bottom-leave-to {
  transform: translate3d(0, 100%, 0);
}

.press-top-enter,
.press-top-leave-to {
  transform: translate3d(0, -100%, 0);
}

.press-left-enter,
.press-left-leave-to {
  transform: translate3d(-100%, -50%, 0);
}

.press-right-enter,
.press-right-leave-to {
  transform: translate3d(100%, -50%, 0);
}
</style>
