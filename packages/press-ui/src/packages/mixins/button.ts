import { canIUseGetUserProfile } from '../common/utils/version';
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
    triggerEvent(...args: Array<any>) {
      (this as any).$emit(...args);
    },
    onGetUserInfo(event: any) {
      this.triggerEvent('getuserinfo', event);
    },
    onContact(event: any) {
      this.triggerEvent('contact', event);
    },
    onGetPhoneNumber(event: any) {
      this.triggerEvent('getphonenumber', event);
    },
    onError(event: any) {
      this.triggerEvent('error', event);
    },
    onLaunchApp(event: any) {
      this.triggerEvent('launchapp', event);
    },
    onOpenSetting(event: any) {
      this.triggerEvent('opensetting', event);
    },
    onChooseAvatar(event: any) {
      this.triggerEvent('chooseAvatar', event);
    },
  },
};
