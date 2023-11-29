
<template>
  <div
    v-if="isShowPlayIcon || isLoading || isError"
    class="press-msg"
  >
    <div
      v-if="isError && isTryFailed"
      class="press-msg__error"
    >
      <!-- 尝试重连 -->
      <div class="press-msg__top-bar">
        <div />
        <div
          v-if="showFeedbackIcon"
          class="press-msg__feedback-img-wrap"
          @click.stop="$emit('clickFeedbackIcon')"
        >
          <img
            class="press-msg__feedback-img"
            src="https://res.edata.qq.com/nestim/ua-images/feedback.png"
          >
        </div>
      </div>

      <div
        class="press-msg__connect-failed"
      >
        <div class="press-msg__connect-failed-msg">
          {{ errMessage || '播放失败' }}
        </div>
        <div
          v-if="showGoOtherMatch"
          class="press-msg__other-match"
        >
          <div
            class="press-msg__other-match-text"
            @click.stop="$emit('goOtherMatch')"
          >
            其他比赛直播
          </div>

          <div
            class="press-msg__other-match-icon"
            @click.stop="$emit('goOtherMatch')"
          >
            <img
              class="press-msg__other-match-img"
              src="https://res.edata.qq.com/nestim/ua-images/arrow-right.png"
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="(isError && !isTryFailed) || isLoading"
      class="press-msg__loading"
    >
      <img
        class="press-msg__loading-img"
        src="https://res.edata.qq.com/nestim/images/loading.gif"
      >
      <span class="press-msg__loading-text">
        {{ isLoading ? '正在缓冲，请稍候…' : '直播重连中，请耐心等待，预计等待时间' }}
        <span
          v-if="!isLoading"
          class="press-msg__loading-time"
        >
          {{ `0${parseInt(timeout / 60, 10)}` }}:{{ timeout % 60 < 10? `0${timeout % 60}` : timeout % 60 }}
        </span>
      </span>
    </div>

    <div
      v-else-if="isShowPlayIcon"
      class="press-msg__play-msg"
    >
      <img
        class="press-msg__play-icon"
        src="https://res.edata.qq.com/nestim/images/play.svg"
        @click.stop="$emit('startPlay')"
      >
    </div>
  </div>
</template>

<script>
export default {
  options: {
    virtualHost: true,
  },
  props: {
    errMessage: {
      type: String,
      default: '很抱歉因系统原因，本场比赛无法启动直播',
    },
    isError: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isShowPlayIcon: {
      type: Boolean,
      default: false,
    },
    reloadInterval: {
      type: Number,
      default: 5,
    },
    retryTimeout: {
      type: Number,
      default: 300,
      // default: 5,
    },
    showFeedbackIcon: {
      type: Boolean,
      default: false,
    },
    showGoOtherMatch: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'clickFeedbackIcon',
    'goOtherMatch',
    'reloadPlayer',
    'startPlay',
  ],
  data() {
    return {
      isTryFailed: false,
      timeout: this.retryTimeout,
      intervalT: null,
    };
  },
  watch: {
    isError: {
      handler(newVal) {
        if (newVal) {
          if (this.intervalT) {
            return;
          }
          if (this.retryTimeout <= 0) {
            this.stopTimer();
            return;
          }

          // 5s reload一次
          const reloadInterval = this.reloadInterval || 5;

          this.intervalT = setInterval(() => {
            this.timeout -= 1;

            if (this.timeout % reloadInterval === 0) {
              this.$emit('reloadPlayer');
            }

            if (this.timeout <= 0) {
              this.stopTimer();
            }
          }, 1000);
        } else {
          if (this.intervalT) {
            this.timeout = this.retryTimeout;
            this.isTryFailed = false;

            clearInterval(this.intervalT);
            this.intervalT = null;
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    stopTimer() {
      clearInterval(this.intervalT);
      this.intervalT = null;
      this.isTryFailed = true;
    },
  },
};
</script>
<style lang="scss" scoped src="./css/live-player-message.scss"></style>
