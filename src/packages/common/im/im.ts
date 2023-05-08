import { IChatSDK } from './types';
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

// #ifdef H5
import TIM_TYPE from 'tim-js-sdk/tim-js';
// #endif

export class IM {
  tim: IChatSDK;

  // #ifdef H5
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TIM: typeof TIM_TYPE;
  // #endif

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

  init(appId, logLevel) {
    const tim = init(appId, logLevel);
    watchIMEvent({
      tim,
    });
    return tim;
  }

  setEventListener(type, cb) {
    setEventListener(type, cb);
  }

  setReceivedMessagesListener(cb) {
    this.setEventListener(this.TIM.EVENT.MESSAGE_RECEIVED, cb);
  }

  setKickedOutListener(cb) {
    this.setEventListener(this.TIM.EVENT.KICKED_OUT, cb);
  }

  setReadyListener(cb) {
    this.setEventListener(this.TIM.EVENT.SDK_READY, cb);
  }

  setConversationUpdateListener(cb) {
    this.setEventListener(this.TIM.EVENT.CONVERSATION_LIST_UPDATED, cb);
  }

  setUnreadMsgCountUpdatedListener(cb) {
    this.setEventListener(this.TIM.EVENT.TOTAL_UNREAD_MESSAGE_COUNT_UPDATED, cb);
  }

  innerLogin({
    userId,
    userSig,
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

  async sendMessage({ to, text = '' }) {
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
  }) {
    return getMessageList({
      conversationId: id,
      // count,
      nextMsgId,
      tim: this.tim,
    });
  }

  deleteConversation(id) {
    return this.tim.deleteConversation(id);
  }

  // 将所有会话的未读消息全部设置为已读
  sendAllMegRead() {
    return this.tim.setAllMessageRead({
      scope: TIM.TYPES.READ_ALL_MSG,
    });
  }

  // 将某会话下所有未读消息已读上报
  setMessageRead(id) {
    return this.tim.setMessageRead({ conversationID: id });
  }

  // 修改个人标配资料
  updateMyProfile(profile) {
    return this.tim.updateMyProfile(profile);
  }

  // 获取全量的会话列表
  getConversationList() {
    return this.tim.getConversationList();
  }
}

// export const IMHandler = new IM({ appId: 1400800161 });
