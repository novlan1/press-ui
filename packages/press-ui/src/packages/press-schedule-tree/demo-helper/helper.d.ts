export declare const DEFAULT_TEAM_NUMBER = 64;
export declare const MOCK_DATA_META: {
  DEFAULT_AVATAR: string;
  DEFAULT_NAME: string;
};
export declare const STATUS_MAP: {
  PREVIEW: string;
  PREVIEW_CUSTOM_SCHE: string;
  NOT_START: string;
  PLAYING: string;
  PLAYING_WITH_CHANNELS: string;
  ENDED: string;
};
export declare const STATUS_TITLE_MAP: {
  [x: string]: string;
};
export declare const STATUS_SCHE_MAP: {
  [x: string]: {
    isPreview: number;
    realStatus: number;
    curBo?: undefined;
    boType?: undefined;
    isWeChatLiving?: undefined;
  } | {
    realStatus: number;
    isPreview?: undefined;
    curBo?: undefined;
    boType?: undefined;
    isWeChatLiving?: undefined;
  } | {
    realStatus: number;
    curBo: number;
    boType: number;
    isPreview?: undefined;
    isWeChatLiving?: undefined;
  } | {
    realStatus: number;
    isWeChatLiving: boolean;
    curBo: number;
    boType: number;
    isPreview?: undefined;
  };
};
export declare const STATUS_LIST: {
  label: string;
  value: string;
}[];
export declare const TEAM_LIST: {
  label: string;
  value: number;
}[];
export declare const TEAM_MAP: Record<string, any>;
export declare const GROUP_TYPE_MAP: {
  KNOCK_OUT: {
    name: string;
    title: string;
  };
  CYCLE: {
    name: string;
    title: string;
  };
  DOUBLE_FAIL_LOSER: {
    name: string;
    title: string;
  };
};
export declare const GROUP_TYPE_LIST: {
  label: string;
  value: string;
}[];
