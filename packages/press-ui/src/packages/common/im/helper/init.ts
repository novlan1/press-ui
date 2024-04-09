import { IChatSDK } from '../types';
import { TIM } from './tim';

const timMap: Record<string, any> = {};

export function init(appId: number, logLevel = 0) {
  if (timMap[appId]) return timMap[appId];
  const options = {
    SDKAppID: appId,
  };

  const tim: IChatSDK = TIM.create(options);
  timMap[appId] = tim;

  // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel https://web.sdk.qcloud.com/im/doc/zh-cn/SDK.html#setLogLevel 接口的说明</a>
  tim.setLogLevel(logLevel); // 普通级别，日志量较多，接入时建议使用
  // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

  const watchReadyCallback = function () {
    tim.updateReadyStatus?.(true);
  };

  tim.on(TIM.EVENT.SDK_READY, watchReadyCallback);

  tim.updateUserId = (userId: string) => {
    tim.userId = userId;
  };

  tim.updateUserSig = (userSig: string) => {
    tim.userSig = userSig;
  };

  tim.updateReadyStatus = (status) => {
    tim.isReady = !!status;
  };

  tim.updateOnlineStatus = (status) => {
    tim.isOnline = !!status;
  };

  return tim;
}
