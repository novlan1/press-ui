declare const TIP_MAP: {
  saveImage: string;
  saveImageSuccess: string;
  saveImageFail: string;
  saveImageFailOfAuth: string;
  authConfirmContent: string;
  authConfirmFailToast: string;
};
type IOptions = Record<keyof typeof TIP_MAP, string>;
export declare function saveMpImage(url: string, options?: Partial<IOptions>): void;
export {};
