export declare function parseScheduleData(data?: Record<string, any>, childInfo?: Record<string, any>): {
  cardState: string;
  countdown: number;
  buttonCountDown: number;
  buttonTip: string;
  resultType: string;
  parsedBattleList: any;
  curBattleNo: any;
  stepList: any;
  scoreList: any;
  resultList: {
    name: string;
    num: any;
  }[];
  roomId: any;
  roomPwd: any;
  siteId: any;
  childId: any;
  teamList: any;
  actStartTime: any;
};
