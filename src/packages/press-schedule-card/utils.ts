import { timeStampFormat } from 't-comm/lib//time/time';
import { NUMBER_CHI_MAP } from 't-comm/lib/base/number/number';

import {
  SCHEDULE_CARD_STATE_MAP,
  GAME_RESULT_UI_MAP,
  GAME_STATUS_MAP,
  BATTLE_STATUS_MAP,
  GAME_RESULT_MAP,
} from './config';


function getCardState({
  gameStatus,
  battleList,
  curBattleNo,
  gameStateRemain,
}) {
  if (gameStatus <= GAME_STATUS_MAP.WILL_START) {
    return {
      cardState: SCHEDULE_CARD_STATE_MAP.GAME_WILL_START,
      countdown: gameStateRemain,
    };
  }

  battleList.forEach((battle) => {
    if (!battle.battle_status) {
      battle.battle_status = 0;
    }
    // battle.can_enter_game = true;
  });

  const getBattleCountDown = (battleIndex) => {
    const battle = battleList[battleIndex];
    if (battle.battle_start_remain) {
      return battle.battle_start_remain;
    }
    const countdown = (battle.start_time || 0)
    - parseInt(`${Date.now() / 1000}`, 10);

    return countdown || 0;
  };


  if (gameStatus <= GAME_STATUS_MAP.PLAYING) {
    if (curBattleNo === 1) {
      if (battleList[0].battle_status === BATTLE_STATUS_MAP.PLAYING) {
        if (battleList[0].can_enter_game) {
          return {
            cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
            roomId: battleList[0].room_id,
            roomPwd: battleList[0].room_pwd,
            buttonTip: '第一局已开赛',
          };
        }

        return {
          cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_PLAYING,
        };
      }
      if (battleList[0].battle_status < BATTLE_STATUS_MAP.PLAYING) {
        return {
          cardState: SCHEDULE_CARD_STATE_MAP.GAME_WILL_START,
          countdown: getBattleCountDown(0) || gameStateRemain,
        };
      }
      if (battleList[0].battle_status > BATTLE_STATUS_MAP.PLAYING) {
        if (battleList.length === 1) {
          return {
            cardState: SCHEDULE_CARD_STATE_MAP.GAME_END,
          };
        }
        return {
          cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_PLAYING,
        };
      }
    } else {
      const index = curBattleNo - 1;
      if (battleList[index].battle_status === BATTLE_STATUS_MAP.PLAYING) {
        if (battleList[index].can_enter_game) {
          return {
            cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
            roomId: battleList[index].room_id,
            roomPwd: battleList[index].room_pwd,
            buttonTip: `第${NUMBER_CHI_MAP[index + 1]}局已开赛`,
          };
        }

        return {
          cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_PLAYING,
        };
      }
      if (battleList[index].battle_status < BATTLE_STATUS_MAP.PLAYING) {
        return {
          cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_NEXT_WILL_START,
          buttonCountDown: getBattleCountDown(index),
        };
      }

      if (battleList[index].battle_status > BATTLE_STATUS_MAP.PLAYING) {
        return {
          cardState: SCHEDULE_CARD_STATE_MAP.GAME_END,
        };
      }
    }
  } else if (gameStatus <= GAME_STATUS_MAP.EMD) {
    return {
      cardState: SCHEDULE_CARD_STATE_MAP.GAME_END,
    };
  }

  return {
    cardState: SCHEDULE_CARD_STATE_MAP.GAME_WILL_START,
    countdown: gameStateRemain,
  };
}

function getGameAutoStartTime(labels: Record<string, any> = {}) {
  const str = labels.battle_mode_confs || '';
  let autoStartTime;
  try {
    const config = JSON.parse(str);
    autoStartTime = config[0]?.auto_start_time;
  } catch (err) {}
  return autoStartTime;
}

export function parseScheduleData(data: Record<string, any> = {}, childInfo: Record<string, any> = {}) {
  const {
    game_status: gameStatus = 0,
    cur_battle_no: curBattleNo,
    battle_list: battleList = [],
    // game_start_time: gameStartTime,
    game_start_remain: gameStateRemain,
    game_result: gameResult = GAME_RESULT_MAP.PENDING,
    game_rank: gameRank = '-',
    battle_user_list: battleUserList = [],
  } = data;

  let newGameStateRemain = gameStateRemain;
  const actStartTime = getGameAutoStartTime(childInfo.labels);
  if (actStartTime) {
    newGameStateRemain = Math.max(actStartTime - parseInt(`${Date.now() / 1000}`, 10), 0);
  }
  // if (gameStateRemain === undefined
  //   && gameStartTime === undefined
  //   && childInfo.act_start_time
  // ) {
  //   newGameStateRemain = childInfo.act_start_time - parseInt(Date.now() / 1000, 10);
  // }


  const {
    cardState,
    countdown = 0,
    buttonCountDown = 0,
    roomId = '',
    roomPwd = '',
    buttonTip,
  } = getCardState({
    gameStatus,
    battleList,
    curBattleNo,
    gameStateRemain: newGameStateRemain,
  }) || {};

  const parsedBattleList = battleList.map((item, index) => {
    const { start_time: startTime } = item;
    return {
      title: `第${NUMBER_CHI_MAP[index + 1]}局`,
      time: timeStampFormat(startTime, 'hh:mm'),
      isCurrent: index === curBattleNo - 1,
    };
  });

  const scoreList = battleList.map((item, index) => {
    if (index > curBattleNo) {
      return {
        title: `第${NUMBER_CHI_MAP[index + 1]}局`,
        score: '--',
        isWinner: 3, // 1 胜 2 负 3 --
      };
    }
    return {
      title: `第${NUMBER_CHI_MAP[index + 1]}局`,
      score: item.score || '-',
      isWinner: item.isvictor,
    };
  });

  const battleIndexStr = battleList.map((_, index) => NUMBER_CHI_MAP[index + 1]).join('/');
  const battleScoreStr = battleList.map(item => item.score || '-').join('/');

  const resultList = [{
    name: '总积分排名',
    num: gameRank,
  }, {
    name: `单局积分(${battleIndexStr})`,
    num: battleScoreStr,
  }];

  return {
    // 比赛状态 10未开始 100进行中 200已结束
    // 300未被签到(人数不够，队员有黑名单)  400被裁判取消
    ...data,
    cardState,
    // cardState: SCHEDULE_CARD_STATE_MAP.BATTLE_STARTED,
    countdown: countdown * 1000, // to ms
    buttonCountDown: buttonCountDown * 1000,
    buttonTip: buttonTip || '',
    // failResult: gameResult === GAME_RESULT_MAP.FAIL,
    resultType: GAME_RESULT_UI_MAP[gameResult],
    // pendingResult: gameResult === GAME_RESULT_MAP.PENDING,
    parsedBattleList,

    curBattleNo,
    stepList: parsedBattleList,
    scoreList,
    resultList,

    roomId,
    roomPwd,
    siteId: data.site_id || childInfo.site_id || '',
    childId: data.child_id || data.game_id || childInfo.child_id || childInfo.game_id || '',
    teamList: battleUserList,
    actStartTime,
  };
}
