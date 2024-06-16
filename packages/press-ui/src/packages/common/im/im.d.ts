import type { IChatSDK, EventCallback } from './types';
import type TIM_TYPE from 'tim-js-sdk/tim-js';
export declare class IM {
  tim: IChatSDK;
  TIM: typeof TIM_TYPE;
  constructor({ appId, logLevel }: {
    appId: number;
    logLevel?: number;
  });
  get isReady(): boolean;
  set isReady(value: boolean);
  get isOnline(): boolean;
  set isOnline(value: boolean);
  init(appId: number, logLevel: number): any;
  waitReady(): Promise<unknown>;
  setEventListener(type: string, cb: EventCallback): void;
  setReceivedMessagesListener(cb: EventCallback): void;
  setKickedOutListener(cb: EventCallback): void;
  setReadyListener(cb: EventCallback): void;
  setConversationUpdateListener(cb: EventCallback): void;
  setUnreadMsgCountUpdatedListener(cb: EventCallback): void;
  innerLogin({ userId, userSig }: {
    userId: string;
    userSig: string;
  }): Promise<any>;
  innerLogout(): any;
  sendMessage({ to, text }: {
    to: string;
    text?: string;
  }): Promise<any>;
  getMessageList({ id, nextMsgId }: {
    id: string;
    nextMsgId: string;
  }): Promise<any>;
  deleteConversation(id: string): any;
  sendAllMegRead(): any;
  setMessageRead(id: string): any;
  updateMyProfile(profile: Record<string, any>): Promise<any>;
  getConversationList(): any;
}
