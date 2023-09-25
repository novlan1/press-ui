<template>
  <div class="press-toast-index">
    <press-overlay
      v-if="mask || dataForbidClick"
      :show="dataShow"
      :z-index="dataZIndex"
      :custom-style="dataMask ? '' : 'background-color: transparent;'"
    />
    <!-- custom-class="press-toast__container" -->
    <press-transition
      :show="dataShow"
      :custom-style="transitionStyle"
    >
      <div
        :class="toastClass"
        @touchmove.stop.prevent="noop"
      >
        <span v-if="dataType === 'text'">{{ dataMessage }}</span>

        <span
          v-else-if="notInUni && dataType === 'html'"
          v-html="dataMessage"
        />

        <rich-text
          v-else-if="dataType === 'html'"
          :nodes="dataMessage"
        />

        <template v-else>
          <!-- custom-class="press-toast__loading" -->
          <press-loading
            v-if="dataType === 'loading'"
            color="white"
            :type="dataLoadingType"
            custom-style="margin: 10px 0;"
          />
          <press-icon-plus
            v-else
            class="press-toast__icon"
            :name="dataType"
          />
          <span
            v-if="dataMessage"
            class="press-toast__text"
          >{{ dataMessage }}</span>
        </template>

        <slot />
      </div>
    </press-transition>
  </div>
</template>

<script>
import PressIconPlus from '../press-icon-plus/press-icon-plus.vue';
import PressLoading from '../press-loading-plus/press-loading-plus.vue';
import PressOverlay from '../press-overlay/press-overlay.vue';
import PressTransition from '../press-transition/press-transition.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';

import { isNotInUni } from '../common/utils/utils';


const props = {
  show: Boolean,
  mask: Boolean,
  message: {
    type: String,
    default: '',
  },
  forbidClick: Boolean,
  zIndex: {
    type: Number,
    default: 1000,
  },
  type: {
    type: String,
    default: 'text',
  },
  loadingType: {
    type: String,
    default: 'circular',
  },
  position: {
    type: String,
    default: 'middle',
  },
  ...defaultProps,
};

export default {
  name: 'PressToast',
  options: {
    ...defaultOptions,
  },
  components: {
    PressIconPlus,
    PressLoading,
    PressOverlay,
    PressTransition,
  },
  props,
  emits: [],
  data() {
    return {
      ...getPropsData(this, props),
      notInUni: isNotInUni(),
    };
  },
  computed: {
    toastClass() {
      const { dataType, dataPosition } = this;
      return `press-toast press-toast--${(dataType === 'text' || dataType === 'html') ? 'text' : 'icon'} press-toast--${dataPosition}`;
    },
    transitionStyle() {
      const { dataZIndex } = this;
      return [
        `z-index: ${dataZIndex}`,
        'left: 50%',
        'max-width: var(--toast-max-width, 70%)',
        'position: fixed',
        'top: 50%',
        'transform: translate(-50%, -50%)',
        'width: -webkit-fit-content',
        'width: fit-content',
      ].join(';');
    },
  },
  watch: {
    ...getPropsWatch(props),
  },
  methods: {
    setData(data) {
      setPropsToData.call(this, data);
    },
    // for prevent touchmove
    noop() { },
  },
};
</script>

<style lang="scss" scoped>
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-toast {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  color: var(--toast-text-color, $toast-text-color);
  font-size: var(--toast-font-size, $toast-font-size);
  line-height: var(--toast-line-height, $toast-line-height);

  // allow newline charactor
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  background-color: var(--toast-background-color, $toast-background-color);
  border-radius: var(--toast-border-radius, $toast-border-radius);

  // 【修改点】此处的custom-class在小程序中无效，改为customStyle
  // &__container {
  //   position: fixed;
  //   top: 50%;
  //   left: 50%;
  //   // hack for avoid max-width when use left & fixed
  //   width: fit-content;
  //   transform: translate(-50%, -50%);
  //   max-width: var(--toast-max-width, $toast-max-width);
  // }

  &--text {
    min-width: var(--toast-text-min-width, $toast-text-min-width);
    padding: var(--toast-text-padding, $toast-text-padding);
    box-sizing: border-box;
  }

  &--icon {
    width: var(--toast-default-width, $toast-default-width);
    min-height: var(--toast-default-min-height, $toast-default-min-height);
    padding: var(--toast-default-padding, $toast-default-padding);

    ::v-deep .press-toast__icon {
      font-size: var(--toast-icon-size, $toast-icon-size);
      white-space: normal;
    }

    .press-toast__text {
      padding-top: $padding-xs;
    }
  }

  // 【修改点】此处的custom-class在小程序中无效，改为customStyle
  // &__loading {
  //   margin: 10px 0;
  // }

  &--top {
    transform: translate(0, -30vh);
  }

  &--bottom {
    transform: translate(0, 30vh);
  }
}
</style>
