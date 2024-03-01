import {
  showPopupCellAndClose,
  showPicker,
} from '../../press-popup-cell/demo-helper/helper';

export const local = {
  pageTotal: 30,
  current: 2,
  expand: false,
};


const PAGE_LIST = Array.from({ length: 4 })
  .map((_, i) => 10 ** i)
  .reduce((acc: Array<any>, item) => {
    for (let i = 1;i < 10;i++) {
      acc.push(item * i);
    }

    return acc;
  }, [])
  .map(item => ({
    label: item,
    value: item,
  }));


export function showCustomPopup({
  context,
  callback,
  pageTotal,
  current,
  isHor,
}: any) {
  showPopupCellAndClose({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '页面数',
        value: pageTotal,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();

          showPicker({
            title: '页面数',
            closeIcon: true,
            list: PAGE_LIST,
            current: {
              value: pageTotal,
            },
          }).then(({ item }: any) => {
            local.pageTotal = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changePageTotal === 'function') {
              callback.changePageTotal.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '当前页',
        value: current,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();

          showPicker({
            title: '当前页',
            closeIcon: true,
            list: PAGE_LIST.filter(item => item.value <= pageTotal),
            current: {
              value: current,
            },
          }).then(({ item }: any) => {
            local.current = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeCurrent === 'function') {
              callback.changeCurrent.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '是否为Hor模式',
        type: 'switch',
        open: isHor,
        click: ({ context: popupContext }: any) => {
          // if (value === undefined) return;
          popupContext.closeDialog();
          // local.expand = !local.expand;
          context.onGTip('设置成功');

          if (typeof callback.changeHor === 'function') {
            callback.changeHor.call(context, !isHor);
          }
        },
      },
    ],
  });
}
