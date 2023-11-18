
const player = {
  props: {
    liveInfo: {
      type: Object,
      default: () => ({}),
    },
    reportInfo: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    userRole: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    battleInfo: {
      type: Object,
      default: () => ({}),
    },
    playerBpInfo: {
      type: Object,
      default: () => ({}),
    },
    likeMessageList: {
      type: Array,
      default: () => ([]),
    },
  },
};
export default player;
