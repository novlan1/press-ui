<template>
  <div
    v-if="innerShow"
    :style="customStyle"
    :class="['press-popover',
             `press-popover--${placement}`,
             popperClass,
             customClass,
             isEnter ? 'press--animation__fade-in':'press--animation__fade-out'
    ]"
  >
    <slot />
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressPopover',
  options: {
    ...defaultOptions,
    virtualHost: true,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      default: 'right',
    },
    popperClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
    customStyle: {
      type: String,
      default: '',
    },
  },

  emits: [],
  data() {
    return {
      innerShow: false,
      isEnter: false,

      watchShowTimer: null,
    };
  },
  computed: {
  },
  watch: {
    show: {
      handler(value) {
        if (value) {
          clearTimeout(this.watchShowTimer);

          this.innerShow = value;
          this.isEnter = value;
        } else {
          // remove
          this.isEnter = value;
          clearTimeout(this.watchShowTimer);

          this.watchShowTimer = setTimeout(() => {
            this.innerShow = value;
          }, 300);
        }
      },
      immediate: true,
    },
  },
  methods: {
  },
};

</script>
<style lang="scss">
@import "../common/style/smoba/layout.scss";
@import "../common/style/smoba/animate.scss";

.press-popover {
  position: absolute;
  font-size: var(--popover-font-size, tovmin(24));
  color: var(--popover-color, $color-white);
  padding: var(--popover-padding, tovmin(8) tovmin(24));
  border-radius: var(--popover-border-radius, tovmin(8));
  background: var(--popover-background, #09134e);
  z-index: var(--popover-z-index, 8);

  &::before {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-left: tovmin(12) solid transparent;
    border-right: tovmin(12) solid transparent;
    border-top: tovmin(12) solid var(--popover-background, #09134e);
  }

  &--top {
    top: -100%;
    left: 0;
    right: 0;
    margin: auto;

    &::before {
      bottom: tovmin(-10);
      left: 0;
      right: 0;
      margin: auto;
      transform: rotate(0deg);
    }
  }

  &--right {
    top: 0;
    bottom: 0;
    right: -100%;
    margin: auto;

    &::before {
      top: 0;
      bottom: 0;
      left: tovmin(-16);
      margin: auto;
      transform: rotate(90deg);
    }
  }

  &--bottom {
    bottom: -100%;
    left: 0;
    right: 0;
    margin: auto;

    &::before {
      top: tovmin(-10);
      left: 0;
      right: 0;
      margin: auto;
      transform: rotate(180deg);
    }
  }

  &--left {
    bottom: 0;
    left: -100%;
    top: 0;
    margin: auto;

    &::before {
      top: 0;
      bottom: 0;
      right: tovmin(-16);
      margin: auto;
      transform: rotate(-90deg);
    }
  }
}
</style>
