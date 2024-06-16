export declare function genScheList({ info, teamNumber, groupType }: Record<string, any>): ({
  battleList: ({
    realStatus: number;
    teamList: {
      score: number;
      teamid: string;
      teamname: string;
      fromBracketDesc: string;
      teamavatar: string;
    }[];
    nodeItem: {
      sch_dantao: {
        both_team_set: number;
      };
      gid: number;
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        group_id: number;
        tree_node_uni_id: string;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
      };
      childid: number;
      status: string;
    };
    bracketIdDesc: string;
    battleid: string;
    gameName: string;
    roundName: string;
    boType: number;
    curBo: number;
    roomType: number;
    battleStatus: string;
    redSide: string;
    status: string;
    isWeChatLiving: boolean;
    liveInfo: {};
  } | {
    teamList: {
      score: number;
      teamid: string;
      teamname: string;
      fromBracketDesc: string;
      teamavatar: string;
    }[];
    nodeItem: {
      sch_dantao: {
        both_team_set: number;
      };
      gid: number;
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        group_id: number;
        tree_node_uni_id: string;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
      };
      childid: number;
      status: string;
    };
    bracketIdDesc: string;
    battleid: string;
    gameName: string;
    roundName: string;
    boType: number;
    curBo: number;
    roomType: number;
    battleStatus: string;
    redSide: string;
    status: string;
    isWeChatLiving: boolean;
    liveInfo: {};
  })[];
  roundInfo: {
    round_name: string;
    site_id: number;
    child_id: number;
    gid: number;
    round_stage: number;
    round_type: string;
    round_id: number;
    bo_type: number;
    grp_num: number;
    grp_source_num: number;
    grp_promote_num: number;
    source_num: number;
    promote_num: number;
    start_battle_type: number;
    ready_time_utime: number;
  };
  isChamp: boolean;
}[] | {
  battleList: {
    realStatus: number;
    teamList: {
      score: number;
      teamid: string;
      teamname: string;
      fromBracketDesc: string;
      teamavatar: string;
    }[];
    nodeItem: {
      gid: number;
      sch_type: number;
      sch_rule: {
        round_stage: number;
        round_type: string;
        round_id: number;
        group_id: number;
        tree_node_uni_id: string;
      };
      sch_score: {
        teama_id: string;
        teamb_id: string;
      };
      sch_dantao: {};
      childid: number;
      status: string;
    };
    bracketIdDesc: string;
    battleid: string;
    gameName: string;
    roundName: string;
    boType: number;
    curBo: number;
    roomType: number;
    battleStatus: string;
    redSide: string;
    status: string;
    isWeChatLiving: boolean;
    liveInfo: {};
  }[];
  roundInfo: {
    round_name: string;
    site_id: number;
    child_id: number;
    gid: number;
    round_stage: number;
    round_type: string;
    round_id: number;
    bo_type: number;
    grp_num: number;
    grp_source_num: number;
    grp_promote_num: number;
    source_num: number;
    promote_num: number;
    start_battle_type: number;
    ready_time_utime: number;
  };
  isChamp: boolean;
}[] | {
  battleList: any[];
  roundInfo: {
    round_name: string;
    start_battle_type: number;
    show_stime?: undefined;
    ready_time_utime?: undefined;
  } | {
    round_name: string;
    start_battle_type: number;
    show_stime: number;
    ready_time_utime?: undefined;
  } | {
    round_name: string;
    start_battle_type: number;
    ready_time_utime: number;
    show_stime?: undefined;
  } | {
    round_name: string;
    start_battle_type: number;
    show_stime: number;
    ready_time_utime: number;
  };
}[])[];
