import { canIUseGetUserProfile } from '../../common/utils/version';
export const button = {
  props: {
    id: { type: String, default: '' },
    lang: { type: String, default: '' },
    businessId: { type: String, default: '' },
    sessionFrom: { type: String, default: '' },
    sendMessageTitle: { type: String, default: '' },
    sendMessagePath: { type: String, default: '' },
    sendMessageImg: { type: String, default: '' },
    showMessageCard: { type: String, default: '' },
    appParameter: { type: String, default: '' },
    ariaLabel: { type: String, default: '' },
    openType: { type: String, default: '' },
    getUserProfileDesc: { type: String, default: '' },
    hoverClass: { type: String, default: '' },
    loadingClass: { type: String, default: '' },
  },
  data() {
    return {
      canIUseGetUserProfile: canIUseGetUserProfile(),
    };
  },
  methods: {
    triggerEvent(...args) {
      this.$emit(...args);
    },
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event);
    },
    onContact(event) {
      this.triggerEvent('contact', event);
    },
    onGetPhoneNumber(event) {
      this.triggerEvent('getphonenumber', event);
    },
    onError(event) {
      this.triggerEvent('error', event);
    },
    onLaunchApp(event) {
      this.triggerEvent('launchapp', event);
    },
    onOpenSetting(event) {
      this.triggerEvent('opensetting', event);
    },
    onChooseAvatar(event) {
      this.triggerEvent('chooseAvatar', event);
    },
  },
};
