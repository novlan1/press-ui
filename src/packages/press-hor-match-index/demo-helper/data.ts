const AWARD_LIST = Array.from({ length: 3 }).map((_, index) => ({
  img: 'https://image-1251917893.file.myqcloud.com/Esports/admin/img/prize-1.png',
  name: `小乔-${index}`,
  type: '冠军奖',
}));

export const ONLINE_MATCH_LIST = Array.from({ length: 6 }).map((_, index) => {
  const isEnd = index % 3 === 0; // 已结束
  const isIng = index % 3 === 1; // 进行中
  const isNotStart = index % 3 === 2; // 未开始


  let btnTxt = '';
  let tag = '';
  if (isEnd) {
    btnTxt = '已结束';
    tag = '报名有奖';
  } else if (isIng) {
    btnTxt = '进行中';
    tag = '参赛有奖';
  } else if (isNotStart) {
    btnTxt = '去报名';
  }

  return {
    banner: 'https://image-1251917893.file.myqcloud.com/Esports/hor/default-bg.png',
    brandImg: 'https://image-1251917893.file.myqcloud.com/Esports/new/admin/icon-wzry.jpg',

    matchName: '奈雪新茶饮总决赛',
    awardList: index % 2 === 0 ? AWARD_LIST : [],
    matchDesc: '09.01 15:00 / 线上赛',
    matchType: '线上赛',

    isEnd,
    isIng: false,
    isNotStart: isIng || isNotStart,

    // isIng,
    // isNotStart,
    btnTxt,

    tag,
    isSigned: index % 2 === 0,

    matchLoc: index % 2 === 0 ? '' : '350m',
  };
});


export const ONLINE_MATCH_MAP = {
  0: ONLINE_MATCH_LIST.map(item => ({
    ...item,
    matchName: `0-${item.matchName}`,
  })),
  1: ONLINE_MATCH_LIST.map(item => ({
    ...item,
    matchName: `1-${item.matchName}`,
  })),
  2: ONLINE_MATCH_LIST.map(item => ({
    ...item,
    matchName: `2-${item.matchName}`,
  })),
};

export const BRAND_LIST = Array.from({ length: 7 }).map(() => ({
  img: 'https://igame-10037599.cos.ap-shanghai.myqcloud.com/18eaca68-1e8a-14db-e4d4-d792c0e55113.jpeg',
  name: 'name',
}));

export const BANNER_LIST = [
  'https://igame-10037599.cos.ap-shanghai.myqcloud.com/1a9a3313-e59b-dd49-dc93-5de0e020b085',
  'https://igame-10037599.cos.ap-shanghai.myqcloud.com/1a9a3313-e59b-dd49-dc93-5de0e020b085',
  'https://igame-10037599.cos.ap-shanghai.myqcloud.com/1a9a3313-e59b-dd49-dc93-5de0e020b085',
];

export const ONLINE_TAB_LIST = [
  {
    label: '精选赛事',
    value: 0,
  },
  {
    label: '报名有奖',
    value: 1,
  },
  {
    label: '参赛有奖',
    value: 2,
  },
  {
    label: '空状态',
    value: 3,
  },
];


