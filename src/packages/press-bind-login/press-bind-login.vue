<template>
  <div :class="[getActClass('popup')]">
    <div
      :class="[
        getActClass('content'),
        isShowPopup ? getActClass('content--bottom-enter' ): getActClass('content--bottom-leave'),
      ]"
    >
      <!-- 关闭 -->
      <div
        :class="[getActClass('close')]"
        @click="clickCancel"
      />
      <p :class="[getActClass('title')]">
        {{ title }}
      </p>

      <img
        v-if="logo"
        :src="logo"
        :class="[getActClass('logo')]"
      >
      <p :class="[getActClass('name')]">
        {{ name }}
      </p>
      <p :class="[getActClass('desc')]">
        {{ description }}
      </p>

      <div :class="[getActClass('login-list')]">
        <div
          v-if="showQQ"
          :class="[getActClass('login-item')]"
          @click.stop="clickQQLogin"
        >
          <img src="https://image-1251917893.file.myqcloud.com/live/QQ.png">
          <p>QQ区登录</p>
        </div>

        <div
          v-if="showWX"
          :class="[getActClass('login-item')]"
          @click.stop="clickWXLogin"
        >
          <img src="https://image-1251917893.file.myqcloud.com/live/wx.png">
          <p>微信区登录</p>
        </div>
      </div>

      <div :class="[getActClass('agreements')]">
        <div
          :class="[
            getActClass('checkbox', {
              [getActClass('checkbox--checked')]: mIsAgree
            })
          ]"
          @click.stop="onClickAgree"
        />
        <p>同意《</p>
        <p
          :class="[getActClass('agreement')]"
          @click.stop="openAgreement"
        >
          {{ agreementName }}
        </p>
        <p>》</p>
        <template v-if="showNextAgreement">
          <p>《</p>
          <p
            :class="[getActClass('agreement')]"
            @click.stop="openNextAgreement"
          >
            {{ nextAgreementName }}
          </p>
          <p>》</p>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';

const DEFAULT_DESCRIPTION = '';


export default {
  name: 'PressBindLogin',
  options: {
    virtualHost: true,
  },
  props: {
    title: {
      type: String,
      default: '绑定游戏账号',
    },
    logo: {
      type: String,
      default: 'https://image-1251917893.file.myqcloud.com/live/tg-logo.png',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: DEFAULT_DESCRIPTION,
    },
    showQQ: {
      type: Boolean,
      default: true,
    },
    showWX: {
      type: Boolean,
      default: true,
    },
    agreementName: {
      type: String,
      default: '用户协议',
    },
    showNextAgreement: {
      type: Boolean,
      default: false,
    },
    nextAgreementName: {
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
      mIsAgree: false,
      timer: null,
    };
  },
  mounted() {
  },
  methods: {
    clickQQLogin() {
      this.$emit('clickQQLogin');
    },
    clickWXLogin() {
      this.$emit('clickWXLogin');
    },
    clickCancel() {
      this.isShowPopup = false;
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.$emit('onCancel');
        this.destroy();
      }, 400);
    },
    onClickAgree() {
      this.mIsAgree = !this.mIsAgree;
    },
    openAgreement() {
      this.$emit('openAgreement');
    },
    openNextAgreement() {
      this.$emit('openNextAgreement');
    },
    destroy() {
      setTimeout(() => {
        this.$destroy();
        // #ifdef H5
        if (document.body.contains(this.$el)) {
          document.body.removeChild(this.$el);
        }
        // #endif
      }, 100);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
