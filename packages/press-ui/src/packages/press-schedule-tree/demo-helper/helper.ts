export const DEFAULT_TEAM_NUMBER = 64;
const MAX_ROUND_NUMBER = 15;

export const MOCK_DATA_META = {
  DEFAULT_AVATAR: 'https://image-1251917893.file.myqcloud.com/Esports/user/img/default-avatar.png',
  DEFAULT_NAME: '队伍名称很长很长很长',
};

export const STATUS_MAP = {
  PREVIEW: 'PREVIEW',
  PREVIEW_CUSTOM_SCHE: 'PREVIEW_CUSTOM_SCHE',
  NOT_START: 'NOT_START',
  PLAYING: 'PLAYING',
  PLAYING_WITH_CHANNELS: 'PLAYING_WITH_CHANNELS',
  ENDED: 'ENDED',
};

export const STATUS_TITLE_MAP = {
  [STATUS_MAP.PREVIEW]: '报名中，未定义赛程',
  [STATUS_MAP.PREVIEW_CUSTOM_SCHE]: '报名中，已定义赛程',
  [STATUS_MAP.NOT_START]: '未开赛',
  [STATUS_MAP.PLAYING]: '进行中，无视频号',
  [STATUS_MAP.PLAYING_WITH_CHANNELS]: '进行中，有视频号',
  [STATUS_MAP.ENDED]: '已结束',
};


export const STATUS_SCHE_MAP = {
  [STATUS_MAP.PREVIEW]: {
    isPreview: 1,
    realStatus: 0,
  },
  [STATUS_MAP.PREVIEW_CUSTOM_SCHE]: {
    isPreview: 2,
    realStatus: 0,
  },
  [STATUS_MAP.NOT_START]: {
    realStatus: 50,
  },
  [STATUS_MAP.PLAYING]: {
    realStatus: 100,
    curBo: 1,
    boType: 3,
  },
  [STATUS_MAP.PLAYING_WITH_CHANNELS]: {
    realStatus: 100,
    isWeChatLiving: true,
    curBo: 1,
    boType: 3,
  },
  [STATUS_MAP.ENDED]: {
    realStatus: 200,
  },
};


export const STATUS_LIST = Object.keys(STATUS_TITLE_MAP).map(key => ({
  label: STATUS_TITLE_MAP[key],
  value: key,
}));


export const TEAM_LIST = Array.from({ length: MAX_ROUND_NUMBER }).map((_, i) => ({
  label: `${2 ** (i + 1)} 队`,
  value: 2 ** (i + 1),
}));

export const TEAM_MAP = TEAM_LIST.reduce((acc: Record<string, any>, item) => {
  acc[item.value] = item.label;
  return acc;
}, {});


export const GROUP_TYPE_MAP = {
  KNOCK_OUT: {
    name: 'KNOCK_OUT',
    title: '淘汰赛',
  },
  CYCLE: {
    name: 'CYCLE',
    title: '循环赛',
  },
  DOUBLE_FAIL_LOSER: {
    name: 'DOUBLE_FAIL_LOSER',
    title: '双败赛败者组',
  },
};

export const GROUP_TYPE_LIST = Object.keys(GROUP_TYPE_MAP).map(item => ({
  label: GROUP_TYPE_MAP[item as keyof typeof GROUP_TYPE_MAP].title,
  value: GROUP_TYPE_MAP[item as keyof typeof GROUP_TYPE_MAP].name,
}));
