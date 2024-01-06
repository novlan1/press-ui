
<template>
  <div class="press-player">
    <LivePlayerMessage
      :is-error="innerIsError"
      :is-loading="isLoading"
      :is-show-play-icon="isShowPlayIcon"
      :err-message="innerErrorMessage"
      :reload-interval="reloadInterval"
      :retry-timeout="innerRetryTimeout"
      :show-feedback-icon="showFeedbackIcon"
      :show-go-other-match="showGoOtherMatch"
      @clickFeedbackIcon="$emit('clickFeedbackIcon')"
      @goOtherMatch="$emit('goOtherMatch')"
      @reloadPlayer="reloadPlayer"
      @startPlay="startPlay"
    />

    <div
      id="pressTCView"
      class="press-player__main"
    />
  </div>
</template>

<script>
import LivePlayerMessage from './live-player-message.vue';
import { LIVE_PLAYER_MIXIN } from './mixin-props';
import { loadJS } from 't-comm/lib/loader/loader';


const TC_PLAYER_JS_LIST = [
  'https://web.sdk.qcloud.com/player/tcplayer/release/v4.5.1/libs/TXLivePlayer-1.2.0.min.js',
  'https://web.sdk.qcloud.com/player/tcplayer/release/v4.5.2/libs/hls.min.0.13.2m.js',
  'https://web.sdk.qcloud.com/player/tcplayer/release/v4.5.2/tcplayer.v4.5.2.min.js',
];


export default {
  options: {
    virtualHost: true,
    styleIsoLation: 'shared',
  },
  components: {
    LivePlayerMessage,
  },
  mixins: [LIVE_PLAYER_MIXIN],
  props: {
  },
  emits: [
    'clickFeedbackIcon',
    'fullScreenChange',
    'goOtherMatch',
    'playError',
    'playStatusChange',
  ],
  data() {
    return {
      playerId: 'pressTCVideoRef',
      player: null,
      isReady: false,

      isShowPlayIcon: false,
      isError: false,
      isLoading: false,

      errCode: 0,
      playErrorMessage: '',
      // system: 'ios',
    };
  },
  computed: {
    innerErrorMessage() {
      if (this.errorMessage) {
        return this.errorMessage;
      }
      return this.playErrorMessage;
    },
    innerRetryTimeout() {
      if (this.errorMessage) {
        return 0;
      }
      return this.retryTimeout;
    },
    innerIsError() {
      return !!this.errorMessage || this.isError;
    },
  },
  watch: {
    videoSrc: {
      handler() {
        if (!this.errorMessage) {
          this.reloadPlayer();
        }
      },
      immediate: false,
      deep: true,
    },
  },
  mounted() {
    // #ifdef H5
    this.toReady().then(() => {
      this.initVideoPlayer();
    });
    // #endif
  },
  beforeDestroy() {
    this.player && this.player.dispose();
  },
  methods: {
    async toReady() {
      for (const item of TC_PLAYER_JS_LIST) {
        await loadJS(item);
      }
      this.isReady = true;
      console.log('[isReady]');

      return true;
    },
    startPlay() {
      if (!this.player) {
        this.initVideoPlayer();
      }
      this.player && this.player.play();
    },
    reloadPlayer() {
      console.info('[reloadPlayer]');
      this.initVideoPlayer(true);
    },
    initVideoPlayer(isReload) {
      if (!this.videoSrc) return;
      if (this.errorMessage) {
        return;
      }

      if (!this.isReady) {
        this.toReady().then(() => {
          this.initVideoPlayer(isReload);
        });
        return;
      }

      if (!isReload) {
        // reload的时候，不重新设置变量
        this.playErrorMessage = '';
        this.isError = false;
        this.isLoading = true;
        this.isShowPlayIcon = true;

        window.setTimeout(() => {
          // 最多显示加载中5秒 ios端找不到可以调用关闭加载中的事件
          this.isLoading = false;
        }, 5000);
      }
      this.player && this.player.dispose();
      this.player = null;

      const video = document.createElement('video');
      video.setAttribute('id', this.playerId);
      video.setAttribute('playsinline', true);
      video.setAttribute('webkit-playsinline', true);
      video.setAttribute('autoplay', true);
      // video.setAttribute('className', 'tcplayer');
      document.getElementById('pressTCView')?.appendChild(video);

      // eslint-disable-next-line
      this.player = TCPlayer(this.playerId, {
        multiResolution: {
          autoplay: true,
          bigPlayButton: false,
        },
        controlBar: {
          progressControl: this.progressControl,
          // volumePanel: false,
          playbackRateMenuButton: false,
        },
      });
      this.player.src(this.videoSrc);
      if (this.poster) {
        this.player.poster(this.poster);
      }
      this.player.on('error', this.handerPlayerError);
      this.player.on('playing', this.handerPlayerPlaying);
      this.player.one('canplay', this.handerPlayerCanplay);
      this.player.on('pause', this.handerPlayerPause);
      this.player.on('waiting', this.handerPlayerWaiting);
      this.player.on('fullscreenchange', this.handerPlayerFullscreenchange);
      this.player.on('webrtcevent', this.handleWebrtcEvent);
    },
    handerPlayerError(e) {
      // 视频播放出现错误时触发。
      console.warn('handerPlayerError', e);
      this.onHandleError();
    },
    handerPlayerPlaying(e) {
      console.warn('handerPlayerPlaying', e);
      // 因缓冲而暂停或停止后恢复播放时触发，paused 属性为 false 。通常用这个事件来标记视频真正播放，play 事件只是开始播放，画面并没有开始渲染。
      this.isShowPlayIcon = false;
      this.isLoading = false;
      this.isError = false;
      this.playErrorMessage = '';
      this.$emit('playStatusChange', 'playing');
    },
    handerPlayerCanplay(e) {
      console.warn('handerPlayerCanplay', e);
      // 当播放器能够开始播放视频时触发。
      this.isShowPlayIcon = true;
      this.isLoading = false;
      this.isError = false;
      this.playErrorMessage = '';
    },
    handerPlayerPause(e) {
      console.warn('handerPlayerPause', e);
      this.$emit('playStatusChange', 'pause');

      // 暂停时触发。
      this.isShowPlayIcon = true;
    },
    // eslint-disable-next-line no-unused-vars
    handerPlayerWaiting(e) {
      // 播放停止，下一帧内容不可用时触发。
      console.warn('handerPlayerWaiting', e);
      this.isLoading = true;
      this.$emit('playStatusChange', 'waiting');
    },
    handerPlayerFullscreenchange(e) {
      // 视频播放已结束时触发。此时 currentTime 值等于媒体资源最大值。
      console.warn('handerPlayerFullscreenchange', e);
      const isFullScreen = this.player.isFullscreen();
      this.$emit('fullScreenChange', isFullScreen);

      if (!isFullScreen) {
        // 通过延迟实现退出全屏后继续播放
        setTimeout(() => {
          this.startPlay();
        }, 500);
      }
    },
    handleWebrtcEvent(e) {
      console.warn('handleWebrtcEvent', e.data.code);
    },
    onHandleError() {
      // this.unFullScreen();
      this.isLoading = false;
      this.isError = true;
      this.isShowPlayIcon = false;
      this.playErrorMessage = '直播开启失败，请刷新后重试';
      this.$emit('playError');
    },
  },
};
</script>
<style lang="scss" scoped src="./css/live-player-h5.scss"></style>
