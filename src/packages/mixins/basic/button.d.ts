export declare const button: {
  props: {
    id: {
      type: StringConstructor;
      default: string;
    };
    lang: {
      type: StringConstructor;
      default: string;
    };
    businessId: {
      type: StringConstructor;
      default: string;
    };
    sessionFrom: {
      type: StringConstructor;
      default: string;
    };
    sendMessageTitle: {
      type: StringConstructor;
      default: string;
    };
    sendMessagePath: {
      type: StringConstructor;
      default: string;
    };
    sendMessageImg: {
      type: StringConstructor;
      default: string;
    };
    showMessageCard: {
      type: StringConstructor;
      default: string;
    };
    appParameter: {
      type: StringConstructor;
      default: string;
    };
    ariaLabel: {
      type: StringConstructor;
      default: string;
    };
    openType: {
      type: StringConstructor;
      default: string;
    };
    getUserProfileDesc: {
      type: StringConstructor;
      default: string;
    };
    hoverClass: {
      type: StringConstructor;
      default: string;
    };
    loadingClass: {
      type: StringConstructor;
      default: string;
    };
  };
  methods: {
    triggerEvent(...args: Array<any>): void;
    onGetUserInfo(event: any): void;
    onContact(event: any): void;
    onGetPhoneNumber(event: any): void;
    onError(event: any): void;
    onLaunchApp(event: any): void;
    onOpenSetting(event: any): void;
    onChooseAvatar(event: any): void;
  };
  data(): {
    canIUseGetUserProfile: boolean;
  };
};
