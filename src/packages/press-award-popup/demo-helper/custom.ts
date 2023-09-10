import {
  showPopupCellAndClose,
} from 'src/packages/press-popup-cell/demo-helper/helper';


export const local = {
  empty: false,
  isHor: false,
};

export function showCustomPopup({ context, callback }) {
  showPopupCellAndClose({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '是否为空',
        type: 'switch',
        open: local.empty,
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          local.empty = !local.empty;
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, local);
          }
        },
      },
      {
        label: '是否为横版',
        type: 'switch',
        open: local.isHor,
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          local.isHor = !local.isHor;
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, local);
          }
        },
      },
    ],
  });
}
