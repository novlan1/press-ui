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
        v-if="dataShow"
        :class="toastClass"
        @touchmove.stop.prevent="noop"
      >
        <span v-if="dataType === 'text'">{{ dataMessage }}</span>

        <span
          v-else-if="notInUni && dataType === 'html'"
          v-html="dataMessage"
        />

        <span
          v-else-if="dataType === 'html'"
          v-html="dataMessage"
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
import { getDialogMixin } from '../press-dialog/dialog-mixin';

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
  mixins: [getDialogMixin(props)],
  props,
  emits: [],
  data() {
    return {
      // ...getPropsData(this, props),
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
    // ...getPropsWatch(props),
  },
  methods: {
    // setData(data) {
    //   setPropsToData.call(this, data);
    // },
    // for prevent touchmove
    noop() { },
  },
};
</script>

<style lang="scss" scoped src="./css/index.scss">
</style>
