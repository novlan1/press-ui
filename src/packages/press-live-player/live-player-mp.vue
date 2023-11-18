<template>
  <view class="press-player-mp">
    <LivePlayerMessage
      :is-error="isError"
      :is-loading="isLoading"
      :err-message="errMessage"
      :err-code="errCode"
      @goNotifyError="$emit('goNotifyError')"
      @goOtherMatch="$emit('goOtherMatch')"
    />
    <view
      class="press-player-mp__content"
      @click="showController"
    >
      <live-player
        id="livePlayer"
        class="press-live-player"
        autoplay
        sound-mode="speaker"
        mode="RTC"
        object-fit="contain"
        :src="videoSrc"
        @statechange="statechange"
        @error="error"
      >
        <!-- 控制条 -->
        <LivePlayerMpController
          v-if="showControls"
          :is-loading="isLoading"
          :title="title"
          :playing-flag="playingFlag"
          :resolution-index="resolutionIndex"
          :full-screen-flag="fullScreenFlag"
          @playVideo="playVideo"
          @pauseVideo="pauseVideo"
          @unFullScreen="unFullScreen"
          @onFullScreen="onFullScreen"
          @hideController="hideController"
          @showResolutionSelector="showResolutionSelector"
          @battleReview="(val)=>$emit('battleReview',val)"
          @matchReview="(val)=>$emit('matchReview',val)"
        />
        <!-- 对局详情slot -->
        <slot name="battlePopup" />
        <!-- 选手信息slot -->
        <slot name="userPopup" />
        <!-- 对局信息slot -->
        <slot name="matchPopup" />
        <!-- 直播打分slot -->
        <slot name="ratePopup" />

        <!-- 全屏选择分辨率 -->
        <PressPicker
          v-if="isShowRFPopup"
          title="选择清晰度"
          :horizontal="fullScreenFlag"
          :list="RESOLUTION_LIST"
          :current="resolution"
          @cancel="isShowRFPopup=false"
          @confirm="resolutionChanged"
        />

        <!-- 点赞 -->
        <view
          v-if="!showControls && fullScreenFlag"
          class="press-player-mp__refuel-box"
        >
          <view
            class="press-player-mp__refuel-progress"
          >
            <view
              :style="{ width: `${teamWidth(battleInfo.teamANum)}%`}"
              class="press-player-mp__refuel-progress-left"
            />
            <view
              :style="{ width: `${teamWidth(battleInfo.teamBNum)}%`}"
              class="press-player-mp__refuel-progress-right"
            />
          </view>
        </view>
      </live-player>
    </view>

    <PressPicker
      v-if="isShowResolutionPopup"
      title="选择清晰度"
      :horizontal="fullScreenFlag"
      :list="RESOLUTION_LIST"
      :current="resolution"
      @cancel="isShowResolutionPopup=false"
      @confirm="resolutionChanged"
    />
  </view>
</template>

<script>
import player from './mixin-player';
import LivePlayerMpController from './live-player-mp-controller.vue';
import LivePlayerMessage from './live-player-message.vue';
import PressPicker from '../press-picker/press-picker.vue';
import { RESOLUTION_LIST } from './config';


export default {
  components: {
    LivePlayerMpController,
    LivePlayerMessage,
    PressPicker,
  },
  mixins: [player],
  options: {
    virtualHost: true,
    styleIsoLation: 'shared',
  },
  props: {
    videoSrc: {
      type: String,
      default: '',
    },
    battleInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isShowResolutionPopup: false,
      isShowRFPopup: false,
      playingFlag: false,
      fullScreenFlag: false,
      showControls: false,
      LivePlayerContext: null,

      resolutionIndex: 2,
      isError: false,
      isLoading: false,
      errMessage: '',
      errCode: 0,
      hideT: null,
      RESOLUTION_LIST,
    };
  },
  computed: {
    resolution() {
      return  this.RESOLUTION_LIST[this.resolutionIndex];
    },
    teamWidth() {
      return (value) => {
        const num = Math.round(Number(value)
      / (Number(this.battleInfo.teamANum) + Number(this.battleInfo.teamBNum)) * 100);
        if (num > 80) {
          return 80;
        }
        if (num < 20) {
          return 20;
        }
        if (!this.battleInfo.teamBNum && !this.battleInfo.teamANum) {
          return 50;
        }
        return num;
      };
    },
    isAndroidQQMp() {
      if (process.env.UNI_PLATFORM === 'mp-qq') {
        const result = uni?.getSystemInfoSync?.();
        const system = result?.system?.toLowerCase?.();
        return system?.indexOf('android') !== -1;
      }
      return false;
    },
  },
  watch: {
    playingFlag(val) {
      this.$emit('playStatusChange', val);
    },
  },
  created() {
    const that = this;
    this.LivePlayerContext = uni.createLivePlayerContext('livePlayer', that);
  },
  destroyed() {
    this.unFullScreen();
  },
  onPageShow() {
    this.hideController();
    this.unFullScreen();
    wx && wx.setPageOrientation({ orientation: 'portrait' });
  },
  onPageHide() {
    wx && wx.setPageOrientation({ orientation: 'portrait' });
  },
  methods: {
    fullScreenChange() {
      this.$emit('fullScreenChange', this.fullScreenFlag);
    },
    showResolutionSelector() {
      if (!this.fullScreenFlag) {
        this.isShowResolutionPopup = true;
      } else {
        this.isShowRFPopup = true;
      }
    },
    resolutionChanged(item) {
      this.resolutionIndex = item.index;
      setTimeout(() => {
        this.isShowResolutionPopup = false;
        this.isShowRFPopup = false;
      }, 400);
    },
    showController() {
      this.showControls = true;

      if (this.hideT === null) {
        this.hideT = setTimeout(() => {
          this.hideController();
        }, 5000);
      }
    },
    hideController() {
      this.showControls = false;
      if (this.hideT) {
        clearTimeout(this.hideT);
        this.hideT = null;
      }
    },
    playVideo() {
      const that = this;
      if (this.isAndroidQQMp) {
        that.playingFlag = true;
      }
      this.LivePlayerContext.resume({
        success() {
          that.playingFlag = true;
        },
        fail(e) {
          console.warn('playVideo fail', e);
          that.onHandleError();
        },
      });
    },
    pauseVideo() {
      const that = this;
      if (this.isAndroidQQMp) {
        that.playingFlag = false;
      }
      this.LivePlayerContext.pause({
        success() {
          that.playingFlag = false;
        },
        fail(e) {
          console.warn('pauseVideo fail', e);
        },
      });
    },
    onFullScreen() {
      const that = this;
      this.LivePlayerContext.requestFullScreen({
        direction: 90,
        success() {
          that.fullScreenFlag = true;
          that.fullScreenChange();
        },
        fail(e) {
          console.warn('onFullScreen fail', e);
        },
      });
    },
    unFullScreen() {
      if (!this.fullScreenFlag) {
        return;
      }
      const that = this;
      this.LivePlayerContext.exitFullScreen({
        success() {
          that.fullScreenFlag = false;
          that.fullScreenChange();
        },
        fail(e) {
          console.warn('unFullScreen fail', e);
        },
      });
    },
    statechange(e) {
      if ([2001, 2002].indexOf(e.detail.code) >= 0) {
        this.isLoading = true;
      }
      if (e.detail.code === 2006) {
        // 视频播放结束
        this.unFullScreen();
        this.playingFlag = false;
        this.isLoading = false;
      }
      if (e.detail.code === 2004) {
        // 开始播放
        this.playingFlag = true;
        this.isLoading = false;
        this.isError = false;
        this.errMessage = '';
      } else if (e.detail.code === 2105) {
        // 视频发生卡顿
      } else if (e.detail.code === -2301) {
        // 重试多次后播放失败
        this.onHandleError();
      }
    },
    error(e) {
      console.warn('e', e);
      this.onHandleError();
    },
    onHandleError() {
      this.unFullScreen();
      this.isLoading = false;
      this.playingFlag = false;
      this.showControls = false;
      this.isError = true;
      this.errMessage = '直播开启失败，请刷新后重试';
      this.$emit('playError');
    },
  },
};
</script>
<style lang="scss" scoped src="./css/live-player-mp.scss"></style>
