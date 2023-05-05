<template>
  <!-- :style="{backgroundPositionY:mpHeaderHeightStr}" -->
  <div
    class="room-page-container"
    :class="customClass"
  >
    <scroll-view
      id="tipMatchMsgWrap"
      :scroll-y="scrollY"
      enable-flex="true"
      enhanced="true"
      class="tip-match-msg-wrap"
      :scroll-with-animation="scrollWithAnimation"
      :enable-passive="true"
      :scroll-anchoring="true"
      @scroll="onScroll"
      @touchmove="onTouchMove"
    >
      <div
        v-if="loading"
        class="loading-wrap"
      >
        <press-loading-plus
          size="16px"
          color="rgba(0,0,0,0.7)"
        />
      </div>
      <div
        v-for="(item) in list"
        :id="`msgDetailItem-${item.id}`"
        :key="item.id"
        class="message-detail-item"
      >
        <p
          v-if="item.msgType === 'TIME'"
          class="message-item-time"
        >
          {{ item.content.text }}
        </p>
        <div
          v-else-if="item.msgType === 'MESSAGE_TEXT'"
          :class="['message-item-box',
                   item.isMine ? 'message-item-right':'',
                   item.teamInvite ? 'message-item-invite':'',
                   item.isSolo ? 'message-item-solo':'' ]"
        >
          <!-- <img
            v-if="item.avatar"
            :key="item.avatar"
            :src="item.avatar"
          > -->
          <div
            class="im-avatar"
            :style="{'background-image': `url(${item.avatar})`}"
            @click.stop="onClickAvatar(item)"
          />
          <div
            class="message-item-popover"
            :class="item.isMine ? 'message-popover-right' : 'message-popover-left'"
            @click.stop="onReSendMsg(item)"
          >
            <!-- 战队邀请 -->
            <div
              v-if="item.teamInvite"
              class="message-team-invite"
            >
              <div class="message-team-info">
                <div class="message-team-tip">
                  邀请你加入TA的战队
                </div>
                <div class="message-team-name">
                  战队名称最多八字
                </div>
                <div class="iconfont icon-back" />
              </div>
              <div class="message-team-btn">
                <p>同意加入</p>
              </div>
            </div>
            <!-- 正常文本消息 -->
            <div
              v-else
              class="message-popover-info"
            >
              <div
                v-if="item.content.title"
                class="message-popover-title"
              >
                {{ item.content.title }}
              </div>
              <div
                v-if="item.content.text"
                class="message-popover-text"
              >
                <div class="main-text">
                  {{ item.content.text }}
                </div>
                <span
                  v-if="item.content.link"
                  @click.stop="onCheckDetail(item.content.link)"
                >
                  查看详情
                </span>
                <!-- 1v1 solo -->
                <div
                  v-if="item.isSolo"
                  class="message-popover-btn"
                >
                  点击进入 09:59
                </div>
              </div>
            </div>
          </div>
          <!-- 消息发送失败 -->
          <p
            v-if="item.isCustomFail"
            @click.stop="onReSendMsg(item)"
          >
            ❗️
          </p>
          <!-- 消息是否已读 -->
          <p
            v-else-if="item.isMine"
            :class="item.isPeerRead ? 'message-popover-read' : 'message-popover-unread'"
          >
            {{ item.isPeerRead ? '已读' : '未读' }}
          </p>
        </div>
      </div>
    </scroll-view>
    <!-- v-if="oppositeInfo.uid !== 'esportRobot'" -->
    <div
      v-if="showInput"
      :style="{ transform: `translateY(-${inputBottom}px)` }"
      class="message-bottom"
    >
      <div
        class="team-zone-input-wrap"
      >
        <!-- 全国大赛solo -->
        <div
          v-if="isShowSolo"
          class="team-solo"
        />
        <!-- div模拟输入框 -->
        <div
          id="msg-footer-input"
          ref="msgFooterInput"
          class="team-zone-input"
        >
          <input
            id="msg-footer-textarea"
            v-model="inputContent"
            placeholder-style="color:#596297"
            show-confirm-bar="false"
            :adjust-position="false"
            :placeholder="placeholder"
            :auto-height="textAreaIsAutoHeight"
            maxlength="100"
            @focus="onFocus"
            @blur="onBlur"
          >
        </div>
        <div
          :class="{'disabled': !sendBtnEnable}"
          class="submit-btn"
          @click.stop="onSend"
        >
          <p>发送</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PressLoadingPlus from '../press-loading-plus/press-loading-plus';
import { isH5 } from '../common/utils/validator';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressLoadingPlus,
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    isShowSolo: {
      type: Boolean,
      default: false,
    },
    ...defaultProps,
  },
  data() {
    return {
      scrollWithAnimation: true,
      scrollY: true,
      textAreaIsAutoHeight: process.env.UNI_PLATFORM === 'mp-weixin' ? 'true' : 'false',
      placeholder: '说点什么...',
      inputBottom: '0', // 输入框底部padding
      helpIshow: false,

      inputContent: '',
    };
  },
  onPageShow() {
    uni.onKeyboardHeightChange((res) => { // 监听键盘高度变化
      // const systemInfo = uni.getSystemInfoSync();
      const keyHeight = res.height;
      // - (systemInfo.screenHeight - systemInfo.windowHeight + systemInfo.safeAreaInsets.bottom);

      this.inputBottom = `${keyHeight > 0 ? keyHeight : 0}`;
    });
  },
  onPageHide() {
    uni.offKeyboardHeightChange();
  },
  computed: {
    sendBtnEnable() {
      return this.inputContent && this.inputContent.length < 100;
    },
  },
  methods: {
    onScroll(event) {
      this.watchScrollTop(event);
    },
    onTouchMove(event) {
      this.watchScrollTop(event);
    },
    onClickAvatar(item) {
      if (item.isMine) return;
      if (item.uid === 'esportRobot') return;
      this.$emit('onShowMemberDialog');
    },
    watchScrollTop(event) {
      const scrollTopThreshold = 0;
      if (!isH5()) {
        const { scrollTop } = event.detail || {};
        if (!this.list || this.list.length < 1) {
          return;
        }
        const firstItemId = this.list[0]?.id;
        const cb = () => {
          const view = this.createSelectorQuery().select('#tipMatchMsgWrap');
          this.scrollWithAnimation = false;
          view
            .node()
            .exec((res) => {
              const scrollView = res[0]?.node;
              if (!scrollView) return;
              scrollView.scrollIntoView(`#msgDetailItem-${firstItemId}`);
            });
          setTimeout(() => {
            this.scrollWithAnimation = true;
          }, 1000);
          return;
        };
        if (scrollTop <= 10) {
          this.$emit('loadMore', cb);
        }
        return;
      }
      const wrap = document.querySelector('#tipMatchMsgWrap');
      if (!wrap) return;
      if (this.loading) return;

      const {  scrollTop, scrollHeight } = wrap;

      const cb = () => {
        // this.scrollY = true;
        wrap.scrollTop = wrap.scrollHeight - scrollHeight + scrollTopThreshold;
      };
      if (scrollTop <= scrollTopThreshold) {
        // this.scrollY = false;
        this.$emit('loadMore', cb);
      }
    },
    onSend() {
      if (!this.sendBtnEnable) return;
      this.$emit('send', this.inputContent);
      this.inputContent = '';
    },
    onFocus() {
      this?.scrollToBottom();
    },
    onBlur() {
      this.inputBottom = 0;
    },
    scrollToBottom() {
      if (this.list?.length <= 1) return;
      if (!isH5()) {
        const view = this.createSelectorQuery().select('#tipMatchMsgWrap');


        view
          .node()
          .exec((res) => {
            const scrollView = res[0]?.node;
            if (!scrollView) return;
            if (!this.list || this.list.length < 1) {
              return;
            }
            const id = `#msgDetailItem-${this.list[this.list.length - 1]?.id}`;
            scrollView.scrollIntoView(id);
          });
        return;
      }
      const dom = document.querySelector('#tipMatchMsgWrap');
      if (!dom) return;
      dom.scrollTop = dom.scrollHeight - dom.clientHeight;
    },
    tGoBack() {
      this.$goBack();
      this.$emit('setMessageRead');
    },
    onCheckDetail() {
      // const parsed = parseRobotLink(link);
      // if (parsed) {
      //   this.$router.push(parsed);
      //   return;
      // }

      // window.location.href = link;
    },
    onReSendMsg(item) {
      if (!item.isCustomFail) return;
      this.$emit('onReSend', item);
    },
  },
};
</script>
<style lang="scss" src="./index.scss"></style>
<style scoped land="scss">
.room-page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tip-match-msg-wrap {
  flex: 1;
  overflow: scroll;
  position: relative;
  overflow-anchor: auto;
}
.im-avatar {
  border-radius: 50%;
  width: 0.88rem;
  height: 0.88rem;
  background: url("https://image-1251917893.file.myqcloud.com/Esports/new/user/helper-logo.png")
    no-repeat center center;
  background-size: contain;
}
.loading-wrap {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
}
.message-detail-item:last-child {
  padding-bottom: 0.32rem;
}
</style>
