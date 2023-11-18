<template>
  <div id="tip-dialog-login">
    <div
      v-if="show"
      :class="[getActClass('dialog')]"
    >
      <div :class="[getActClass('main')]">
        <a
          :class="[getActClass('close')]"
          @click="closeDialog"
        />
        <h4 :class="[getActClass('title')]">
          登录游戏账号
        </h4>

        <div :class="[getActClass('login')]">
          <!--QQ登录-->
          <a
            v-if="showQQ"
            @click="jumpToLoginQQ"
          >
            <img src="https://image-1251917893.file.myqcloud.com/igame/common/image/qq.png">
            <span :class="[getActClass('text')]">QQ区登录</span>
          </a>

          <!--微信登录-->
          <a
            v-if="showWX"
            @click="jumpToLoginWX"
          >
            <img src="https://image-1251917893.file.myqcloud.com/igame/common/image/wx.png">
            <span :class="[getActClass('text')]">微信区登录</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressPCLogin',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    showQQ: {
      type: Boolean,
      default: true,
    },
    showWX: {
      type: Boolean,
      default: true,
    },
    destroyedWhenClosed: {
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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
    },
    closeDialog() {
      if (this.destroyedWhenClosed) {
        const dialogId = 'tip-dialog-login';
        const oldDialog = document.getElementById(dialogId);
        if (oldDialog) {
          oldDialog.parentNode.removeChild(oldDialog);
        }
      }

      this.$emit('close');
      this.$emit('update:show', false);
    },
    jumpToLoginQQ() {
      this.$emit('jumpToLoginQQ');
      this.closeDialog();
    },
    jumpToLoginWX() {
      this.closeDialog();
      this.$emit('jumpToLoginWX');
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style src="./css/index.scss" lang="scss" scoped>
</style>
