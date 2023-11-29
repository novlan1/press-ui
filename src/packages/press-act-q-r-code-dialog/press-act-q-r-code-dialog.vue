<template>
  <div
    v-if="show"
    :class="[
      getActClass('cover'), {
        'press-act--hidden-tip': hideTipStyle,
      }, 'press-act']"
  >
    <div :class="[getActClass('dialog','dialog--qr')]">
      <a
        :class="[getActClass('close')]"
        @click="closeDialog"
      ><!-- 关闭 --></a>
      <p :class="[getActClass('title','title--qr')]">
        {{ title }}
      </p>
      <div :class="[getActClass('content')]">
        <!-- #ifdef H5 -->
        <PressQRCodeWeb
          v-if="url"
          :value="url"
          :class="[getActClass('image')]"
        />
        <!-- #endif -->

        <!-- #ifndef H5 -->
        <PressQRCodeMp
          v-if="url"
          :value="url"
          :size="120"
          :class="[getActClass('image')]"
        />
        <!-- #endif -->

        <img
          v-else-if="image"
          :src="image"
          :class="[getActClass('image')]"
        >
        <div :class="[getActClass('desc')]">
          {{ scanTitle }}
        </div>
        <div :class="[getActClass('button-wrap')]">
          <a
            :class="[getActClass('btn--qr','btn--medium-primary')]"
            @click="closeDialog"
          >确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// #ifdef H5
import PressQRCodeWeb from 'vue-qrcode';
// #endif
// #ifndef H5
import PressQRCodeMp from '../press-q-r-code/press-q-r-code.vue';
// #endif
import { getActClass } from './utils';


export default {
  name: 'PressActQRCodeDialog',
  options: {
    styleIsolation: 'shared',
  },
  components: {
    // #ifdef H5
    PressQRCodeWeb,
    // #endif

    // #ifndef H5
    PressQRCodeMp,
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
      default: null,
      required: false,
    },
    image: {
      type: String,
      default:
        'https://image-1251917893.file.myqcloud.com/2020/TIP-igame-H5/gh_9e4c56699893_258.jpg',
      required: false,
    },
    title: {
      type: String,
      default: '扫一扫二维码',
      required: false,
    },
    scanTitle: {
      type: String,
      default: '截图保存使用微信-扫一扫',
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    hideTipStyle: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:show',
  ],
  data() {
    return {};
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
// body:not(.press-act-q-r-code-dialog--hidden) {
//   @import "./css/pvp-vertical.scss";
// }
.press__dialog {
  box-sizing: border-box;
}
</style>
<style scoped lang="scss" src="@TIP_STYLE_NAME"></style>
<style scoped lang="scss" src="./css/base.scss"></style>
