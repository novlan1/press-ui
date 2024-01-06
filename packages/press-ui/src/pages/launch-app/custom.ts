import {
  showPopupCell,
} from 'src/packages/press-popup-cell/demo-helper/helper';


export function showCustomPopup({
  context,
  callback,
  params = {},
}: {
  context: any;
  callback: any;
  params: any;
}) {
  showPopupCell({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: 'Use Scheme',
        type: 'switch',
        open: params.isUseSchemeParams,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, {
              isUseSchemeParams: !params.isUseSchemeParams,
            });
          }
        },
      },
      {
        label: 'Open Market',
        type: 'switch',
        open: params.openMarket,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, {
              openMarket: !params.openMarket,
            });
          }
        },
      },
      {
        label: 'Redirect',
        type: 'switch',
        open: params.needRedirect,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, {
              needRedirect: !params.needRedirect,
            });
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
