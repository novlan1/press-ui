
<template>
  <view
    class="press-controller"
    @click.native.stop="$emit('hideController')"
  >
    <view
      v-if="fullScreenFlag"
      class="press-controller__title"
    >
      <view class="press-controller__title-left">
        <view class="press-controller__back">
          <image
            class="press-controller__back-arrow"
            src="https://res.edata.qq.com/nestim/ua-images/arrow_left.png"
            @click="$emit('unFullScreen')"
          />
        </view>

        <text class="press-controller__title-info">
          {{ title }}
        </text>
      </view>
      <view class="press-controller__title-right" />
    </view>
    <view v-else />

    <view
      v-if="fullScreenFlag"
      class="press-controller__tools"
    >
      <view
        class="press-controller__tools-main"
        @click.native.stop=""
      >
        <view
          v-if="!isShowBattlePopup"
          class="press-controller__tools-item press-controller__tools-item--sche"
          @click="$emit('matchReview')"
        >
          <image
            class="press-controller__tools-btn-icon"
            src="https://res.edata.qq.com/nestim/ua-images/sche-btn.png"
          />
          <text class="press-controller__tools-btn-text">
            赛程回顾
          </text>
        </view>

        <view
          v-if="!isShowBattlePopup"
          class="press-controller__tools-item press-controller__tools-item--battle"
          @click="$emit('battleReview')"
        >
          <image
            class="press-controller__tools-btn-icon"
            src="https://res.edata.qq.com/nestim/ua-images/battle-btn.png"
          />
          <text class="press-controller__tools-btn-text">
            对局
          </text>
        </view>
      </view>
    </view>

    <view
      class="press-controller__content"
      :class="{fullscreen: fullScreenFlag}"
      @click.native.stop=""
    >
      <view class="press-controller__content-left">
        <view
          v-if="!playingFlag"
          class="press-controller__content-box"
          @click="$emit('playVideo')"
        >
          <image
            src="https://res.edata.qq.com/nestim/ua-images/play.png"
            class="press-controller__play-img"
          />
        </view>
        <view
          v-else
          class="press-controller__content-box"
          @click="$emit('pauseVideo')"
        >
          <image
            src="https://res.edata.qq.com/nestim/ua-images/pause.png"
            class="press-controller__play-img"
          />
        </view>
      </view>
      <view class="press-controller__content-right">
        <view
          class="press-controller__content-box"
          @click="$emit('showResolutionSelector')"
        >
          <text class="press-controller__resolution-text">
            {{ resolution.text }}
          </text>
        </view>
        <view
          v-if="fullScreenFlag"
          class="press-controller__content-box"
          @click="$emit('unFullScreen')"
        >
          <image
            src="https://res.edata.qq.com/nestim/ua-images/fullscreen.png"
            class="press-controller__full-img"
          />
        </view>

        <view
          v-else
          class="press-controller__content-box"
          @click="$emit('onFullScreen')"
        >
          <image
            src="https://res.edata.qq.com/nestim/ua-images/fullscreen.png"
            class="press-controller__full-img"
          />
        </view>
      </view>
    </view>

    <view
      v-if="isLoading"
      class="press-controller__load"
    >
      <image
        class="press-controller__load-img"
        src="https://res.edata.qq.com/nestim/images/loading.gif"
      />
      <text class="press-controller__load-text">
        正在缓冲，请稍候…
      </text>
    </view>
  </view>
</template>

<script>
import player from './mixin-player';
import { RESOLUTION_LIST } from './config';


export default {
  mixins: [
    player,
  ],
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    playingFlag: {
      type: Boolean,
      default: false,
    },
    fullScreenFlag: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    resolutionIndex: {
      type: Number,
      default: 2,
    },
    isShowBattlePopup: {
      type: Boolean,
      default: false,
    },
  },
  options: {
    virtualHost: true,
  },
  data() {
    return {
    };
  },
  computed: {
    resolution() {
      return RESOLUTION_LIST[this.resolutionIndex];
    },
  },
  methods: {
    showResolutionSelector() {
      this.$emit('showResolutionSelector');
    },
  },
};
</script>
<style lang="scss" scoped src="./css/live-player-mp-controller.scss"></style>
