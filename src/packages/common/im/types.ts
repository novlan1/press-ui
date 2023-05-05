import { ChatSDK } from 'tim-js-sdk';

export interface IChatSDK extends ChatSDK {
  isOnline: boolean
  isReady: boolean

  userId: string;
  userSig: string;

  updateUserId: (userId: string) => void;
  updateUserSig: (userSig: string) => void;

  updateOnlineStatus: (status: boolean) => void;
  updateReadyStatus: (status: boolean) => void;
}
