type IOptions = Partial<{
  context: any;
  selector: string;

  images: string[];
  startPosition: number | string;
  transition: string;

  showIndex: boolean;
  asyncClose: boolean;

  customStyle: string;
  customClass: string;

  closeable: boolean;
  closeIcon:  string;
  closeIconPosition:  string;
  zIndex: number;
}>;


export declare function imagePreview(options: IOptions): any;

export const imagePreviewHandler: typeof imagePreview;
export const showImagePreview: typeof imagePreview;
