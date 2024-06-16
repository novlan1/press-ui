export declare function isSchEnd(scheGroup: Record<string, any>): boolean;
export declare function isSchPlaying(realStatus: number, isNotStart: boolean): boolean;
export declare function isScheNotStart(realStatus: number): boolean;
/**
 * 获取未开始的不同文案
 *
 * 未开始=人满开赛
 * 未开始=待管理员开赛+上场中
 * 未开始=10/30 19:00开赛+上场中
 *
 * 人满开赛=上场中=已开赛、10人未准备
 *
 * 区分点就是，开赛前/开赛后
 *
 */
export declare function getReadyInfoDesc({ roundInfo, scheGroup }: {
  roundInfo?: {} | undefined;
  scheGroup?: {} | undefined;
}): any;
/**
 * 获取开赛方式描述
 */
export declare function getStartBattleTypeDesc(roundInfo: Record<string, any>): any;
