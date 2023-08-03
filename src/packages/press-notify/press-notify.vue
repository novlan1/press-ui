<template>
  <uni-shadow-root class="press-notify-index">
    <press-transition
      name="slide-down"
      :show="dataShow"
      custom-class="press-notify__container"
      :custom-style="computed.rootStyle({ zIndex: dataZIndex, top: dataTop })"
      @click.native="onTap"
    >
      <div
        :class="'press-notify press-notify--'+(dataType)"
        :style="true ? computed.notifyStyle({ background: dataBackground, color: dataColor }) : ''"
      >
        <div
          v-if="dataSafeAreaInsetTop"
          :style="'height: '+(statusBarHeight)+'px'"
        />
        <text>{{ dataMessage }}</text>
      </div>
    </press-transition>
  </uni-shadow-root>
</template>
<script>
import PressTransition from '../press-transition/press-transition.vue';
import { WHITE } from '../common/constant/color';
import { getSystemInfoSync } from '../common/utils/system';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import computed from './computed';
import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';


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
  props,
  data() {
    return {
      ...getPropsData(this, props),

      // show: false,
      onOpened: null,
      onClose: null,
      onClick: null,
      computed,
    };
  },
  watch: {
    ...getPropsWatch(props),
  },
  created() {
    const { statusBarHeight } = getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
    // this.setData({ statusBarHeight });
  },
  methods: {
    setData(data) {
      setPropsToData.call(this, data);
    },
    // showNotify() {
    //   const { duration, onOpened } = this;
    //   clearTimeout(this.timer);
    //   // this.setData({ show: true });
    //   this.show = true;
    //   wx.nextTick(onOpened);
    //   if (duration > 0 && duration !== Infinity) {
    //     this.timer = setTimeout(() => {
    //       this.hide();
    //     }, duration);
    //   }
    // },
    // hide() {
    //   const { onClose } = this;
    //   clearTimeout(this.timer);
    //   // this.setData({ show: false });
    //   this.show = false;
    //   wx.nextTick(onClose);
    // },
    onTap(event) {
      const { onClick } = this;
      if (onClick) {
        onClick(event.detail);
      }
    },
  },
};

</script>
<style scoped lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

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
