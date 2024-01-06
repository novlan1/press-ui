export const SCHEDULE_CARD_STATE_MAP = {
  // WAIT_SIGN_UP_END: 'WAIT_SIGN_UP_END', // 未报名，显示 "距离报名截止"
  GAME_WILL_START: 'GAME_WILL_START', // 比赛待开始，显示 "报名即将开始"
  BATTLE_STARTED: 'BATTLE_STARTED', // 第n局已开始，显示 “去比赛”
  BATTLE_PLAYING: 'BATTLE_PLAYING', // 第1局进行中，显示 “比赛进行中”
  BATTLE_NEXT_WILL_START: 'BATTLE_NEXT_WILL_START', // 前面局结束，第2，2+局待开始，显示 前几局积分，以及 “待开赛 + 倒计时” 按钮
  GAME_END: 'GAME_END', // 比赛结束，显示 晋级结果
};


export const BUTTON_TYPE_MAP = {
  PRIMARY: 'green',
  DISABLE: 'gray',
};

export const BUTTON_TIP_TYPE_AMP = {
  TEXT: 'TEXT',
  AVATAR: 'AVATAR',
};

export const RESULT_TYPE_MAP = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  PENDING: 'PENDING',
};

export const SWITCH_TYPE = {
  ON: '1',
  OFF: '2',
};


export const INNER_MATCH_STATUS_MAP = {
  SHOW_COUNT_DOWN: 'SHOW_COUNT_DOWN',
  SHOW_TEAM_LIST: 'SHOW_TEAM_LIST',
  SHOW_SCORE_LIST: 'SHOW_SCORE_LIST',
  SHOW_RESULT: 'SHOW_RESULT',
};


export const GAME_STATUS_MAP = {
  // 比赛状态 10未开始 100进行中 200已结束
  // 300未被签到(人数不够，队员有黑名单)  400被裁判取消
  NOT_START: 0,
  WILL_START: 10,
  PLAYING: 100,
  EMD: 200,
  SIGN_FAIL: 300,
  CANCELED: 400,
};

// 比赛结果  100晋级 200淘汰 300结算中
export const GAME_RESULT_MAP = {
  SUCCESS: 100,
  FAIL: 200,
  PENDING: 300,
};

export const BATTLE_STATUS_MAP = {
  // 对局状态 0未开始 10即将开始 100进行中 200已结束 300已结算
  NOT_START: 0,
  WILL_START: 10,
  PLAYING: 100,
  EMD: 200,
  RESULT: 300,
};

export const GAME_RESULT_UI_MAP = {
  [GAME_RESULT_MAP.SUCCESS]: RESULT_TYPE_MAP.SUCCESS,
  [GAME_RESULT_MAP.FAIL]: RESULT_TYPE_MAP.FAIL,
  [GAME_RESULT_MAP.PENDING]: RESULT_TYPE_MAP.PENDING,
};

