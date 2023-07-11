import { MOCK_DATA_META } from 'src/packages/press-schedule-tree/demo-helper/helper';

const { DEFAULT_NAME, DEFAULT_AVATAR } = MOCK_DATA_META;

const roundList = [
  {
    site_id: 10014653,
    child_id: 10014655,
    gid: 331,
    round_stage: 101,
    round_type: 'main',
    round_id: 1,
    round_name: '4进2',
    bo_type: 1,
    grp_num: 1,
    grp_source_num: 4,
    grp_promote_num: 2,
    source_num: 4,
    promote_num: 2,
    start_battle_type: 1,
    ready_time_utime: 1686100386,
    rawRoundName: '4进2',
  },
  {
    site_id: 10014653,
    child_id: 10014655,
    gid: 331,
    round_stage: 101,
    round_type: 'main',
    round_id: 2,
    round_name: '决赛',
    bo_type: 1,
    grp_num: 1,
    grp_source_num: 2,
    grp_promote_num: 1,
    source_num: 2,
    promote_num: 1,
    start_battle_type: 1,
    ready_time_utime: 1686100386,
    rawRoundName: '决赛',
  },
];


const scheList = [
  [
    {
      battleList: [
        {
          realStatus: 100,
          teamList: [
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
          ],
          bracketIdDesc: 'U1',
          battleid: '',
          gameName: '杨的比赛',
          roundName: '4进2',
          boType: 1,
          curBo: 1,
          roomType: 1,
          battleStatus: '未开始',
          redSide: '',
          status: '未开始',
          isWeChatLiving: false,
          liveInfo: {

          },
          nodeItem: {
            gid: 331,
            sch_type: 4,
            sch_rule: {
              round_stage: 101,
              round_type: 'main',
              round_id: 1,
              group_id: 1,
              tree_node_uni_id: '10014655_101_main_1_1_0',
            },
            sch_score: {
              teama_id: 'PREVIEW',
              teamb_id: 'PREVIEW',
            },
            sch_dantao: {
              both_team_set: 3,
            },
            childid: 10014655,
            status: '未开始',
          },
        },
        {
          teamList: [
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
          ],
          bracketIdDesc: 'U1',
          battleid: '',
          gameName: '杨的比赛',
          roundName: '4进2',
          boType: 1,
          curBo: 1,
          roomType: 1,
          battleStatus: '未开始',
          redSide: '',
          status: '未开始',
          isWeChatLiving: false,
          liveInfo: {

          },
          nodeItem: {
            gid: 331,
            sch_type: 4,
            sch_rule: {
              round_stage: 101,
              round_type: 'main',
              round_id: 1,
              group_id: 2,
              tree_node_uni_id: '10014655_101_main_1_2_0',
            },
            sch_score: {
              teama_id: 'PREVIEW',
              teamb_id: 'PREVIEW',
            },
            sch_dantao: {
              both_team_set: 3,
            },
            childid: 10014655,
            status: '未开始',
          },
        },
      ],
      roundInfo: {
        site_id: 10014653,
        child_id: 10014655,
        gid: 331,
        round_stage: 101,
        round_type: 'main',
        round_id: 1,
        round_name: '4进2',
        bo_type: 1,
        grp_num: 1,
        grp_source_num: 4,
        grp_promote_num: 2,
        source_num: 4,
        promote_num: 2,
        start_battle_type: 1,
        ready_time_utime: 1686100386,
      },
      isChamp: false,
    },
  ],
  [
    {
      battleList: [
        {
          teamList: [
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
            {
              score: 0,
              teamid: 'PREVIEW',
              teamname: DEFAULT_NAME,
              fromBracketDesc: 'xxx',
              teamavatar: DEFAULT_AVATAR,
            },
          ],
          bracketIdDesc: 'U1',
          realStatus: 100,
          battleid: '',
          gameName: '杨的比赛',
          roundName: '决赛',
          boType: 1,
          curBo: 1,
          roomType: 1,
          battleStatus: '未开始',
          redSide: '',
          status: '未开始',
          isWeChatLiving: false,
          liveInfo: {

          },
          nodeItem: {
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
          },
        },
      ],
      roundInfo: {
        site_id: 10014653,
        child_id: 10014655,
        gid: 331,
        round_stage: 101,
        round_type: 'main',
        round_id: 2,
        round_name: '决赛',
        bo_type: 1,
        grp_num: 1,
        grp_source_num: 2,
        grp_promote_num: 1,
        source_num: 2,
        promote_num: 1,
        start_battle_type: 1,
        ready_time_utime: 1686100386,
      },
      isChamp: true,
    },
  ],
];

export const MOCK_DATA = {
  roundList,
  scheList,
};
