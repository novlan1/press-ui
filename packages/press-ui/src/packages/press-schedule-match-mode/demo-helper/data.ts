const BASE_SCHE = {
  battleList: [
    {
      teamList: [
        {
          teamid: '811393BB',
          teamname: '12的战队',
          teamavatar: 'https://image-1251917893.file.myqcloud.com/Esports/new/user/logo17.png',
          capuid: 'owanlshC6BkzhHEmNwhM2pmFcE7U',
          score: 0,
        },
        {
          teamid: '48AF0E4C',
          teamname: '久郁的战队',
          teamavatar: 'https://image-1251917893.file.myqcloud.com/Esports/new/user/logo19.png',
          capuid: 'owanlspKDceijM_lmod9CVq-YII8',
          score: 1,
          isWinner: 1,
        },
      ],
      battleid: '',
      gameName: '0918solo赛1',
      roundName: '匹配轮',
      boType: 1,
      curBo: 1,
      roomType: 1,
      battleStatus: '已结束',
      redSide: '',
      schid: '24326395_101_match_1_1114_1_1695038395',
      status: '已结束',
      realStatus: 200,
      isWeChatLiving: false,
      liveInfo: {},
      nodeItem: {
        schid: '24326395_101_match_1_1114_1_1695038395',
        gid: 331,
        siteid: 24326393,
        sch_type: 8,
        sch_rule: {
          round_stage: 101,
          round_type: 'match',
          round_id: 1,
          partition_id: 1,
          group_id: 1114,
          tree_node_uni_id: '24326395_101_match_1_1114_1',
          pre_tree_node: '24326395_101_match_1_781_1_1695036339@24326395_101_match_1_262_1_1695034800',
        },
        sch_score: {
          teama_id: '811393BB',
          teamb_id: '48AF0E4C',
          teamb_score: 1,
          bo_type: 1,
          cur_bo: 1,
          room_type: 1,
          auto_fail: 1,
          show_red: 2,
        },
        sch_dantao: {
          both_team_set: 3,
        },
        state: 200,
        winner: '48AF0E4C',
        ctime: 1695038395,
        utime: 1695038603,
        version: 4,
        childid: 24326395,
        rawState: 200,
        status: '已结束',
      },
      abnormalErr: false,
    },
  ],
  roundInfo: {
    child_id: 24326395,
    gid: 331,
    round_stage: 101,
    round_type: 'match',
    round_id: 1,
    round_name: '匹配轮',
    bo_type: 1,
    grp_num: 1,
  },
  partitionId: 1,
  isChamp: false,
};

export const MOCK_ALL_SCHE_LIST = [
  [
    Array.from({ length: 100 }).map(() => BASE_SCHE),
  ],
];

export const MOCK_MY_SCHE_LIST = [
  [BASE_SCHE],
  [BASE_SCHE],
  [BASE_SCHE],
];
