<template>
  <div :class="[getActClass('popup')]">
    <!-- 透明遮罩 -->
    <div
      :class="[
        getActClass('mask'),
        isShowPopup ? getActClass('mask--fade-in' ): getActClass('mask--fade-out'),
      ]"
      @click.stop="clickCancel"
    />
    <div
      :class="[
        getActClass('content'),
        isShowPopup ? getActClass('content--bottom-enter' ): getActClass('content--bottom-leave'),
      ]"
    >
      <div :class="[getActClass('title-wrap')]">
        <div
          :class="[getActClass('title-line')]"
          @click.stop="clickCancel"
        />
        <div
          :class="[getActClass('back')]"
          @click.stop="clickCancel"
        />
        <p :class="[getActClass('title')]">
          {{ innerTitle }}
        </p>
        <div
          v-if="false"
          :class="[getActClass('close')]"
          @click.stop="clickCancel"
        />
      </div>
      <PressQRCode
        :value="qrCodeUrl"
        :size="120"
        :class="[getActClass('qr-code')]"
      />

      <p :class="[getActClass('save')]">
        截图或长按保存图片
      </p>
      <p :class="[getActClass('tip')]">
        使用{{ typeName }}扫码打开访问页面
      </p>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';
import PressQRCode from '../press-q-r-code/press-q-r-code';


export default {
  name: 'PressQRCodePopup',
  components: {
    PressQRCode,
  },
  props: {
    qrCodeUrl: {
      type: String,
      default: '',
      require: true,
    },
    type: {
      type: Number, // 1:QQ, 2:微信
      default: 2,
      require: false,
    },
    title: {
      type: String,
      default: '',
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShowPopup: true,
    };
  },
  computed: {
    typeName() {
      return this.type === 1 ? 'QQ' : '微信';
    },
    innerTitle() {
      const { typeName, title } = this;
      if (title) {
        return title;
      }
      return `请使用${typeName}扫码打开活动`;
    },
  },
  methods: {
    clickCancel() {
      this.isShowPopup = false;
      this.timer = setTimeout(() => {
        this.$emit('onCancel');
      }, 400);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },

  },
};


</script>
<style lang="scss" scoped src="./css/index.scss"></style>
