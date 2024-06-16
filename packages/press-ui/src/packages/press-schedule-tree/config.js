import { t } from '../locale';

export const START_BATTLE_MAP = {
  AUTO: 1,
  MANUAL: 2,
  ON_TIME: 3,
};


export const START_BATTLE_TITLE_MAP = {
  [START_BATTLE_MAP.AUTO]: t('scheduleTree.startBattleAuto'), // '人满开赛',
  [START_BATTLE_MAP.MANUAL]: t('scheduleTree.startBattleManual'), // '待管理员开赛',
  [START_BATTLE_MAP.ON_TIME]: t('scheduleTree.startBattleOnTime'), // '定时开赛',
};


export const SCHEDULE_CUSTOM_STATUS_MAP = {
  EMPTY: 300,
  PENDING: 400,
};


// 赛程组状态  0未开始，50已开打，100已开打进行中，200已结束
export const SCHEDULE_STATUS_MAP = {
  NOT_START: 0,
  STARTED: 50,
  PLAYING: 100,
  ENDED: 200,
};


export const SPECIAL_TEAM_ID_MAP = {
  PREVIEW: 'PREVIEW',
  PREVIEW_EMPTY: 'PREVIEW_EMPTY',
};


export const PREVIEW_STATE_MAP = {
  PREVIEW: 1,
  PREVIEW_CUSTOM: 2,
};


export const SPECIAL_STATE_MAP = {
  LUN_KONG: 'LUN_KONG',
  DAI_DING: 'DAI_DING',
  QUIT_RIGHT: 'QUIT_RIGHT',
};
