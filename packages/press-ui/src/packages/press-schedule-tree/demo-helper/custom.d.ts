export declare const local: {
  teamNumber: number;
  status: string;
  isAdmin: boolean;
  groupType: string;
  showError: boolean;
};
export declare function adminPopupCell({ local, context, callback }: Record<string, any>): {
  label: string;
  type: string;
  open: any;
  click: ({ context: popupContext }: any) => void;
};
export declare function currentStatusPopupCell({ local, context, callback }: Record<string, any>): {
  label: string;
  value: string;
  click: ({ context: popupContext }: any) => void;
};
export declare function showCustomPopup({ context, callback }: any): void;
