<template>
  <div class="press-notify-index">
    <press-transition
      name="slide-down"
      :show="dataShow"
      custom-class="press-notify__container"
      :custom-style="computed.rootStyle({ zIndex: dataZIndex, top: dataTop })"
      @click="onTap"
    >
      <div
        :class="'press-notify press-notify--'+(dataType)"
        :style="true ? computed.notifyStyle({ background: dataBackground, color: dataColor }) : ''"
      >
        <div
          v-if="dataSafeAreaInsetTop"
          :style="'height: '+(statusBarHeight)+'px'"
        />
        <span>{{ dataMessage }}</span>
      </div>
    </press-transition>
  </div>
</template>
<script>
import PressTransition from '../press-transition/press-transition.vue';
import { WHITE } from '../common/constant/color';
import { getStatusBarHeight } from '../common/dom/rect';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import computed from './computed';
// import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';
import { getEventDetail } from '../common/dom/event';
import { getDialogMixin } from '../press-dialog/dialog-mixin';


const props = {
  show: { type: Boolean, default: false },
  message: { type: String, default: '' },
  background: { type: String, default: '' },
  type: {
    type: String,
    default: 'danger',
  },
  color: {
    type: String,
    default: WHITE,
  },
  // duration: {
  //   type: Number,
  //   default: 3000,
  // },
  zIndex: {
    type: Number,
    default: 110,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  top: {
    type: [null, String, Number],
    default: null,
  },
  ...defaultProps,
};


export default {
  name: 'PressNotify',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressTransition,
  },
  mixins: [getDialogMixin(props)],
  props,
  emits: [],
  data() {
    return {
      // ...getPropsData(this, props),

      onOpened: null,
      onClose: null,
      onClick: null,
      computed,
    };
  },
  watch: {
    // ...getPropsWatch(props),
  },
  created() {
    const statusBarHeight = getStatusBarHeight();

    this.statusBarHeight = statusBarHeight;
  },
  methods: {
    // setData(data) {
    //   setPropsToData.call(this, data);
    // },
    onTap(event) {
      const { onClick } = this;
      if (onClick) {
        onClick(getEventDetail(event));
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-notify {
  text-align: center;
  word-wrap: break-word;
  padding: var(--notify-padding, $notify-padding);
  font-size: var(--notify-font-size, $notify-font-size);
  line-height: var(--notify-line-height, $notify-line-height);

  ::v-deep &__container {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
  }

  &--primary {
    background-color: var(
      --notify-primary-background-color,
      $notify-primary-background-color
    );
  }

  &--success {
    background-color: var(
      --notify-success-background-color,
      $notify-success-background-color
    );
  }

  &--danger {
    background-color: var(
      --notify-danger-background-color,
      $notify-danger-background-color
    );
  }

  &--warning {
    background-color: var(
      --notify-warning-background-color,
      $notify-warning-background-color
    );
  }
}
</style>
