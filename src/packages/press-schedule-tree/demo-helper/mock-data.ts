import { MOCK_DATA_META, GROUP_TYPE_MAP } from 'src/packages/press-schedule-tree/demo-helper/helper';
import { MOCK_DATA } from 'src/packages/press-schedule-tree/demo-helper/data';

const MOCK_ROUND_LIST = [
  {
    start_battle_type: 1,
  },
  {
    start_battle_type: 2,
  },
  {
    start_battle_type: 3,
    show_stime: 1686100386,
  },
  {
    start_battle_type: 1,
    ready_time_utime: 1686100386,
  },
  {
    start_battle_type: 2,
    ready_time_utime: 1686100386,
  },
  {
    start_battle_type: 3,
    show_stime: 1686100386,
    ready_time_utime: 1686100386,
  },
];

function genTeamInfo(teamIndex = '') {
  return {
    score: 0,
    teamid: `team-id-${teamIndex}`,
    // teamid: 'PREVIEW',
    teamname: MOCK_DATA_META.DEFAULT_NAME,
    fromBracketDesc: 'U16胜者',
    teamavatar: MOCK_DATA_META.DEFAULT_AVATAR,
  };
}

function genScheGroupInfo(info: any = {}, teamIndex = '') {
  return {
    nodeItem: {
      ...(info?.nodeItem || {}),
      utime: 1686100386,
    },
    ...info,
    teamList: [
      genTeamInfo(`${teamIndex}-a`),
      genTeamInfo(`${teamIndex}-b`),
    ],
  };
}


function genSchePairInfo({
  info,
  roundIndex = 0,
  teamIndex = 0,
  scheGroupNumber = 2,
  groupType,
  teamNumber,
}) {
  const battleList = [genScheGroupInfo(info, `${teamIndex}-a`)];
  const roundNumber = getRoundNumber(teamNumber, groupType);
  if (scheGroupNumber === 2) {
    battleList.push(genScheGroupInfo(info, `${teamIndex}-b`));
  }
  return {
    battleList,
    roundInfo: {
      ...(MOCK_ROUND_LIST[roundIndex % MOCK_ROUND_LIST.length]),
      round_name: getRoundName({
        minusRoundNumber: roundIndex + 1,
        roundNumber: roundNumber - roundIndex,
        groupType,
      }),
    },
  };
}


function getRoundName({
  roundNumber,
  groupType,
  minusRoundNumber,
}) {
  if (groupType === GROUP_TYPE_MAP.KNOCK_OUT.name) {
    return minusRoundNumber - 1 === 0 ? '决赛' : `${2 ** (minusRoundNumber)}进${2 ** (minusRoundNumber - 1)}`;
  }
  if (groupType === GROUP_TYPE_MAP.CYCLE.name) {
    return `第${roundNumber}轮`;
  }

  if (groupType === GROUP_TYPE_MAP.DOUBLE_FAIL_LOSER.name) {
    return `败者组第${roundNumber}轮`;
  }
  return '';
}


function getRoundNumber(number, groupType) {
  const roundNumber = Math.log(number) / Math.log(2);
  if (groupType !== GROUP_TYPE_MAP.DOUBLE_FAIL_LOSER.name) {
    return roundNumber;
  }

  return 2 * roundNumber;
}


export function genScheList({
  info,
  teamNumber,
  groupType,
}) {
  const roundNumber = getRoundNumber(teamNumber, groupType);
  const { scheList } = MOCK_DATA;

  if (groupType === GROUP_TYPE_MAP.CYCLE.name) {
    const SCHE_PAIR_LENGTH = 10;
    const newScheList = Array.from({ length: roundNumber })
      .map((_, roundIndex) => Array.from({ length: SCHE_PAIR_LENGTH }).map((_, schePairIndex) => genSchePairInfo({
        info,
        scheGroupNumber: 1,
        roundIndex,
        teamIndex: roundIndex * SCHE_PAIR_LENGTH + schePairIndex,
        groupType,
        teamNumber,
      })))
      .reverse();
    return newScheList;
  }

  // 2 0
  // 3 0
  // 4 1
  // 5 1
  // 6 2
  // 7 2
  // 8 3
  // 9 3
  if (groupType === GROUP_TYPE_MAP.DOUBLE_FAIL_LOSER.name) {
    const newScheList = Array.from({ length: roundNumber })
      .map((_, roundIndex) => {
        if (!roundIndex) return scheList[1];
        if (roundIndex === 1) return scheList[1];
        return Array.from({ length: 2 ** Math.floor((roundIndex - 2) / 2) }).map((_, schePairIndex) => genSchePairInfo({
          info,
          scheGroupNumber: 2,
          roundIndex,
          teamIndex: roundIndex * 1000 + schePairIndex,
          groupType,
          teamNumber,
        }));
      })
      .reverse();

    return newScheList;
  }

  const newScheList = Array.from({ length: roundNumber })
    .map((_, roundIndex) => {
      if (!roundIndex) return scheList[1];
      if (roundIndex === 1) return scheList[0];
      return Array.from({ length: 2 ** (roundIndex - 1) }).map((_, schePairIndex) => genSchePairInfo({
        info,
        scheGroupNumber: 2,
        roundIndex,
        teamIndex: roundIndex * 100 + schePairIndex,
        groupType,
        teamNumber,
      }));
    })
    .reverse();

  return newScheList;
}


