export declare const MOCK_ALL_SCHE_LIST: {
  battleList: {
    teamList: ({
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner?: undefined;
    } | {
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner: number;
    })[];
    battleid: string;
    gameName: string;
    roundName: string;
    boType: number;
    curBo: number;
    roomType: number;
    battleStatus: string;
    redSide: string;
    schid: string;
    status: string;
    realStatus: number;
    isWeChatLiving: boolean;
    liveInfo: {};
    nodeItem: {
      schid: string;
      gid: number;
      siteid: number;
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        partition_id: number;
        group_id: number;
        tree_node_uni_id: string;
        pre_tree_node: string;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
        teamb_score: number;
        bo_type: number;
        cur_bo: number;
        room_type: number;
        auto_fail: number;
        show_red: number;
      };
      sch_dantao: {
        both_team_set: number;
      };
      state: number;
      winner: string;
      ctime: number;
      utime: number;
      version: number;
      childid: number;
      rawState: number;
      status: string;
    };
    abnormalErr: boolean;
  }[];
  roundInfo: {
    child_id: number;
    gid: number;
    round_stage: number;
    round_type: string;
    round_id: number;
    round_name: string;
    bo_type: number;
    grp_num: number;
  };
  partitionId: number;
  isChamp: boolean;
}[][][];
export declare const MOCK_MY_SCHE_LIST: {
  battleList: {
    teamList: ({
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner?: undefined;
    } | {
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner: number;
    })[];
    battleid: string;
    gameName: string;
    roundName: string;
    boType: number;
    curBo: number;
    roomType: number;
    battleStatus: string;
    redSide: string;
    schid: string;
    status: string;
    realStatus: number;
    isWeChatLiving: boolean;
    liveInfo: {};
    nodeItem: {
      schid: string;
      gid: number;
      siteid: number;
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        partition_id: number;
        group_id: number;
        tree_node_uni_id: string;
        pre_tree_node: string;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
        teamb_score: number;
        bo_type: number;
        cur_bo: number;
        room_type: number;
        auto_fail: number;
        show_red: number;
      };
      sch_dantao: {
        both_team_set: number;
      };
      state: number;
      winner: string;
      ctime: number;
      utime: number;
      version: number;
      childid: number;
      rawState: number;
      status: string;
    };
    abnormalErr: boolean;
  }[];
  roundInfo: {
    child_id: number;
    gid: number;
    round_stage: number;
    round_type: string;
    round_id: number;
    round_name: string;
    bo_type: number;
    grp_num: number;
  };
  partitionId: number;
  isChamp: boolean;
}[][];
