<template>
  <div class="demo-wrap demo-wrap--flex demo-wrap--gray">
    <div class="demo-list-wrap">
      <PressMessageDetail
        :ref="pressMessageDetailRef"
        :list="list"
        :loading="loading"
        :place-holder-top="placeHolderTop"
        @onScroll="onScroll"
        @touchMove="touchMove"
        @clickAvatar="clickAvatar"
        @clickPic="clickPic"
        @makePhoneCall="makePhoneCall"
        @goSetCardPage="goSetCardPage"
        @reSend="reSend"
        @checkDetail="checkDetail"
        @agreeExchangeCard="agreeExchangeCard"
        @clickCopy="clickCopy"
        @loadMore="loadMore"
      />
    </div>

    <div class="demo-input-wrap">
      <PressMessageBoardInput
        v-model="msgContent"
        :send-btn-enable="sendBtnEnable"
        @clickInput="clickInput"
        @sendMsg="sendMsg"
      />
    </div>
  </div>
</template>
<script>
import PressMessageDetail from 'src/packages/press-message-detail/press-message-detail.vue';
import PressMessageBoardInput from 'src/packages/press-message-board/press-message-board-input.vue';
import { genMockData, getLessList } from 'src/packages/press-message-detail/demo-helper/mock-data';
import { setClipboardData } from 'src/packages/common/clipboard/clipboard';

const pressMessageDetailRef = 'pressMessageDetail';
let ref;


export default {
  components: {
    PressMessageDetail,
    PressMessageBoardInput,
  },
  data() {
    let placeHolderTop = 0;
    // #ifdef H5
    placeHolderTop = 44;
    // #endif

    return {
      list: [],
      msgContent: '',
      pressMessageDetailRef,
      loading: false,
      placeHolderTop,
      loadTime: 0,
    };
  },
  computed: {
    sendBtnEnable() {
      const res = !!(this.msgContent && this.msgContent.trim().length > 0);
      return res;
    },
  },
  mounted() {
    this.list = genMockData(this.loadTime);
    // this.$nextTick 在小程序下无效
    setTimeout(() => {
      ref = this.$refs[this.pressMessageDetailRef];
      ref?.scrollToBottom();
    });
  },
  methods: {
    clickInput() {
      this.onGTip('Click Input');
    },
    sendMsg() {
      console.log('[sendMsg]', this.msgContent);
      this.onGTip(this.msgContent);
    },
    onScroll() {
      // console.log('[onScroll]', ...args);
      // this.onGTip('[EVENT] onScroll');
    },
    touchMove() {
      // console.log('[touchMove]');
      // this.onGTip('[EVENT] touchMove');
    },
    clickAvatar(...args) {
      console.log('[clickAvatar]', ...args);
      this.onGTip('[EVENT] clickAvatar');
      setTimeout(() => {
        this.list = getLessList();
      }, 3000);
    },
    clickPic(...args) {
      console.log('[clickPic]', ...args);
      this.onGTip('[EVENT] clickPic');
    },
    makePhoneCall(...args) {
      console.log('[makePhoneCall]', ...args);
      this.onGTip('[EVENT] makePhoneCall');
      uni.makePhoneCall({
        phoneNumber: `${args[0]}`,
        success(res) {
          console.log('success', res);
        },
        fail(error) {
          console.log('fail', error);
        },
      });
    },
    goSetCardPage(...args) {
      console.log('[goSetCardPage]', ...args);
      this.onGTip('[EVENT] goSetCardPage');
    },
    reSend(...args) {
      console.log('[reSend]', ...args);
      this.onGTip('[EVENT] reSend');
    },
    checkDetail(...args) {
      console.log('[checkDetail]', ...args);
      this.onGTip('[EVENT] checkDetail');
    },
    agreeExchangeCard(...args) {
      console.log('[agreeExchangeCard]', ...args);
      this.onGTip('[EVENT] agreeExchangeCard');
    },
    clickCopy(selector, value) {
      setClipboardData(value).then(() => {
        this.onGTip('复制成功');
      })
        .catch(() => {
          this.onGTip('复制失败');
        });
    },
    loadMore() {
      if (this.loading) return;
      if (this.loadTime > 10) return;

      this.loading = true;
      this.loadTime += 1;
      setTimeout(() => {
        this.list = [
          ...(genMockData(this.loadTime).map(item => ({
            ...item,
            id: `${item.id}-${Math.random()}`,
          }))),
          ...this.list,
        ];

        this.loading = false;
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
.demo-list-wrap {
  // padding: 0 20px;
  flex: 1;
  overflow: auto;
}
</style>

<style>
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
