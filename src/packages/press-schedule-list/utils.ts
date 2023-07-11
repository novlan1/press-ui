import { t } from '../locale';
import { timeStampFormat } from '../common/format/time';
import {
  isSchEnd,
  isSchPlaying,
  isScheNotStart,
  getReadyInfoDesc,
  getStartBattleTypeDesc,
} from '../press-schedule-tree/status-helper';
import {
  MIDDLE_BUTTON_STATUS_MAP,
  MIDDLE_BUTTON_TITLE_MAP,
} from './config';
import {
  SPECIAL_STATE_MAP,
} from '../press-schedule-tree/config';


function getScheStateDesc({
  scheInfo,
  scheGroup,
  isPreview,
  isAdmin,

  isNotStart,
  isEnd,
  isPlaying,
}) {
  let scheStateDesc = '';
  let playingDesc = '';


  if (isPreview && isAdmin) {
    scheStateDesc = getStartBattleTypeDesc(scheInfo.roundInfo);
  } else if (isEnd) {
    const time = scheGroup?.nodeItem?.utime;
    const battleEndTime = time ? timeStampFormat(time, t('scheduleTree.endTimeFormat')) : '';
    scheStateDesc = `${t('scheduleTree.ended')} ${battleEndTime}`;
  } else if (isNotStart) {
    scheStateDesc = getReadyInfoDesc({
      scheGroup,
      roundInfo: scheInfo.roundInfo || {},
    });
  } else if (isPlaying) {
    playingDesc = t('scheduleTree.playing');
    scheStateDesc = t('scheduleTree.currentBo', scheGroup.curBo || '', scheGroup.boType || '');
  }

  return {
    scheStateDesc,
    playingDesc,
  };
}

function getTreeNodeUniId(nodeItem: Record<string, any> = {}) {
  const uniId =  nodeItem?.sch_rule?.tree_node_uni_id;
  if (uniId) return uniId;

  const schId = nodeItem?.schid || '';
  return schId.replace(/_\d+$/, '');
}

function getMiddleButtonStatus({
  isAdmin,
  scheGroup,

  isOneTeamLunKong,
  isOneTeamDaiDing,
  haveEmptyTeam,

  iamInThisSchedule,
  canShowOrderButton,
  scheSubStatusMap,


  isNotStart,
  isEnd,
  isPlaying,

}) {
  if (isAdmin) {
    if (!isOneTeamLunKong && !isOneTeamDaiDing) {
      return MIDDLE_BUTTON_STATUS_MAP.manage;
    }
    return;
  }
  if (isPlaying) {
    if (iamInThisSchedule) return MIDDLE_BUTTON_STATUS_MAP.play;
    return MIDDLE_BUTTON_STATUS_MAP.watch;
  }
  if (isEnd) {
    if (!haveEmptyTeam) {
      return MIDDLE_BUTTON_STATUS_MAP.review;
    }
  }
  if (isNotStart && iamInThisSchedule) {
    return MIDDLE_BUTTON_STATUS_MAP.play;
  }
  // if (isScheNotStart && !env.isQQ) {
  if (isNotStart && canShowOrderButton) {
    const treeNodeUniId = getTreeNodeUniId(scheGroup?.nodeItem);
    if (scheSubStatusMap[treeNodeUniId]) {
      return MIDDLE_BUTTON_STATUS_MAP.hasOrdered;
    }
    return MIDDLE_BUTTON_STATUS_MAP.order;
  }
  return '';
}


function getMiddleButtonClass(middleButtonStatus) {
  const obj = {
    'primary-btn': [
      MIDDLE_BUTTON_STATUS_MAP.watch,
      MIDDLE_BUTTON_STATUS_MAP.play,
    ]
      .indexOf(middleButtonStatus) > -1,
    'secondary-btn': [
      MIDDLE_BUTTON_STATUS_MAP.hasOrdered,
    ]
      .indexOf(middleButtonStatus) > -1,
    'border-btn': [
      MIDDLE_BUTTON_STATUS_MAP.order,
      MIDDLE_BUTTON_STATUS_MAP.manage,
      MIDDLE_BUTTON_STATUS_MAP.review,
    ]
      .indexOf(middleButtonStatus) > -1,
    'disabled-btn': [
      MIDDLE_BUTTON_STATUS_MAP.hasOrdered,
    ]
      .indexOf(middleButtonStatus) > -1,
  };

  const list: Array<string> = [];
  Object.keys(obj).forEach((key) => {
    obj[key] && list.push(key);
  });
  return list.join(' ');
}


export function parseScheItemData({
  scheInfo,
  isPreview,
  isAdmin,

  myTeamId,
  canShowOrderButton,
  scheSubStatusMap,
}) {
  const { finals } = scheInfo || {};
  const scheGroup = scheInfo?.battleList?.[0] || {};
  const { realStatus } = scheGroup;

  const { specState } = scheGroup?.nodeItem || {};
  const leftTeam = scheGroup?.teamList?.[0] || {};
  const rightTeam = scheGroup?.teamList?.[1] || {};

  const isScoreColonShift = leftTeam.score === t('scheduleTree.quitScore')
    && rightTeam.score === t('scheduleTree.quitScore');
  const isLeftTeamQuit = leftTeam.specState === SPECIAL_STATE_MAP.QUIT_RIGHT;
  const isRightTeamQuit = rightTeam.specState ===  SPECIAL_STATE_MAP.QUIT_RIGHT;

  const isNotStart = isScheNotStart(realStatus);
  const isEnd = isSchEnd(scheGroup);
  const isPlaying = isSchPlaying(realStatus, isNotStart);

  const isOneTeamLunKong = specState === SPECIAL_STATE_MAP.LUN_KONG;
  const isOneTeamDaiDing = specState === SPECIAL_STATE_MAP.DAI_DING;
  const iamInThisSchedule = leftTeam.teamid === myTeamId
      || rightTeam.teamid === myTeamId ;

  const haveEmptyTeam = leftTeam.teamname === t('scheduleTree.emptyTeam')
   || rightTeam.teamname === t('scheduleTree.emptyTeam');

  const {
    scheStateDesc,
    playingDesc,
  } = getScheStateDesc({
    scheInfo,
    scheGroup,
    isPreview,
    isAdmin,

    isNotStart,
    isEnd,
    isPlaying,
  });

  const middleButtonStatus = getMiddleButtonStatus({
    isAdmin,
    scheGroup,

    isOneTeamLunKong,
    isOneTeamDaiDing,
    haveEmptyTeam,

    iamInThisSchedule,
    canShowOrderButton,
    scheSubStatusMap,

    isNotStart,
    isEnd,
    isPlaying,
  });
  const middleButtonClass = getMiddleButtonClass(middleButtonStatus);

  const showVS = isPreview ? true
    : [0, undefined].includes(leftTeam?.score)
      && [0, undefined].includes(rightTeam?.score)
      && !isSchEnd;

  const {
    latest_ready_time: latestReadyTime,
  } = scheInfo.roundInfo || {};
  const latestReadyTimeDesc = latestReadyTime
    ? timeStampFormat(latestReadyTime, t('scheduleList.joinDeadline'), '', '\\\\')
    : '';


  return {
    ...scheInfo,

    finalsLabel: finals ? t('scheduleList.finals') : '',
    finalsChampion: finals ? t('scheduleList.finalsChampion') : '',

    me: t('scheduleList.me'),
    emptyTeam: t('scheduleTree.emptyTeam'),

    scheStateDesc,
    playingDesc,

    showVS,

    isScoreColonShift,
    isLeftTeamQuit,
    isRightTeamQuit,

    middleButtonStatus,
    middleButtonTitle: isPreview
      ? ''
      : (MIDDLE_BUTTON_TITLE_MAP[middleButtonStatus as any] || ''),
    middleButtonClass,

    latestReadyTimeDesc,

    isOneTeamLunKong,
    isOneTeamDaiDing,
    haveEmptyTeam,
  };
}
