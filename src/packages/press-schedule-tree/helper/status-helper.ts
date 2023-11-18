import { timeStampFormat } from '../../common/format/time';
import {
  START_BATTLE_MAP,
  START_BATTLE_TITLE_MAP,
  SCHEDULE_STATUS_MAP,
  SCHEDULE_CUSTOM_STATUS_MAP,
} from '../config';
import { t } from '../../locale';


export function isSchEnd(scheGroup) {
  const { rawState } = scheGroup.nodeItem || {};
  if (rawState === SCHEDULE_STATUS_MAP.ENDED) {
    return true;
  }
  return [
    SCHEDULE_STATUS_MAP.ENDED,
    SCHEDULE_CUSTOM_STATUS_MAP.EMPTY,
  ].includes(scheGroup.realStatus);
}

export function isSchPlaying(realStatus, isNotStart) {
  return [SCHEDULE_STATUS_MAP.PLAYING].includes(realStatus) && !isNotStart;
}

export function isScheNotStart(realStatus) {
  return realJudgeScheNotStart(realStatus);
}

function realJudgeScheNotStart(realStatus) {
  return [
    undefined,
    SCHEDULE_STATUS_MAP.NOT_START,
    SCHEDULE_STATUS_MAP.STARTED,
    SCHEDULE_CUSTOM_STATUS_MAP.PENDING,
  ].includes(realStatus);
}


/**
 * 获取未开始的不同文案
 *
 * 未开始=人满开赛
 * 未开始=待管理员开赛+上场中
 * 未开始=10/30 19:00开赛+上场中
 *
 * 人满开赛=上场中=已开赛、10人未准备
 *
 * 区分点就是，开赛前/开赛后
 *
 */
export function getReadyInfoDesc({
  roundInfo = {},
  scheGroup = {},
}) {
  const {
    latest_ready_time: latestReadyTime,
    start_battle_type: startBattleType,
  } = roundInfo as Record<string, any>;
  const { realStatus } = scheGroup as Record<string, any>;

  const startBattleTypeDesc = getStartBattleTypeDesc(roundInfo);

  const curBo = (scheGroup as Record<string, any>)?.nodeItem?.sch_score?.cur_bo || 0;
  if (curBo > 1) {
    return t('scheduleTree.joining');
  }

  if (startBattleType == START_BATTLE_MAP.AUTO) {
    return startBattleTypeDesc;
  }

  if (realStatus == SCHEDULE_STATUS_MAP.STARTED) {
    if (!latestReadyTime) {
      return t('scheduleTree.joining');
    }
    return t('scheduleTree.joiningAndTimeoutAutoQuit');
  }
  return startBattleTypeDesc;
}

/**
 * 获取开赛方式描述
 */
export function getStartBattleTypeDesc(roundInfo) {
  const {
    show_stime: startTime,
    start_battle_type: startBattleType,
  } = roundInfo || {};
  if (startBattleType === START_BATTLE_MAP.ON_TIME) {
    return timeStampFormat(startTime, t('scheduleTree.startMatchOnTime'));
  }

  return START_BATTLE_TITLE_MAP[startBattleType];
}


