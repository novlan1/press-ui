export declare function parseTimeData(time: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
export declare function parseFormat(format: string, timeData: Record<string, any>): string;
export declare function isSameSecond(time1: number, time2: number): boolean;
