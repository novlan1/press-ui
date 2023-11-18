export const MOCK_OWNER_INFO = {
  pic: 'https://dummyimage.com/64x64',
  name: 'name',
  lv: '45',
};

export const getRankList = mineIndex => Array.from({ length: 10 }).map((item, index) => {
  const isMine = mineIndex === index;
  return {
    isMine,
    isFocused: index % 5 === 0,
    name: '奈雪新茶饮总决赛',
    pic: 'https://dummyimage.com/64x64',
    fan: '4556',
    lv: '5',
    num: '2131',
    rank: index + 1,
    showButton: !isMine,

    // myRankStr: 10,
    myRankStr: '未上榜',
    diffNumStr: '距前1名还差50人',

  };
});

export const RECOMMEND_LIST = Array.from({ length: 10 }).map((_, index) => {
  const name = `奈雪新茶饮总决赛-${index + 1}`;
  return {
    name,
    pic: 'https://dummyimage.com/64x64',
    awardList: [
      {
        img: 'https://dummyimage.com/64x64',
        name: '小乔',
        type: '冠军奖',
      },
      {
        img: 'https://dummyimage.com/64x64',
        name: '小乔1',
        type: '冠军奖',
      },
      {
        img: 'https://dummyimage.com/64x64',
        name: '小乔2',
        type: '冠军奖',
      },
      {
        img: 'https://dummyimage.com/64x64',
        name: '小乔3',
        type: '冠军奖',
      },
    ],
    friends: ['https://dummyimage.com/80x80', 'https://dummyimage.com/80x80', 'https://dummyimage.com/80x80'],
    customTitle: '3位好友已加入',

    joinEnd: '09.01 15:00',
    tagList: ['tag1', 'tag2', 'tag3'],
    distance: '350m',
  };
});

export const MY_MATCH_LIST = Array.from({ length: 10 }).map((_, index) => {
  const isEnd = index % 3 === 0; // 已结束
  const isPlaying = index % 3 === 1; // 进行中
  const isPending = index % 3 === 2; // 未开始


  let matchStatusDesc = '';
  let buttonText = '';
  if (isEnd) {
    matchStatusDesc = '已结束';
    buttonText = '详情';
  } else if (isPlaying) {
    matchStatusDesc = '进行中';
    buttonText = '详情';
  } else if (isPending) {
    matchStatusDesc = '待创建报名群';
    buttonText = '创建群';
  }

  return {
    name: '奈雪新茶饮总决赛',
    pic: 'https://dummyimage.com/64x64',
    matchTime: '09.01 15:00',
    tagList: ['tag1', 'tag2'],
    distance: '350m',
    matchStatusDesc,
    buttonText,

    isEnd,
    isPlaying,
    isPending,
  };
});


export const MY_MATCH_MAP = {
  0: MY_MATCH_LIST.map(item => ({
    ...item,
    matchName: `0-${item.name}`,
  })),
  1: MY_MATCH_LIST.map(item => ({
    ...item,
    matchName: `1-${item.name}`,
  })),
};
