<template>
  <div
    :class="[getActClass('popup')]"
  >
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
      <div :class="[getActClass('title')]">
        <div
          :class="[getActClass('close')]"
          @click.stop="clickCancel"
        />
        <p>登录提示</p>
      </div>
      <img
        :src="logo"
        :class="[getActClass('logo')]"
        alt="logo"
      >
      <p :class="[getActClass('desc')]">
        {{ tipDesc }}
      </p>
      <div
        :class="[getActClass('button')]"
        @click.stop="clickConfirm()"
      >
        {{ btnText }}
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressAuthLogin',
  components: {},
  props: {
    // 游戏人生logo：https://image-1251917893.file.myqcloud.com/Esports/common/gamers.png
    // 和平logo：https://image-1251917893.file.myqcloud.com/Esports/common/gp-logo.png
    // 和平人生logo：https://image-1251917893.file.myqcloud.com/Esports/common/gprs-logo.png
    // 欢乐斗地主logo：https://image-1251917893.file.myqcloud.com/Esports/common/hlddz-logo.png
    // 城市峡谷logo：https://image-1251917893.file.myqcloud.com/Esports/common/lolm.png
    // 麻将logo：https://image-1251917893.file.myqcloud.com/Esports/common/majiang-logo.png
    // 王者人生logo：https://image-1251917893.file.myqcloud.com/Esports/common/wzrs.png
    logo: {
      type: String,
      default: 'https://image-1251917893.file.myqcloud.com/Esports/common/gamers.png',
      required: false,
    },
    tipDesc: {
      type: String,
      default: '授权登录获得更多服务',
      required: false,
    },
    btnText: {
      type: String,
      default: '授权登录',
      required: false,
    },
    // 在执行确认动画前，validateConfirm返回false则进行拦截
    validateConfirm: {
      type: Function,
      default: null,
    },
    isShow: {
      type: Boolean,
      default: true,
      required: false,
    },
    // 关闭弹窗后的操作
    afterCancel: {
      type: Function,
      default: () => {},
    },
    // 点击确认后操作
    afterConfirm: {
      type: Function,
      default: () => {},
    },
    // 是否由方法触发，若是则内部进行销毁
    isShowByFunction: {
      type: Boolean,
      default: false,
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShowPopup: true,
      timer: 0,
    };
  },
  watch: {
    isShow(val) {
      this.isShowPopup = val;
    },
  },
  mounted() {},
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    closeDialog() {
      return new Promise((resolve) => {
        this.isShowPopup = false;

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // 代码调用时，进行 DOM 节点卸载
          if (this.isShowByFunction) {
            this.$destroy();
            if (document.body.contains(this.$el)) {
              document.body.removeChild(this.$el);
            }
          }

          // 回调
          resolve();
        }, 400);
      });
    },
    clickCancel() {
      this.closeDialog().then(() => { // 关闭弹窗回调
        this.afterCancel && this.afterCancel();
      });
    },
    clickConfirm() {
      if (typeof this.validateConfirm === 'function'
          && !this.validateConfirm()) {
        return;
      }

      this.closeDialog().then(() => { // 关闭弹窗回调
        this.afterConfirm && this.afterConfirm();
      });
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss"></style>
