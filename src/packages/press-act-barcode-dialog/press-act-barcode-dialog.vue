<template>
  <div
    v-if="show"
    :class="[getActClass('barcode'), {
      'press-act--hidden-tip': hideTipStyle,
    }, 'press-act']"
  >
    <div :class="[getActClass('main','main--barcode')]">
      <div
        :class="[getActClass('icon--close')]"
        @click="closeDialog"
      />
      <div :class="[getActClass('title')]">
        请向营业员出示如下核销码兑换
      </div>
      <div :class="[getActClass('barcode-wrap')]">
        <div :class="[getActClass('barcode-left')]">
          <!-- 需要改成竖版条形码 -->
          <!-- #ifdef H5 -->
          <PressBarcodeWeb
            :value="url"
            :height="0.7 * 50"
            :width="0.6"
            :font-size="0.3 * 30"
            style="transform: rotate(-90deg) translateX(-1.75rem)"
            format="CODE128"
          />
          <!-- #endif -->

          <!-- #ifndef H5 -->
          <PressBarcodeMP
            :value="url"
            :height="0.7 * 50"
            :width="0.6"
            :font-size="10"
            :options="{margin: 2}"
            custom-style="transform: rotate(-90deg) translateX(-88px)"
            format="CODE128"
          />
          <!-- #endif -->
        </div>
        <div :class="[getActClass('barcode-right')]">
          <!-- #ifdef H5 -->
          <PressQRCodeWeb :value="url" />
          <!-- #endif -->

          <!-- #ifndef H5 -->
          <PressQRCodeMp
            :value="url"
            size="152"
          />
          <!-- #endif -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// #ifdef H5
import PressQRCodeWeb from '../common/vue3/q-r-code';
import PressBarcodeWeb from '../common/vue3/bar-code';
// #endif
// #ifndef H5
import PressQRCodeMp from '../press-q-r-code/press-q-r-code.vue';
import PressBarcodeMP from '../press-barcode/press-barcode';
// #endif

import { getActClass } from './utils';


export default {
  name: 'PressActBarcodeDialog',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    // #ifdef H5
    PressQRCodeWeb,
    PressBarcodeWeb,
    // #endif

    // #ifndef H5
    PressQRCodeMp,
    PressBarcodeMP,
    // #endif
  },
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    url: {
      type: String,
      default: '',
      required: false,
    },
    useTipClass: {
      type: Boolean,
      default: true,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:show', false);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
// body:not(.press-act-barcode-dialog--hidden) {
//   @import "./css/pvp.scss";
// }
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
