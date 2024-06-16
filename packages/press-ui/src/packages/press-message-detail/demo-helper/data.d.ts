export declare const MOCK_USER_META: {
  avatar: string;
  nick: string;
};
export declare const MOCK_MESSAGE_DETAIL_LIST: ({
  id: string;
  messageType: string;
  text: string;
  showAutoAgreeExchangeCardText?: undefined;
} | {
  id: string;
  isPeerRead: boolean;
  isMine: boolean;
  isOwner: boolean;
  textList: {
    value: string;
    key: number;
  }[];
  avatar: string;
  nick: string;
  messageType: string;
  text?: undefined;
  showAutoAgreeExchangeCardText?: undefined;
} | {
  id: string;
  isPeerRead: boolean;
  isMine: boolean;
  isOwner: boolean;
  isCustomFail: boolean;
  textList: {
    value: string;
    key: number;
  }[];
  avatar: string;
  nick: string;
  messageType: string;
  text?: undefined;
  showAutoAgreeExchangeCardText?: undefined;
} | {
  id: string;
  isMine: boolean;
  isOwner: boolean;
  picUrl: string;
  avatar: string;
  nick: string;
  messageType: string;
  isPeerRead: boolean;
  text?: undefined;
  showAutoAgreeExchangeCardText?: undefined;
} | {
  id: string;
  isMine: boolean;
  isOwner: boolean;
  title: string;
  link: string;
  textList: {
    value: string;
    key: number;
  }[];
  avatar: string;
  nick: string;
  messageType: string;
  isPeerRead: boolean;
  text?: undefined;
  showAutoAgreeExchangeCardText?: undefined;
} | {
  id: string;
  isOwner: boolean;
  isMine: boolean;
  showAutoAgreeExchangeCardText: boolean;
  cardTip: string;
  cardDesc: string;
  userGradeDesc: string;
  cardContactList: ({
    key: string;
    icon: string;
    value: string;
    tip: string;
    phone: number;
    showPhoneCallLink: boolean;
    showCopy?: undefined;
    copyValue?: undefined;
    showCopyInMp?: undefined;
  } | {
    key: string;
    icon: string;
    value: string;
    tip: string;
    showPhoneCallLink: boolean;
    showCopy: boolean;
    copyValue: number;
    phone?: undefined;
    showCopyInMp?: undefined;
  } | {
    key: string;
    icon: string;
    value: string;
    tip: string;
    showPhoneCallLink: boolean;
    showCopyInMp: boolean;
    copyValue: string;
    phone?: undefined;
    showCopy?: undefined;
  })[];
  showAgreeExchangeCardButton: boolean;
  showExchangedCardButton: boolean;
  avatar: string;
  nick: string;
  messageType: string;
  isPeerRead: boolean;
  text?: undefined;
} | {
  id: string;
  messageType: string;
  text: string;
  showAutoAgreeExchangeCardText: boolean;
})[];
