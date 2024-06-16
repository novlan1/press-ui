export declare function genMockScheduleItemData({ info }: Record<string, any>): {
  battleList: any[];
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
