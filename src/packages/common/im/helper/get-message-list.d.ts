import { IChatSDK } from '../types';
export declare function getMessageList({ conversationId, nextMsgId, tim }: {
  conversationId: string;
  count?: number;
  nextMsgId?: string;
  tim: IChatSDK;
}): Promise<any>;
