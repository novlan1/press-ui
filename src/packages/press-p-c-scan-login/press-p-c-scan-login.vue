<template>
  <div
    v-if="show"
    id="tip-dialog-login"
    :class="[getActClass('dialog')]"
  >
    <div :class="[getActClass('content')]">
      <div :class="[getActClass('header')]">
        <span :class="[getActClass('title')]">{{ title }}</span>
        <button
          :class="[getActClass('header-button')]"
          @click.stop="closeDialog"
        >
          <i
            :class="[getActClass('close','icon','icon--close')]"
            @click.stop="closeDialog"
          />
        </button>
      </div>

      <div :class="[getActClass('login-wrap')]">
        <div :class="[getActClass('login-content')]">
          <div
            id="login_container"
            :class="[getActClass('login-inner')]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getActClass } from './utils';

const WX_JS_SDK = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';


export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '微信登录',
    },
    destroyedWhenClosed: {
      type: Boolean,
      default: false,
    },
    loader: {
      type: Function,
      default: null,
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // redirectQQUrl: '',
      // redirectWxUrl: '',
      // qrcodeSrc: '',
      // hideCanvas: false,
      // showDialogLoginChoose: false,
      // showDialogLoginWx: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // cookie中设置，需要刷新
      // cookie.set('refresh_login', '1', { domain: '.igame.qq.com', expires: 1.0 / 6 }); // 是否需要刷新登录态

      // this.redirectQQUrl = this.getLoginUrl(this.url, false);
      // this.redirectWxUrl = this.getLoginUrl(this.url, true);
      // this.showDialogLoginChoose = true;

      // #ifdef H5
      if (typeof this.loader === 'function') {
        this.loader(WX_JS_SDK, () => {
          this.initQRCode();
        });
        return;
      }

      this.initQRCode();
      // #endif
    },
    initQRCode() {
      new window.WxLogin({
        id: 'login_container', // div的id
        self_redirect: false,
        appid: 'wx224053afb6d8a600',
        scope: 'snsapi_login',
        redirect_uri: this.url, // encodeURIComponent(this.redirectWxUrl),
        state: '7a6d6ed5589082dd6c41d64d5206b064',
        style: 'black', // 二维码黑白风格
        href: 'https://image-1251917893.file.myqcloud.com/igame-admin/weixinlogin.css',
      });
    },
    // jumpToNext() {
    //   this.closeDialog();
    //   if (this.redirectQQUrl && this.redirectQQUrl.length > 0) {
    //     window.location.href = this.redirectQQUrl;
    //   }
    // },
    // showWxDialog() {
    //   this.showDialogLoginChoose = false;
    //   this.showDialogLoginWx = true;
    // },
    // getLoginUrl(url, isWx) {
    //   let loginUrl = '';
    //   if (isWx) {
    //     loginUrl = `https://igame.qq.com/prod/pmdtrpc.commcgi.user.user/QueryUserInfo?_ltype=tiploginwxpc&_jumpurl=${encodeURIComponent(url)}`;
    //   } else {
    //     const redirectUrl = `https://igame.qq.com/prod/pmdtrpc.commcgi.user.user/QueryUserInfo?_ltype=tiploginqq&_jumpurl=${encodeURIComponent(url)}`;
    //     loginUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101425236&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=get_user_info&state=7&display=pc`;
    //   }
    //   return loginUrl;
    // },
    closeDialog() {
      this.$emit('update:show', false);
      if (this.destroyedWhenClosed) {
        const dialogId = 'tip-dialog-login';
        const oldDialog = document.getElementById(dialogId);
        if (oldDialog) {
          document.body.removeChild(oldDialog);
        }
      }
    },
    // getCurrentUrl() {
    //   return window.location.href;
    // },
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>

<style src="./css/index.scss" scoped lang="scss">
</style>

