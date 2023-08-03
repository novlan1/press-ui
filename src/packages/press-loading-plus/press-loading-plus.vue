<template>
  <uni-shadow-root class="press-loading-index">
    <div
      :class="loadingClass"
      :style="customStyle"
    >
      <div
        :class="'press-loading__spinner press-loading__spinner--'+(type)"
        :style="spinnerStyle"
      >
        <template
          v-if="type === 'spinner'"
        >
          <div
            v-for="(item,index) in (array12)"
            :key="index"
            class="press-loading__dot"
          />
        </template>
      </div>

      <div
        class="press-loading__text"
        :style="textStyle"
      >
        <slot />
      </div>
    </div>
  </uni-shadow-root>
</template>
<script>
import utils from '../common/utils/utils';
import computed from './index';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';


export default {
  name: 'PressLoadingPlus',
  options: {
    ...defaultOptions,
  },
  props: {
    ...defaultProps,
    customStyle: { type: String, default: '' },
    color: { type: String, default: '' },
    vertical: { type: Boolean, default: false },
    type: {
      type: String,
      default: 'circular',
    },
    size: { type: String, default: '' },
    textSize: { type: String, default: '' },
  },
  data() {
    return {
      array12: Array.from({ length: 12 }),
    };
  },
  computed: {
    loadingClass() {
      const { vertical, customClass } = this;
      return `${customClass} ${utils.bem2('loading', { vertical })}`;
    },
    spinnerStyle() {
      const { color, size  } = this;
      return computed.spinnerStyle({ color, size });
    },
    textStyle() {
      const { textSize } = this;
      return computed.textStyle({ textSize });
    },
  },
};

</script>

<style lang="scss" scoped>
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-loading-index {
  font-size: 0;
  line-height: 1;
}

.press-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--loading-spinner-color, $loading-spinner-color);

  &__spinner {
    position: relative;
    box-sizing: border-box;
    width: var(--loading-spinner-size, $loading-spinner-size);
    // compatible for 0.x, users may set width or height in root element
    max-width: 100%;
    max-height: 100%;
    height: var(--loading-spinner-size, $loading-spinner-size);
    animation: press-rotate
      var(
        --loading-spinner-animation-duration,
        $loading-spinner-animation-duration
      )
      linear infinite;

    &--spinner {
      animation-timing-function: steps(12);
    }

    &--circular {
      border: 1px solid transparent;
      border-top-color: currentColor;
      border-radius: 100%;
    }
  }

  &__text {
    margin-left: var(--padding-xs, $padding-xs);
    color: var(--loading-text-color, $loading-text-color);
    font-size: var(--loading-text-font-size, $loading-text-font-size);
    line-height: var(--loading-text-line-height, $loading-text-line-height);

    &:empty {
      display: none;
    }
  }

  &--vertical {
    display: flex;
    flex-direction: column;

    .press-loading__text {
      margin: var(--padding-xs, $padding-xs) 0 0;
    }
  }

  &__dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: " ";
    }
  }
}

@for $i from 1 through 12 {
  .press-loading__dot:nth-of-type(#{$i}) {
    transform: rotate($i * 30deg);

    // 一些项目不支持某些写法，可能是sass-loader版本问题
    opacity: calc(1 - calc((0.75 / 12) * (#{$i} - 1)));
  }
}

@keyframes press-rotate {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
