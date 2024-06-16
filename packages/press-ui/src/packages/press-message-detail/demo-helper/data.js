export const MOCK_USER_META = {
  avatar: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
  nick: '杨',
};

const getMockCard = ({
  isOwner = false,
  isMine = false,
  showContactButton = false,
  showAgreeExchangeCardButton = false,
}) => ({
  messageType: 'EXCHANGE_CARD',
  isPeerRead: false,
  ...MOCK_USER_META,
  isOwner,
  isMine,
  showAutoAgreeExchangeCardText: false,
  cardTip: '这是我的名片',
  cardDesc: '互相查看联系方式，方便沟通',
  userGradeDesc: '青铜III',
  cardContactList: [
    {
      key: 'card-phone',
      icon: 'icon-telephone',
      value: showContactButton ? '110' : '********',
      tip: '交换后可见',
      phone: 110,
      showPhoneCallLink: showContactButton,
    },
    {
      key: 'card-wx',
      icon: 'icon-wx2',
      value: showContactButton ? '12306' : '********',
      tip: '交换后可见',
      showPhoneCallLink: false,
      showCopy: showContactButton,
      copyValue: 12306,
    },
    {
      key: 'card-qq',
      icon: 'icon-qq2',
      value: showContactButton ? '12345' : '********',
      tip: '交换后可见',
      showPhoneCallLink: false,
      showCopyInMp: showContactButton,
      copyValue: '12345',
    },
  ],
  showAgreeExchangeCardButton,
  showExchangedCardButton: !showAgreeExchangeCardButton,
});

export const MOCK_MESSAGE_DETAIL_LIST = [
  {
    messageType: 'TIME',
    text: '昨天 19:30',
  },
  {
    messageType: 'MESSAGE_TEXT',
    ...MOCK_USER_META,
    isPeerRead: false,
    isMine: false,
    isOwner: false,
    textList: [
      {
        value: '1',
        key: 729218,
      },
    ],
  },
  {
    messageType: 'TIME',
    text: '昨天 23:34',
  },
  {
    messageType: 'MESSAGE_TEXT',
    ...MOCK_USER_META,
    isPeerRead: false,
    isMine: true,
    isOwner: false,
    isCustomFail: true,
    textList: [
      {
        value: '1',
        key: 261972,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '1',
        key: 869125,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    picUrl: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: false,
    isOwner: false,
    picUrl: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/8/own_mike_fa81f5e602d598ce69.jpg',
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: false,
    isOwner: false,
    title: '比赛报名日报',
    link: 'https://baidu.com',
    textList: [
      {
        value: '今日报名队伍0队，满5人队伍0队，累计报名队伍0队，累计满5人队伍0队。',
        key: 142331,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '点击头像将切换列表为1个',
        key: 408006,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '123123123123123123123123123123123123131231231231231231231312312313123123131231231231231231223222222',
        key: 291465,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: 'ddddd',
        key: 703666,
      },
    ],

  },
  {
    ...getMockCard({
      isMine: true,
      isOwner: false,
    }),
  },
  {
    messageType: 'EXCHANGE_TEXT',
    text: '对方同意了与你交换名片',
    showAutoAgreeExchangeCardText: true,
  },
  {
    ...getMockCard({
      isMine: false,
      isOwner: false,
      showContactButton: true,
      showAgreeExchangeCardButton: true,
    }),
  },
  {
    ...getMockCard({
      isMine: true,
      isOwner: true,
      showContactButton: true,
      showAgreeExchangeCardButton: true,
    }),
  },
  {
    ...getMockCard({
      isMine: false,
      isOwner: true,
    }),
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: true,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '已读',
        key: 669054,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '未读',
        key: 638909,
      },
    ],
  },
  {
    messageType: 'MESSAGE_TEXT',
    isPeerRead: false,
    ...MOCK_USER_META,
    isMine: true,
    isOwner: false,
    textList: [
      {
        value: '未读',
        key: 749188,
      },
    ],
  },
].map((item, index) => ({
  ...item,
  id: `unique-${index}`,
}));
