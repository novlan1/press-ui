export declare const ONE_YEAR_MIL_SECONDS: number;
export declare const QUARTER_BUFFER: number;
export declare const FUNCTIONAL_ID_MAP: {
  POPUP_CELL: string;
  POPUP_CELL_2: string;
  PICKER: string;
  DATE_TIME_PICKER: string;
};
export declare const BATCH_SET_MAP: {
  ON_TIME_START: string;
  LAST_READY_TIME: string;
};
export declare const DATE_TIME_PICKER_MAX_MIN_DATE: {
  ON_TIME_START: {
    MIN: number;
    MAX: number;
  };
  LATEST_READY: {
    MIN: number;
    MAX: number;
  };
};
export declare function showPopupCell(options?: any): Promise<any>;
export declare function showPopupCellAndClose(options?: any): void;
export declare function showPopupCell2(options?: any): Promise<any>;
export declare function showPicker(options?: any): Promise<unknown>;
export declare function showDateTimePicker(options?: any): Promise<unknown>;
export declare function getDefaultLatestReadyTime(): number;
export declare function getStartWayDesc(startBattleType: number | string, startTime: number): string;
export declare function getAutoQuitDesc(latestReadyTime?: number): string;
export declare function getIntervalTimePickerList(): {
  value: number | null;
  label: string;
}[];
export declare const PICKER_BO_LIST: {
  label: string;
  value: number;
}[];
export declare const BO_STR_LIST: string[];
export declare const PICKER_BAN_LIST: string[];
export declare const SELECT_BAN_LIST: {
  label: string;
  value: number;
}[];
export declare function latestReadyTimeFormat(value: number): string;
export declare function onTimeStartTimeFormat(value: number): string;
export type IPopupContext = {
  closeDialog: () => void;
};
export type IPopupCellClick = {
  context: IPopupContext;
};
