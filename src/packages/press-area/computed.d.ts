declare function displayColumns(columns: Array<any>, columnsNum: number | string): any[];
declare const innerDefault: {
  displayColumns: typeof displayColumns;
};
export default innerDefault;

export type AreaItem = Record<string | number, string>;
export type AreaInfo = {
  province_list: AreaItem;
  city_list: AreaItem;
  county_list: AreaItem;
};

export declare function getAreaData(): Promise<AreaInfo>;
