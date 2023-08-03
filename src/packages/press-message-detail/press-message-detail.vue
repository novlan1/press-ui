<template>
  <div class="press-message-detail">
    <scroll-view
      :id="SELECTOR_MAP.SCROLL_VIEW_ID"
      :scroll-y="scrollY"
      enable-flex="true"
      enhanced="true"
      class="press-message-detail__scroll-view"
      :scroll-with-animation="scrollWithAnimation"
      :enable-passive="false"
      @scroll="scroll"
      @touchmove="touchmove"
    >
      <div class="press-message-detail__placeholder" />
      <div class="press-message-detail__layout">
        <div
          v-for="(item) in reversedList"
          :id="`${SELECTOR_MAP.MESSAGE_ITEM_PREFIX}${item.id}`"
          :key="item.id"
          class="press-message-item"
        >
          <!-- 时间信息 -->
          <p
            v-if="item.messageType === MESSAGE_TYPE_MAP.TIME"
            class="press-message-item__time"
          >
            {{ item.text || '' }}
          </p>
          <!-- 系统信息 -->
          <div v-else-if="item.messageType === MESSAGE_TYPE_MAP.EXCHANGE_TEXT">
            <p
              class="press-message-item__tip"
            >
              {{ item.text || '' }}
            </p>
            <p
              v-if="item.showAutoAgreeExchangeCardText"
              class="press-message-item__tip"
            >
              <span>根据您的设置，自动同意了交换名片，</span>
              <span
                class="press-message-item__tip__btn"
                @click.stop="goSetCardPage(item)"
              >设置></span>
            </p>
          </div>

          <!-- 普通消息 -->
          <div
            v-else-if="item.messageType === MESSAGE_TYPE_MAP.MESSAGE_TEXT"
            class="press-message-item__box"
            :class="item.isMine ? 'press-message-item__box--right' : ''"
          >
            <div
              class="press-message-item__box__avatar"
              :style="item.avatar ? `background-image: url(${item.avatar})` : ''"
              @click.stop="clickAvatar(item)"
            />
            <image
              v-if="item.picUrl "
              mode="widthFix"
              class="press-message-item__box__img"
              :src="item.picUrl"
              @click="clickPic(item.picUrl, item)"
            />
            <div
              v-else
              class="press-message-item__box__popover"
              :class="item.isMine
                ? 'press-message-item__box__popover--right' : 'press-message-item__box__popover--left'"
              @click.stop="reSend(item)"
            >
              <div
                v-if="item.title"
                class="press-message-item__title"
              >
                {{ item.title }}
              </div>
              <div class="press-message-item__content">
                <div class="press-message-item__content__item">
                  <div
                    v-for="textItem of item.textList"
                    :key="textItem.key"
                  >
                    {{ textItem.value }}
                  </div>
                </div>
                <span
                  v-if="item.link"
                  class="press-message-item__content__link"
                  @click.stop="checkDetail(item.link, item)"
                >
                  查看详情
                </span>
              </div>
            </div>

            <p
              v-if="item.isCustomFail"
              class="press-message-status"
              @click.stop="reSend(item)"
            >
              ❗️
            </p>
            <p
              v-else-if="item.isMine"
              class="press-message-status"
              :class="item.isPeerRead ? 'press-message-status--read' : 'press-message-status--unread'"
            >
              {{ item.isPeerRead ? '已读' : '未读' }}
            </p>
          </div>
          <!-- 个人名片卡片消息 -->
          <div
            v-else-if="item.messageType === MESSAGE_TYPE_MAP.EXCHANGE_CARD"
            class="press-message-item__box"
            :class="item.isMine ? 'press-message-item__box--right' : ''"
          >
            <div
              class="press-message-item__box__avatar"
              :style="item.avatar ? `background-image: url(${item.avatar})` : ''"
              @click.stop="clickAvatar(item)"
            />
            <div
              :class="[
                'press-message-item-card',
                item.isMine ? 'press-message-item-card--right' : 'press-message-item-card--left',
                item.isOwner ? 'press-message-item-card--owner' : ''
              ]"
            >
              <div class="press-message-item-card__title">
                <p class="press-message-item-card__title__main">
                  {{ item.cardTip || '' }}
                </p>
                <p class="press-message-item-card__title__desc">
                  {{ item.cardDesc || '' }}
                </p>
              </div>

              <div class="press-message-item-card__main">
                <div class="press-message-card__user">
                  <img
                    class="press-message-card__avatar"
                    :src="item.avatar"
                  >
                  <div class="press-message-card__user-meta">
                    <div class="press-message-card__user-name">
                      {{ item.nick }}
                    </div>
                    <div class="press-message-card__user-desc">
                      {{ item.userGradeDesc }}
                    </div>
                  </div>
                </div>

                <div class="press-message-card__contact">
                  <!-- 手机号 -->
                  <div
                    v-for="contact of item.cardContactList"
                    :key="contact.key"
                    class="press-message-card__contact__item"
                  >
                    <div :class="['iconfont', contact.icon || '']" />
                    <div class="press-message-card__contact__value">
                      {{ contact.value || '' }}
                    </div>
                    <span
                      v-if="contact.tip"
                      class="press-message-card__contact__tip"
                    >
                      {{ contact.tip }}
                    </span>
                    <a
                      v-if="contact.showPhoneCallLink"
                      class="press-message-card__contact__tag"
                      :href="`tel:${contact.phone}`"
                      @click.stop="makePhoneCall(contact.phone, contact, item)"
                    >
                      拨打
                    </a>
                    <span
                      v-if="contact.showCopy || contact.showCopyInMp"
                      id="message-wx-copy2"
                      class="press-message-card__contact__tag"
                      @click.stop="clickCopy('#message-wx-copy2', contact.copyValue, contact, item)"
                    >
                      复制
                    </span>
                  </div>
                  <div
                    v-if="item.showAgreeExchangeCardButton"
                    class="press-message-card__contact__btn"
                    @click.stop="agreeExchangeCard(item)"
                  >
                    同意交换
                  </div>
                  <div
                    v-else-if="item.showExchangedCardButton"
                    class="press-message-card__contact__btn press-message-card__contact__btn--disable"
                  >
                    已交换
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="innerLoading"
          class="press-message-detail__loading"
        >
          <press-loading-plus
            size="16px"
            color="rgba(0,0,0,0.7)"
          />
        </div>
      </div>
    </scroll-view>
    <div class="press-message-detail__scrollbar" />
  </div>
</template>
<script>
import PressLoadingPlus from '../press-loading-plus/press-loading-plus';
import { MESSAGE_TYPE_MAP } from '../common/im/message-detail/config';

import { SELECTOR_MAP } from './config';
import { getScrollSelector } from '../common/dom/scroll';
import { getRect } from '../common/dom/rect';

const scrollSelector = getScrollSelector(SELECTOR_MAP.SCROLL_VIEW_ID);

export default {
  name: 'PressMessageDetail',
  components: {
    PressLoadingPlus,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    placeHolderTop: {
      type: Number,
      default: () => 0,
    },
    offset: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      MESSAGE_TYPE_MAP,
      SELECTOR_MAP,
      scrollY: true,
      scrollWithAnimation: true,
      scrollTop: 0,

      innerLoading: this.loading,
      scrollerHeight: 0,
    };
  },
  computed: {
    reversedList() {
      const res = [
        ...this.list,
      ];
      res.reverse();
      return res;
    },
  },
  watch: {
    loading(val) {
      // console.log('watch.loading', val);
      this.innerLoading = val;
    },
  },
  methods: {
    scroll(event) {
      this.$emit('onScroll', event);
      this.watchScrollTop(event);
    },
    touchmove(event) {
      this.$emit('touchMove', event);
      // this.watchScrollTop(event);
    },
    clickPic(pickUrl, messageItem) {
      this.$emit('clickPic', pickUrl, messageItem);
    },
    clickAvatar(messageItem) {
      this.$emit('clickAvatar', messageItem);
    },
    checkDetail(link, messageItem) {
      this.$emit('checkDetail', link, messageItem);
    },
    reSend(messageItem) {
      this.$emit('reSend', messageItem);
    },
    agreeExchangeCard(messageItem) {
      this.$emit('agreeExchangeCard', messageItem);
    },
    goSetCardPage(messageItem) {
      this.$emit('goSetCardPage', messageItem);
    },
    makePhoneCall(phone, contactItem, messageItem) {
      this.$emit('makePhoneCall', phone, contactItem, messageItem);
    },
    clickCopy(selector, copyValue, contactItem, messageItem) {
      this.$emit('clickCopy', selector, copyValue, contactItem, messageItem);
    },
    scrollToBottom() {
      if (!this.list?.length) return;

      // #ifndef H5
      this?.createSelectorQuery?.()
        .select(scrollSelector)
        .node()
        .exec((res) => {
          const scrollView = res[0]?.node;
          if (!scrollView) return;
          scrollView.scrollTo({
            top: 0,
            duration: 20,
          });
        });
      // #endif

      // #ifdef H5
      const dom = document.querySelector(scrollSelector);
      if (!dom) return;
      dom.scrollTop = 0;
      // #endif
    },
    getScrollerHeight() {
      if (this.scrollerHeight)  {
        return Promise.resolve(this.scrollerHeight);
      }
      return new Promise((resolve) => {
        getRect(this, scrollSelector).then((res) => {
          // console.log('getRect.res', res);
          this.scrollerHeight = res.height;
          resolve(res.height);
        });
      });
    },


    watchScrollTop(event) {
      // console.log('innerLoading', this.innerLoading);
      if (!this.list?.length || this.innerLoading) return;
      const { scrollTop, scrollHeight } = event.detail || {};
      // console.log('scrollTop', scrollTop, event);
      this.getScrollerHeight().then((scrollerHeight) => {
        if (scrollTop + scrollerHeight > scrollHeight - this.offset) {
          this.$emit('loadMore');
        }
      });
      // getRect(this, scrollSelector).then((res) => {
      //   console.log('getRect.res', res);
      //   this.scrollerHeight = res.height;
      //   // if (scrollTop < 100) {
      //   if (scrollTop + res.height > scrollHeight - 100) {
      //     this.$emit('loadMore');
      //   }
      //   // if (res.top + 100 <= this.placeHolderTop) {
      //   //   this.$emit('loadMore');
      //   // }
      // });
      return;
    },
  },
};
</script>
<style scoped lang="scss" src="./css/index.scss"></style>
<style scoped lang="scss" src="./css/reverse.scss"></style>
<style>
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
