export declare const SCHEDULE_INFO: {
  battleList: {
    teamList: ({
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner: number;
    } | {
      teamid: string;
      teamname: string;
      teamavatar: string;
      capuid: string;
      score: number;
      isWinner?: undefined;
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
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        partition_id: number;
        group_id: number;
        tree_node_uni_id: string;
        pre_tree_node: string;
        bracket_id: number;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
        bo_type: number;
        cur_bo: number;
        room_type: number;
        ref_room: number;
        auto_fail: number;
        show_red: number;
      };
      sch_dantao: {
        both_team_set: number;
      };
      state: number;
      ctime: number;
      utime: number;
      version: number;
      childid: number;
      battle_list: {
        schid: string;
        battleid: string;
        gid: number;
        childid: number;
        bonum: number;
        battle_state: number;
        ctime: number;
        stime: number;
        red_side: string;
      }[];
      rawState: number;
      status: string;
    };
    bracketIdDesc: string;
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
    grp_source_num: number;
    source_num: number;
    promote_num: number;
    start_battle_type: number;
    ready_time_utime: number;
    latest_ready_time: number;
  };
  partitionId: number;
  isChamp: boolean;
  finals: boolean;
};
