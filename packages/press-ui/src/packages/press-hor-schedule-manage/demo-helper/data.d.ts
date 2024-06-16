export declare const getTeamList: (length: number, start?: number) => {
  teamavatar: string;
  teamname: string;
  memnum: number;
  isPass: boolean;
  checked: boolean;
  disabled: boolean;
  members: {
    head: string;
    nick: string;
    uid: string;
  }[];
}[];
export declare const getGroupList: (length?: number, start?: number) => {
  roundId: string;
  groupSeq: number;
  teamLen: number;
  teamList: {
    teamAvatar: string;
  }[];
  started: boolean;
  title: string;
}[];
export declare function getTeamScoreList(): {
  teamName: string;
  totalScore: number;
  scoreStr: string;
  rank: number;
  historyScoreList: {
    roundStr: string;
    rank: number;
    score: number;
  }[];
}[];
export declare function getDemoData(): {
  teamList: {
    teamavatar: string;
    teamname: string;
    memnum: number;
    isPass: boolean;
    checked: boolean;
    disabled: boolean;
    members: {
      head: string;
      nick: string;
      uid: string;
    }[];
  }[];
  groupMap: any;
  groupList: any;
  roundList: {
    roundId: number;
    started: boolean;
  }[];
  toSelectNumList: number[];
};
