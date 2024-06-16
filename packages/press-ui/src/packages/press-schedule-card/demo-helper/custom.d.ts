export declare const getStepList: ({ length, playingIndex, curIndex, isStage }: {
  length?: number | undefined;
  playingIndex?: number | undefined;
  curIndex?: number | undefined;
  isStage?: boolean | undefined;
}) => {
  time: string;
  title: string;
  isCurrent: boolean;
  playing: boolean;
}[];
export declare const getTeamList: ({ length, readyList }: {
  length?: number | undefined;
  readyList?: number[] | undefined;
}) => {
  head: string;
  nick: string;
  readyType: number;
  readyDesc: string;
}[];
export declare const getScoreList: () => ({
  score: number;
  title: string;
  isWinner: number;
} | {
  score: string;
  title: string;
  isWinner: number;
})[];
export declare const getResultList: () => {
  name: string;
  num: string;
  isWinner: number;
}[];
export declare function showCustomPopup({ context, callback, cardStateMap, cardState, resultTypeMap, resultType, isNotSignUp }: Record<string, any>): void;
