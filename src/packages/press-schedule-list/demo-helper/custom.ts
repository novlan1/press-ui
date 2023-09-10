import {
  showPopupCellAndClose,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import {
  STATUS_MAP,
} from 'src/packages/press-schedule-tree/demo-helper/helper';
import { adminPopupCell, currentStatusPopupCell } from 'src/packages/press-schedule-tree/demo-helper/custom';

export const local = {
  status: STATUS_MAP.PREVIEW_CUSTOM_SCHE,
  isAdmin: false,
};

export function showCustomPopup({ context, callback }) {
  showPopupCellAndClose({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      currentStatusPopupCell({
        local,
        context,
        callback,
      }),
      adminPopupCell({
        local,
        context,
        callback,
      }),
    ],
  });
}
