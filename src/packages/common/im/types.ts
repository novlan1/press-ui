export interface IChatSDK {
  isOnline: boolean
  isReady: boolean

  userId: string;
  userSig: string;

  updateUserId: (userId: string) => void;
  updateUserSig: (userSig: string) => void;

  updateOnlineStatus: (status: boolean) => void;
  updateReadyStatus: (status: boolean) => void;

  deleteConversation: Function;
  setAllMessageRead: Function;
  setMessageRead: Function;
  updateMyProfile: Function;
  getConversationList: Function;
  logout: Function
  login: Function

  on: Function;
  setLogLevel: Function;
  getMessageList: Function;
}
