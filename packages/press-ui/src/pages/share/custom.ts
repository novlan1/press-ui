import {
  showPopupCell,
  showPopupCell2,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import { SHARE_TYPE_LIST } from 't-comm/lib/share/config';


function showStrInGame(list: Array<any>) {
  if (list.length === SHARE_TYPE_LIST.length) {
    return '全部';
  }

  return SHARE_TYPE_LIST
    .filter(item => (list || []).indexOf(item.value) > -1)
    .map(item => item.label)
    .join(', ');
}


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
        label: '游戏内使用 open link',
        type: 'switch',
        open: params.useOpenLink,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, {
              useOpenLink: !params.useOpenLink,
            });
          }
        },
      },
      {
        label: '游戏内展示类型',
        value: showStrInGame(params.showTypeInGame),
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          showPopupCell2({
            context,
            title: '游戏内展示类型',
            button: '确定',
            closeIcon: true,
            asyncConfirm: ({ checkedIndexList }: any) => {
              console.log('[checkedIndexList]...', checkedIndexList);
              if (!checkedIndexList?.length) {
                context.onGTip('必须选择一种类型');
                return false;
              }
              return true;
            },
            cellList: SHARE_TYPE_LIST.map(item => ({
              ...item,
              checked: params.showTypeInGame.indexOf(item.value) > -1,
              type: 'checkbox',
            })),
          })
            .then((res) => {
              console.log('[showPopupCell2] res', res);
              res?.context?.closeDialog();
              context.onGTip('设置成功');

              if (typeof callback.changeParams === 'function') {
                const selectList =  SHARE_TYPE_LIST
                  .filter((_, index) => (res.checkedIndexList || []).indexOf(index) > -1)
                  .map(item => item.value);

                console.log('[selectList]: ', selectList);

                callback.changeParams.call(context, {
                  showTypeInGame: selectList,
                });
              }
            })
            .catch((err) => {
              console.log('[showPopupCell] err', err);
              err?.context?.closeDialog();
            });
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
