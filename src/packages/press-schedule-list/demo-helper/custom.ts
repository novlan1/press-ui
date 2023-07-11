import {
  showPopupCell,
  showPicker,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import {
  STATUS_MAP,
  STATUS_TITLE_MAP,
  STATUS_LIST,
} from 'src/packages/press-schedule-tree/demo-helper/helper';


export const local = {
  status: STATUS_MAP.PREVIEW_CUSTOM_SCHE,
  isAdmin: false,
};

export function showCustomPopup({ context, callback }) {
  showPopupCell({
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '当前状态',
        value: STATUS_TITLE_MAP[local.status],
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();

          showPicker({
            title: '当前状态',
            closeIcon: true,
            list: STATUS_LIST,
            current: {
              value: local.status,
            },
          }).then(({ item }: any) => {
            local.status = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeStatus === 'function') {
              callback.changeStatus.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '是否为管理员',
        type: 'switch',
        open: local.isAdmin,
        click: ({ context: popupContext }) => {
          // if (value === undefined) return;
          popupContext.closeDialog();
          local.isAdmin = !local.isAdmin;
          context.onGTip('设置成功');

          if (typeof callback.changeAdmin === 'function') {
            callback.changeAdmin.call(context, local.isAdmin);
          }
        },
      },
    ],
  }).then((resp: any) => {
    const { context: popupContext = {} } = resp || {};
    popupContext.closeDialog();
  })
    .catch((err) => {
      const { context: popupContext = {} } = err || {};
      console.log('[showCustomPopup] err', err);
      popupContext.closeDialog();
    });
}
