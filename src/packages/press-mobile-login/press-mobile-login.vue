<template>
  <div id="tip-dialog-login">
    <div
      v-if="showChooseDialog"
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

    <div
      v-show="showScanDialog"
      :class="[getActClass('dialog')]"
    >
      <div :class="[getActClass('role')]">
        <a
          :class="[getActClass('back')]"
          @click="closeScanDialog"
        >返回</a>
        <h3 :class="[getActClass('title')]">
          请使用{{ scanCodeType == 'QQ' ? 'QQ' : '微信' }}扫码打开页面
        </h3>
        <a
          :class="[getActClass('close')]"
          @click="closeScanDialog"
        />
        <div :class="[getActClass('wx-login')]">
          <div
            v-show="!hideCanvas"
            id="qrcodeid"
            :class="[getActClass('wx-login-img')]"
          />
          <img
            v-if="qrcodeSrc"
            :src="qrcodeSrc"
            :class="[getActClass('wx-login-img')]"
            style="display: inline-block"
          >
          <div :class="[getActClass('wx-login-tip')]">
            <p :class="[getActClass('save')]">
              截图或长按保存图片
            </p>
            <span>使用{{ scanCodeType == 'QQ' ? 'QQ' : '微信' }}扫码打开访问页面</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="showTipDialog"
      :class="[getActClass('dialog')]"
    >
      <div :class="[getActClass('role')]">
        <a
          :class="[getActClass('back')]"
          @click="closeTipDialog"
        >返回</a>
        <h3 :class="[getActClass('title')]">
          {{ tipTitle }}
        </h3>
        <a
          :class="[getActClass('close')]"
          @click="closeTipDialog"
        />
        <div :class="[getActClass('wx-login')]">
          <img
            :src="tipImage"
            mode="widthFix"
            :class="[getActClass('qq-login-img')]"
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';


export default {
  name: 'PressMobileLogin',
  props: {
    showQQ: {
      type: Boolean,
      default: true,
    },
    showWX: {
      type: Boolean,
      default: true,
    },
    currentUrl: {
      type: String,
      default: '',
    },
    loader: {
      type: Function,
      default: null,
    },
    showChooseDialog: {
      type: Boolean,
      default: false,
    },
    showScanDialog: {
      type: Boolean,
      default: false,
    },
    showTipDialog: {
      type: Boolean,
      default: false,
    },
    destroyedWhenClosed: {
      type: Boolean,
      default: false,
    },
    scanCodeType: {
      type: String,
      default: 'WX',
    },
    tipTitle: {
      type: String,
      default: '微信中不支持QQ区账号登录',
    },
    tipImage: {
      type: String,
      default: 'https://image-1251917893.file.myqcloud.com/tipcomm/public_dialog-img/wx-zy.jpg',
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      qrcodeSrc: '',
      hideCanvas: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // #ifdef H5

      this.loader('https://image-1251917893.file.myqcloud.com/commjs/qrcode.min.js', () => {
        // eslint-disable-next-line no-undef
        new QRCode('qrcodeid', {
          // text: this.getCurrentUrl(),
          text: this.currentUrl,
          width: 180,
          height: 180,
          // eslint-disable-next-line no-undef
          correctLevel: QRCode.CorrectLevel.M,
        });
        // 修复android浏览器canvas挡住无法保存图片问题
        const qrcode = window.document.getElementById('qrcodeid');
        if (qrcode) {
          console.log('qrcode', qrcode);
          const canvas = qrcode.getElementsByTagName('canvas');
          if (canvas && canvas.length > 0 && canvas[0]) {
            this.qrcodeSrc = canvas[0].toDataURL('image/png');
            this.hideCanvas = true;
          }
        }
      });
      // #endif
    },
    closeDialog() {
      this.$emit('dialogVisibleEvent', false);
      this.$emit('update:showChooseDialog', false);
      this.$emit('update:showScanDialog', false);
      this.$emit('update:showTipDialog', false);

      if (this.destroyedWhenClosed) {
        const dialogId = 'tip-dialog-login';
        const oldDialog = document.getElementById(dialogId);
        if (oldDialog) {
          oldDialog.parentNode.removeChild(oldDialog);
        }
      }
    },
    jumpToLoginQQ() {
      this.$emit('jumpToLoginQQ');
    },
    jumpToLoginWX() {
      this.$emit('jumpToLoginWX');
    },
    closeScanDialog() {
      this.$emit('update:showScanDialog', false);
      this.$emit('update:showChooseDialog', true);
    },
    closeTipDialog() {
      this.$emit('update:showTipDialog', false);
      this.$emit('update:showChooseDialog', true);
    },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style src="./css/index.scss" scoped lang="scss">
</style>
