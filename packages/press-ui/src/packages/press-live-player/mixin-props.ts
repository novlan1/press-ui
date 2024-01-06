export const LIVE_PLAYER_MIXIN = {
  props: {
    videoSrc: {
      type: String,
      default: '',
    },
    progressControl: {
      type: Boolean,
      default: true,
    },
    poster: {
      type: String,
      default: '',
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
    errorMessage: {
      type: String,
      default: '',
    },
    showGoOtherMatch: {
      type: Boolean,
      default: true,
    },
  },
};
