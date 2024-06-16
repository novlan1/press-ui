/* eslint-disable no-nested-ternary */
import { timeStampFormat } from '../../common/format/time';
import {
  isSchEnd,
  isSchPlaying,
  isScheNotStart,
  getReadyInfoDesc,
  getStartBattleTypeDesc,
} from './status-helper';
import { t } from '../../locale';
import { PREVIEW_STATE_MAP, SPECIAL_TEAM_ID_MAP, SPECIAL_STATE_MAP } from '../config';


function getScheGroupEndTime(scheGroup) {
  const time = scheGroup?.nodeItem?.utime;
  if (!time) return '';
  return timeStampFormat(time, t('scheduleTree.endTimeFormat'));
}

function getTeamInfo(team, isPreview) {
  const {
    specState,
    score,
    teamid,
    teamname,
    teamavatar: teamAvatar,
    fromBracketDesc,
  } = team;
  let teamNameDesc = '';
  let teamNameSkeleton = false;

  if (isPreview == PREVIEW_STATE_MAP.PREVIEW) {
    if (fromBracketDesc) {
      teamNameDesc = fromBracketDesc;
    } else if (teamid === SPECIAL_TEAM_ID_MAP.PREVIEW) {
      teamNameSkeleton = true;
    } else if (teamid === SPECIAL_TEAM_ID_MAP.PREVIEW_EMPTY) {
      teamNameDesc = t('scheduleTree.emptyTeam');
    }
  } else {
    teamNameDesc = (teamname === t('scheduleTree.pending') && fromBracketDesc) ? fromBracketDesc : teamname;
  }

  return {
    ...team,
    scoreDesc: isPreview
      ? ''
      : specState === SPECIAL_STATE_MAP.QUIT_RIGHT
        ? t('scheduleTree.quitScore')
        : `${score || 0}`,
    teamNameDesc,
    teamNameSkeleton,
    teamAvatarSkeleton: isPreview == PREVIEW_STATE_MAP.PREVIEW,
    teamAvatar,
  };
}

export function getScheGroupInfo({
  scheGroup = {},
  roundInfo = {},
  isPreview = false,
  isAdmin = false,
}) {
  let timeDesc = '';
  let statusDesc = '';
  let isStatusHighList = false;
  let showLiveIcon = false;
  let abnormalErr = false; // 顶号相关,默认为false

  const {
    bracketIdDesc = '',
    realStatus,
    curBo,
    boType,
  } = scheGroup;

  const isEnd = isSchEnd(scheGroup);
  const isNotStart = isScheNotStart(realStatus);
  const isPlaying = isSchPlaying(realStatus, isNotStart);

  const startBattleTypeDesc = getStartBattleTypeDesc(roundInfo);
  const endTime = getScheGroupEndTime(scheGroup);

  if (isEnd) {
    statusDesc = t('scheduleTree.ended');
  }

  if (isAdmin) {
    // 顶号异常,仅在管理端模式下
    abnormalErr = scheGroup.nodeItem?.sch_score?.err_flag === 9999;
  }

  if (isPreview) {
    if (isAdmin) {
      // timeDesc = '&nbsp;';
      statusDesc = isEnd ? t('scheduleTree.ended') : startBattleTypeDesc;
    }
  } else if (isEnd) {
    timeDesc = endTime;
    statusDesc = t('scheduleTree.ended');
  } else if (isNotStart) {
    statusDesc = getReadyInfoDesc({
      scheGroup,
      roundInfo,
    });
  } else if (isPlaying) {
    timeDesc = t('scheduleTree.currentBo', curBo, boType);
    statusDesc = t('scheduleTree.playing');
    isStatusHighList = true;
    showLiveIcon = true;
  }

  return {
    ...scheGroup,
    bracketIdDesc: `${bracketIdDesc}`,
    timeDesc,
    statusDesc,
    isStatusHighList,
    showChannelsIcon: scheGroup.isWeChatLiving,
    showLiveIcon,
    abnormalErr,

    upTeamInfo: getTeamInfo(scheGroup.teamList?.[0] || {}, isPreview),
    downTeamInfo: getTeamInfo(scheGroup.teamList?.[1] || {}, isPreview),
  };
}

export function formatScheTreeData({
  scheList = [],
  isPreview = false,
  isAdmin = false,
}) {
  return scheList.map((scheColumn) => {
    const parsedScheColumn = scheColumn.map((schePair) => {
      const { battleList = [], roundInfo = {} } = schePair || {};
      const upScheGroup = getScheGroupInfo({
        scheGroup: battleList[0],
        roundInfo,
        isPreview,
        isAdmin,
      });
      const downScheGroup = getScheGroupInfo({
        scheGroup: battleList[1],
        roundInfo,
        isPreview,
        isAdmin,
      });

      return {
        ...schePair,
        upScheGroup,
        downScheGroup,
      };
    });

    return parsedScheColumn;
  });
}
