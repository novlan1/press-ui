import {
  showPopupCellAndClose,
  showPicker,
} from '../../press-popup-cell/demo-helper/helper';


export const local = {
  pageSize: 20,
  total: 300,
  delay: 200,
  vertical: true,
  autoCheckScroller: true,
};

const PICKER_NUMBER_LIST = Array.from({ length: 5 })
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

const PICKER_NUMBER_MAP = PICKER_NUMBER_LIST
  .reduce((acc: Record<string, any>, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

const PICKER_DELAY_LIST = Array.from({ length: 1000 }).map((_, i) => ({
  label: `${(i + 1) * 100}ms`,
  value: (i + 1) * 100,
}));

const PICKER_DELAY_MAP = PICKER_DELAY_LIST
  .reduce((acc: Record<string, any>, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});


export function showCustomPopup({ context, callback }: any) {
  showPopupCellAndClose({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '每次加载数量',
        value: PICKER_NUMBER_MAP[local.pageSize],
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();

          showPicker({
            title: '每次加载数量',
            closeIcon: true,
            list: PICKER_NUMBER_LIST,
            current: {
              value: local.pageSize,
            },
          }).then(({ item }: any) => {
            local.pageSize = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changePageSize === 'function') {
              callback.changePageSize.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '列表总数',
        value: PICKER_NUMBER_MAP[local.total],
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();

          showPicker({
            title: '列表总数',
            closeIcon: true,
            list: PICKER_NUMBER_LIST,
            current: {
              value: local.total,
            },
          }).then(({ item }: any) => {
            local.total = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeTotal === 'function') {
              callback.changeTotal.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '数据请求时间',
        value: PICKER_DELAY_MAP[local.delay],
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();

          showPicker({
            title: '数据请求时间',
            closeIcon: true,
            list: PICKER_DELAY_LIST,
            current: {
              value: local.delay,
            },
          }).then(({ item }: any) => {
            local.delay = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeDelay === 'function') {
              callback.changeDelay.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '是否竖向滚动',
        type: 'switch',
        open: local.vertical,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          local.vertical = !local.vertical;
          context.onGTip('设置成功');

          if (typeof callback.changeDirection === 'function') {
            callback.changeDirection.call(context, local.vertical);
          }
        },
      },
      {
        label: '自动检测 Scroller',
        type: 'switch',
        open: local.autoCheckScroller,
        click: ({ context: popupContext }: any) => {
          popupContext.closeDialog();
          local.autoCheckScroller = !local.autoCheckScroller;
          // context.onGTip('设置成功');

          if (typeof callback.changeAutoCheckScroller === 'function') {
            callback.changeAutoCheckScroller.call(context, local.autoCheckScroller);
          }
        },
      },
    ],
  });
}
