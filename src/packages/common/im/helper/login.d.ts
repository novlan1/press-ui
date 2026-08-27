import { IChatSDK } from '../types';
export declare function login({ userId, userSig, tim }: {
  userId: string;
  userSig: string;
  tim: IChatSDK;
}): Promise<any>;
