<template>
  <div class="press-notify-index">
    <PressTransition
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
    </PressTransition>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import { WHITE } from '../common/constant/color';
import { getEventDetail } from '../common/dom/event';

import { getStatusBarHeight } from '../common/dom/rect';
import { getDialogMixin } from '../press-dialog-plus/dialog-mixin';
import PressTransition from '../press-transition/press-transition.vue';

import computed from './computed';


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
  zIndex: {
    type: Number,
    default: 110,
  },
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  // 由于是 fixed 元素，所以 windowTop 需要手动指定
  // 同 dropdown-menu
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
<style scoped lang="scss" src="./css/index.scss">
</style>
