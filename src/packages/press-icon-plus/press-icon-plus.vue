<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    @click="onClick"
  >
    <press-info
      v-if="info !== null || dot"
      :dot="dot"
      :info="info"
      custom-class="press-icon-plus__info"
    />
    <img
      v-if="isImage"
      :src="name"
      mode="aspectFit"
      class="press-icon-plus__image"
    >
  </div>
</template>
<script>
import computed from './index';
import PressInfo from '../press-info/press-info.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressIconPlus',
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressInfo,
  },
  props: {
    dot: Boolean,
    info: { type: String, default: '' },
    size: { type: String, default: '' },
    color: { type: String, default: '' },
    customStyle: { type: String, default: '' },
    classPrefix: {
      type: String,
      default: 'press-icon-plus',
    },
    name: { type: String, default: '' },
    ...defaultProps,
  },

  data() {
    return {

    };
  },
  computed: {
    rootClass() {
      const { classPrefix, name, customClass } = this;
      return computed.rootClass({ classPrefix, name, customClass });
    },
    rootStyle() {
      const { customStyle, color, size } = this;
      return computed.rootStyle({ customStyle, color, size });
    },
    isImage() {
      const { name } = this;
      return computed.isImage(name);
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../common/style/index.scss";

.press-icon-plus {
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font: normal normal normal 14px/1 press-icon-plus;
  font-size: inherit;
  position: relative;

  // 【修改点】增加垂直水平居中
  align-items: center;
  display: inline-flex;
  justify-content: center;
}
.press-icon-plus,
.press-icon-plus:before {
  display: inline-block;
}

.press-icon-plus {
  &-exchange:before {
    content: "\e6af";
  }
  &-exchange:before {
    content: "\e6af";
  }
  &-eye:before {
    content: "\e6b0";
  }
  &-enlarge:before {
    content: "\e6b1";
  }
  &-expand-o:before {
    content: "\e6b2";
  }
  &-eye-o:before {
    content: "\e6b3";
  }
  &-expand:before {
    content: "\e6b4";
  }
  &-filter-o:before {
    content: "\e6b5";
  }
  &-fire:before {
    content: "\e6b6";
  }
  &-fail:before {
    content: "\e6b7";
  }
  &-failure:before {
    content: "\e6b8";
  }
  &-fire-o:before {
    content: "\e6b9";
  }
  &-flag-o:before {
    content: "\e6ba";
  }
  &-font:before {
    content: "\e6bb";
  }
  &-font-o:before {
    content: "\e6bc";
  }
  &-gem-o:before {
    content: "\e6bd";
  }
  &-flower-o:before {
    content: "\e6be";
  }
  &-gem:before {
    content: "\e6bf";
  }
  &-gift-card:before {
    content: "\e6c0";
  }
  &-friends:before {
    content: "\e6c1";
  }
  &-friends-o:before {
    content: "\e6c2";
  }
  &-gold-coin:before {
    content: "\e6c3";
  }
  &-gold-coin-o:before {
    content: "\e6c4";
  }
  &-good-job-o:before {
    content: "\e6c5";
  }
  &-gift:before {
    content: "\e6c6";
  }
  &-gift-o:before {
    content: "\e6c7";
  }
  &-gift-card-o:before {
    content: "\e6c8";
  }
  &-good-job:before {
    content: "\e6c9";
  }
  &-home-o:before {
    content: "\e6ca";
  }
  &-goods-collect:before {
    content: "\e6cb";
  }
  &-graphic:before {
    content: "\e6cc";
  }
  &-goods-collect-o:before {
    content: "\e6cd";
  }
  &-hot-o:before {
    content: "\e6ce";
  }
  &-info:before {
    content: "\e6cf";
  }
  &-hotel-o:before {
    content: "\e6d0";
  }
  &-info-o:before {
    content: "\e6d1";
  }
  &-hot-sale-o:before {
    content: "\e6d2";
  }
  &-hot:before {
    content: "\e6d3";
  }
  &-like:before {
    content: "\e6d4";
  }
  &-idcard:before {
    content: "\e6d5";
  }
  &-invitation:before {
    content: "\e6d6";
  }
  &-like-o:before {
    content: "\e6d7";
  }
  &-hot-sale:before {
    content: "\e6d8";
  }
  &-location-o:before {
    content: "\e6d9";
  }
  &-location:before {
    content: "\e6da";
  }
  &-label:before {
    content: "\e6db";
  }
  &-lock:before {
    content: "\e6dc";
  }
  &-label-o:before {
    content: "\e6dd";
  }
  &-map-marked:before {
    content: "\e6de";
  }
  &-logistics:before {
    content: "\e6df";
  }
  &-manager:before {
    content: "\e6e0";
  }
  &-more:before {
    content: "\e6e1";
  }
  &-live:before {
    content: "\e6e2";
  }
  &-manager-o:before {
    content: "\e6e3";
  }
  &-medal:before {
    content: "\e6e4";
  }
  &-more-o:before {
    content: "\e6e5";
  }
  &-music-o:before {
    content: "\e6e6";
  }
  &-music:before {
    content: "\e6e7";
  }
  &-new-arrival-o:before {
    content: "\e6e8";
  }
  &-medal-o:before {
    content: "\e6e9";
  }
  &-new-o:before {
    content: "\e6ea";
  }
  &-free-postage:before {
    content: "\e6eb";
  }
  &-newspaper-o:before {
    content: "\e6ec";
  }
  &-new-arrival:before {
    content: "\e6ed";
  }
  &-minus:before {
    content: "\e6ee";
  }
  &-orders-o:before {
    content: "\e6ef";
  }
  &-new:before {
    content: "\e6f0";
  }
  &-paid:before {
    content: "\e6f1";
  }
  &-notes-o:before {
    content: "\e6f2";
  }
  &-other-pay:before {
    content: "\e6f3";
  }
  &-pause-circle:before {
    content: "\e6f4";
  }
  &-pause:before {
    content: "\e6f5";
  }
  &-pause-circle-o:before {
    content: "\e6f6";
  }
  &-peer-pay:before {
    content: "\e6f7";
  }
  &-pending-payment:before {
    content: "\e6f8";
  }
  &-passed:before {
    content: "\e6f9";
  }
  &-plus:before {
    content: "\e6fa";
  }
  &-phone-circle-o:before {
    content: "\e6fb";
  }
  &-phone-o:before {
    content: "\e6fc";
  }
  &-printer:before {
    content: "\e6fd";
  }
  &-photo-fail:before {
    content: "\e6fe";
  }
  &-phone:before {
    content: "\e6ff";
  }
  &-photo-o:before {
    content: "\e700";
  }
  &-play-circle:before {
    content: "\e701";
  }
  &-play:before {
    content: "\e702";
  }
  &-phone-circle:before {
    content: "\e703";
  }
  &-point-gift-o:before {
    content: "\e704";
  }
  &-point-gift:before {
    content: "\e705";
  }
  &-play-circle-o:before {
    content: "\e706";
  }
  &-shrink:before {
    content: "\e707";
  }
  &-photo:before {
    content: "\e708";
  }
  &-qr:before {
    content: "\e709";
  }
  &-qr-invalid:before {
    content: "\e70a";
  }
  &-question-o:before {
    content: "\e70b";
  }
  &-revoke:before {
    content: "\e70c";
  }
  &-replay:before {
    content: "\e70d";
  }
  &-service:before {
    content: "\e70e";
  }
  &-question:before {
    content: "\e70f";
  }
  &-search:before {
    content: "\e710";
  }
  &-refund-o:before {
    content: "\e711";
  }
  &-service-o:before {
    content: "\e712";
  }
  &-scan:before {
    content: "\e713";
  }
  &-share:before {
    content: "\e714";
  }
  &-send-gift-o:before {
    content: "\e715";
  }
  &-share-o:before {
    content: "\e716";
  }
  &-setting:before {
    content: "\e717";
  }
  &-points:before {
    content: "\e718";
  }
  &-photograph:before {
    content: "\e719";
  }
  &-shop:before {
    content: "\e71a";
  }
  &-shop-o:before {
    content: "\e71b";
  }
  &-shop-collect-o:before {
    content: "\e71c";
  }
  &-shop-collect:before {
    content: "\e71d";
  }
  &-smile:before {
    content: "\e71e";
  }
  &-shopping-cart-o:before {
    content: "\e71f";
  }
  &-sign:before {
    content: "\e720";
  }
  &-sort:before {
    content: "\e721";
  }
  &-star-o:before {
    content: "\e722";
  }
  &-smile-comment-o:before {
    content: "\e723";
  }
  &-stop:before {
    content: "\e724";
  }
  &-stop-circle-o:before {
    content: "\e725";
  }
  &-smile-o:before {
    content: "\e726";
  }
  &-star:before {
    content: "\e727";
  }
  &-success:before {
    content: "\e728";
  }
  &-stop-circle:before {
    content: "\e729";
  }
  &-records:before {
    content: "\e72a";
  }
  &-shopping-cart:before {
    content: "\e72b";
  }
  &-tosend:before {
    content: "\e72c";
  }
  &-todo-list:before {
    content: "\e72d";
  }
  &-thumb-circle-o:before {
    content: "\e72e";
  }
  &-thumb-circle:before {
    content: "\e72f";
  }
  &-umbrella-circle:before {
    content: "\e730";
  }
  &-underway:before {
    content: "\e731";
  }
  &-upgrade:before {
    content: "\e732";
  }
  &-todo-list-o:before {
    content: "\e733";
  }
  &-tv-o:before {
    content: "\e734";
  }
  &-underway-o:before {
    content: "\e735";
  }
  &-user-o:before {
    content: "\e736";
  }
  &-vip-card-o:before {
    content: "\e737";
  }
  &-vip-card:before {
    content: "\e738";
  }
  &-send-gift:before {
    content: "\e739";
  }
  &-wap-home:before {
    content: "\e73a";
  }
  &-wap-nav:before {
    content: "\e73b";
  }
  &-volume-o:before {
    content: "\e73c";
  }
  &-video:before {
    content: "\e73d";
  }
  &-wap-home-o:before {
    content: "\e73e";
  }
  &-volume:before {
    content: "\e73f";
  }
  &-warning:before {
    content: "\e740";
  }
  &-weapp-nav:before {
    content: "\e741";
  }
  &-wechat-pay:before {
    content: "\e742";
  }
  &-warning-o:before {
    content: "\e743";
  }
  &-wechat:before {
    content: "\e744";
  }
  &-setting-o:before {
    content: "\e745";
  }
  &-youzan-shield:before {
    content: "\e746";
  }
  &-warn-o:before {
    content: "\e747";
  }
  &-smile-comment:before {
    content: "\e748";
  }
  &-user-circle-o:before {
    content: "\e749";
  }
  &-video-o:before {
    content: "\e74a";
  }
  &-add-square:before {
    content: "\e65c";
  }
  &-add:before {
    content: "\e65d";
  }
  &-arrow-down:before {
    content: "\e65e";
  }
  &-arrow-up:before {
    content: "\e65f";
  }
  &-arrow:before {
    content: "\e660";
  }
  &-after-sale:before {
    content: "\e661";
  }
  &-add-o:before {
    content: "\e662";
  }
  &-alipay:before {
    content: "\e663";
  }
  &-ascending:before {
    content: "\e664";
  }
  &-apps-o:before {
    content: "\e665";
  }
  &-aim:before {
    content: "\e666";
  }
  &-award:before {
    content: "\e667";
  }
  &-arrow-left:before {
    content: "\e668";
  }
  &-award-o:before {
    content: "\e669";
  }
  &-audio:before {
    content: "\e66a";
  }
  &-bag-o:before {
    content: "\e66b";
  }
  &-balance-list:before {
    content: "\e66c";
  }
  &-back-top:before {
    content: "\e66d";
  }
  &-bag:before {
    content: "\e66e";
  }
  &-balance-pay:before {
    content: "\e66f";
  }
  &-balance-o:before {
    content: "\e670";
  }
  &-bar-chart-o:before {
    content: "\e671";
  }
  &-bars:before {
    content: "\e672";
  }
  &-balance-list-o:before {
    content: "\e673";
  }
  &-birthday-cake-o:before {
    content: "\e674";
  }
  &-bookmark:before {
    content: "\e675";
  }
  &-bill:before {
    content: "\e676";
  }
  &-bell:before {
    content: "\e677";
  }
  &-browsing-history-o:before {
    content: "\e678";
  }
  &-browsing-history:before {
    content: "\e679";
  }
  &-bookmark-o:before {
    content: "\e67a";
  }
  &-bulb-o:before {
    content: "\e67b";
  }
  &-bullhorn-o:before {
    content: "\e67c";
  }
  &-bill-o:before {
    content: "\e67d";
  }
  &-calendar-o:before {
    content: "\e67e";
  }
  &-brush-o:before {
    content: "\e67f";
  }
  &-card:before {
    content: "\e680";
  }
  &-cart-o:before {
    content: "\e681";
  }
  &-cart-circle:before {
    content: "\e682";
  }
  &-cart-circle-o:before {
    content: "\e683";
  }
  &-cart:before {
    content: "\e684";
  }
  &-cash-on-deliver:before {
    content: "\e685";
  }
  &-cash-back-record:before {
    content: "\e686";
  }
  &-cashier-o:before {
    content: "\e687";
  }
  &-chart-trending-o:before {
    content: "\e688";
  }
  &-certificate:before {
    content: "\e689";
  }
  &-chat:before {
    content: "\e68a";
  }
  &-clear:before {
    content: "\e68b";
  }
  &-chat-o:before {
    content: "\e68c";
  }
  &-checked:before {
    content: "\e68d";
  }
  &-clock:before {
    content: "\e68e";
  }
  &-clock-o:before {
    content: "\e68f";
  }
  &-close:before {
    content: "\e690";
  }
  &-closed-eye:before {
    content: "\e691";
  }
  &-circle:before {
    content: "\e692";
  }
  &-cluster-o:before {
    content: "\e693";
  }
  &-column:before {
    content: "\e694";
  }
  &-comment-circle-o:before {
    content: "\e695";
  }
  &-cluster:before {
    content: "\e696";
  }
  &-comment:before {
    content: "\e697";
  }
  &-comment-o:before {
    content: "\e698";
  }
  &-comment-circle:before {
    content: "\e699";
  }
  &-completed:before {
    content: "\e69a";
  }
  &-credit-pay:before {
    content: "\e69b";
  }
  &-coupon:before {
    content: "\e69c";
  }
  &-debit-pay:before {
    content: "\e69d";
  }
  &-coupon-o:before {
    content: "\e69e";
  }
  &-contact:before {
    content: "\e69f";
  }
  &-descending:before {
    content: "\e6a0";
  }
  &-desktop-o:before {
    content: "\e6a1";
  }
  &-diamond-o:before {
    content: "\e6a2";
  }
  &-description:before {
    content: "\e6a3";
  }
  &-delete:before {
    content: "\e6a4";
  }
  &-diamond:before {
    content: "\e6a5";
  }
  &-delete-o:before {
    content: "\e6a6";
  }
  &-cross:before {
    content: "\e6a7";
  }
  &-edit:before {
    content: "\e6a8";
  }
  &-ellipsis:before {
    content: "\e6a9";
  }
  &-down:before {
    content: "\e6aa";
  }
  &-discount:before {
    content: "\e6ab";
  }
  &-ecard-pay:before {
    content: "\e6ac";
  }
  &-envelop-o:before {
    content: "\e6ae";
  }
  &-shield-o:before {
    content: "\e74b";
  }
  &-guide-o:before {
    content: "\e74c";
  }
  &-cash-o:before {
    content: "\e74d";
  }
}
@font-face {
  font-display: auto;
  font-family: press-icon-plus;
  font-style: normal;
  font-weight: 400;
  src: url(https://at.alicdn.com/t/font_2553510_5imfhdc20ag.woff2?t=1640074908811)
      format("woff2"),
    url(https://at.alicdn.com/t/font_2553510_5imfhdc20ag.woff?t=1640074908811)
      format("woff"),
    url(https://at.alicdn.com/t/font_2553510_5imfhdc20ag.ttf?t=1640074908811)
      format("truetype");
}

.press-icon-plus {
  &--image {
    width: 1em;
    height: 1em;
  }

  &__image {
    width: 100%;
    height: 100%;
  }

  &__info {
    z-index: 1;
  }
}
</style>
