import { IChatSDK } from '../types';
export declare function watchIMEvent({ tim }: any): void;
export declare function setEventListener(type: string, cb: (event: Event, tim: IChatSDK) => void): void;
