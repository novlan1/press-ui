import { MOCK_DATA_META } from '../../press-schedule-tree/demo-helper/helper';

const { DEFAULT_NAME, DEFAULT_AVATAR } = MOCK_DATA_META;

const MOCK_TEAM_INFO = {
  score: 0,
  teamid: 'PREVIEW',
  teamname: DEFAULT_NAME,
  fromBracketDesc: 'xxx',
  teamavatar: DEFAULT_AVATAR,
};


const MOCK_NODE_ITEM = {
  gid: 331,
  sch_type: 4,
  sch_rule: {
    round_stage: 101,
    round_type: 'main',
    round_id: 2,
    group_id: 1,
    tree_node_uni_id: '10014655_101_main_2_1_0',
  },
  sch_score: {
    teama_id: 'PREVIEW',
    teamb_id: 'PREVIEW',
  },
  sch_dantao: {

  },
  childid: 10014655,
  status: '未开始',
};


const MOCK_ROUND_INFO = {
  site_id: 10014653,
  child_id: 10014655,
  gid: 331,
  round_stage: 101,
  round_type: 'main',
  round_id: 1,
  round_name: '2进1',
  bo_type: 1,
  grp_num: 1,
  grp_source_num: 4,
  grp_promote_num: 2,
  source_num: 4,
  promote_num: 2,
  start_battle_type: 1,
  ready_time_utime: 1686100386,
};


const MOCK_SCHE_GROUP = {
  bracketIdDesc: 'U1',
  battleid: '',
  gameName: '杨的比赛',
  roundName: '2进1',
  boType: 1,
  curBo: 1,
  roomType: 1,
  battleStatus: '未开始',
  redSide: '',
  status: '未开始',
  isWeChatLiving: false,
  liveInfo: {},
};

const scheList = [
  [
    {
      battleList: [
        {
          ...MOCK_SCHE_GROUP,
          realStatus: 100,
          teamList: [
            MOCK_TEAM_INFO,
            MOCK_TEAM_INFO,
          ],
          nodeItem: {
            ...MOCK_NODE_ITEM,
            sch_dantao: {
              both_team_set: 3,
            },
          },
        },
        {
          ...MOCK_SCHE_GROUP,
          teamList: [
            MOCK_TEAM_INFO,
            MOCK_TEAM_INFO,
          ],
          nodeItem: {
            ...MOCK_NODE_ITEM,
            sch_dantao: {
              both_team_set: 3,
            },
          },
        },
      ],
      roundInfo: {
        ...MOCK_ROUND_INFO,
        round_name: '4进2',
      },
      isChamp: false,
    },
  ],
  [
    {
      battleList: [
        {
          ...MOCK_SCHE_GROUP,
          realStatus: 100,
          teamList: [
            MOCK_TEAM_INFO,
            MOCK_TEAM_INFO,
          ],
          nodeItem: {
            ...MOCK_NODE_ITEM,
          },
        },
      ],
      roundInfo: {
        ...MOCK_ROUND_INFO,
        round_name: '2进1',
      },
      isChamp: true,
    },
  ],
];

export const MOCK_DATA = {
  scheList,
};
