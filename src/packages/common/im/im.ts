import type { IChatSDK, EventCallback } from './types';
import {
  login,
  init,
  waitReady,
  watchIMEvent,
  setEventListener,
  sendMessage,
  getMessageList,
  TIM,
} from './helper';

import type TIM_TYPE from 'tim-js-sdk/tim-js';

export class IM {
  tim: IChatSDK;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  TIM: typeof TIM_TYPE;

  constructor({
    appId,
    logLevel = 0,
  }: {
    appId: string;
    logLevel?: number
  }) {
    this.tim = this.init(appId, logLevel);
    this.TIM = TIM;
  }

  get isReady() {
    return this.tim.isReady || false;
  }

  set isReady(value) {
    this.tim.updateReadyStatus(!!value);
  }

  get isOnline() {
    return this.tim.isOnline || false;
  }

  set isOnline(value) {
    this.tim.updateOnlineStatus(!!value);
  }

  init(appId: string, logLevel: number) {
    const tim = init(appId, logLevel);
    watchIMEvent({
      tim,
    });
    return tim;
  }

  waitReady() {
    return waitReady(this.tim);
  }

  setEventListener(type: string, cb: EventCallback) {
    setEventListener(type, cb);
  }

  setReceivedMessagesListener(cb: EventCallback) {
    this.setEventListener(this.TIM.EVENT.MESSAGE_RECEIVED, cb);
  }

  setKickedOutListener(cb: EventCallback) {
    this.setEventListener(this.TIM.EVENT.KICKED_OUT, cb);
  }

  setReadyListener(cb: EventCallback) {
    this.setEventListener(this.TIM.EVENT.SDK_READY, cb);
  }

  setConversationUpdateListener(cb: EventCallback) {
    this.setEventListener(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, cb);
  }

  setUnreadMsgCountUpdatedListener(cb: EventCallback) {
    this.setEventListener(this.TIM.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, cb);
  }

  innerLogin({
    userId,
    userSig,
  }: {
    userId: string;
    userSig: string;
  }) {
    this.tim.updateUserId(userId);
    this.tim.updateUserSig(userSig);

    return login({
      userId,
      userSig,
      tim: this.tim,
    });
  }

  innerLogout() {
    return this.tim.logout();
  }

  async sendMessage({ to, text = '' }: { to: string; text?: string; }) {
    const { tim } = this;
    const { isOnline, userId, userSig } = tim;

    if (!isOnline && userId && userSig) {
      await login({ userId, userSig, tim });
    }
    await waitReady(tim);

    return await sendMessage({
      tim,
      to,
      text,
    });
  }

  getMessageList({
    id,
    // count = 15,
    nextMsgId,
  }: {
    id: string;
    nextMsgId: string;
  }) {
    return getMessageList({
      conversationId: id,
      // count,
      nextMsgId,
      tim: this.tim,
    });
  }

  deleteConversation(id: string) {
    return this.tim.deleteConversation(id);
  }

  // 将所有会话的未读消息全部设置为已读
  sendAllMegRead() {
    return this.tim.setAllMessageRead({
      scope: TIM.TYPES.READ_ALL_MSG,
    });
  }

  // 将某会话下所有未读消息已读上报
  setMessageRead(id: string) {
    return this.tim.setMessageRead({ conversationID: id });
  }

  // 修改个人标配资料
  async updateMyProfile(profile: Record<string, any>) {
    await waitReady(this.tim);
    return this.tim.updateMyProfile(profile);
  }

  // 获取全量的会话列表
  getConversationList() {
    return this.tim.getConversationList();
  }
}

// export const IMHandler = new IM({ appId: 1400800161 });
