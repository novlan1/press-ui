import {
  addPostfixDateTimeFormatter,
  otherOptionDateTimeFormatter,
  fiveMinutesDateTimeFilter,
  otherOptionDateTimePickerFilter,
} from 'src/packages/press-datetime-picker/utils';
import { timeStampFormat } from 'src/packages/common/format/time';
import {
  showPopupCell,
  showPopupCell2,
  showDateTimePicker,
  DATE_TIME_PICKER_MAX_MIN_DATE,
  showPicker,
  getDefaultLatestReadyTime,
  getIntervalTimePickerList,
  BATCH_SET_MAP,
  onTimeStartTimeFormat,
  latestReadyTimeFormat,
} from './helper';

const local = {
  fixStartTime: parseInt(`${Date.now() / 1000}`, 10),
  fixLatestReadyTime: 0,
  curRoundType: 'winner',
};


function getPickerRoundList(batchRoundList) {
  return batchRoundList.map(item => ({
    label: item.round_name,
    value: item.round_id,
  }));
}


function getBatchRoundList(curRoundType) {
  const length = 10;
  return Array.from({ length }).map((_, index) => ({
    round_id: index + 1,
    round_name: `${curRoundType === 'winner' ? '胜者' : '败者'}组第${index + 1}轮`,
  }))
    .concat({
      round_id: length + 1,
      round_name: '决赛',
    });
}


function showBatchSetInnerPopup({
  valueList,
  pickerList,
  context,
  success,
  meta,
}) {
  function showInnerPopupAgain(options = {}) {
    showBatchSetInnerPopup({
      valueList,
      pickerList,
      context,
      success,
      meta,
      ...(options || {}),
    });
  }

  const cellList: any = [
    {
      label: '开始轮次',
      value: valueList[0].label,
      click: ({ context: popupContext }) => {
        popupContext.closeDialog();
        showPicker({
          context,
          title: '选择轮次',
          button: '确定',
          closeIcon: true,
          list: pickerList[0],
          current: valueList[0],

        }).then(({ item }: any) => {
          showInnerPopupAgain({
            valueList: [
              item,
              ...valueList.slice(1),
            ],
          });
        })
          .catch(() => {

          });
      },
    },
    {
      label: meta.timeLabel,
      value: valueList[1].label,
      click: ({ context: popupContext }) => {
        popupContext.closeDialog();
        showDateTimePicker({
          context,
          title: meta.timePickerTitle,
          closeIcon: true,
          button: '确认',
          datetimePicker: {
            minDate: meta.minDate,
            maxDate: meta.maxDate,
            value: valueList[1].value * 1000,
            formatter: meta.timePickerFormatter,
            filter: meta.timePickerFilter,
          },

        }).then(({ context: popupContext, value }: any) => {
          popupContext.closeDialog();
          const newValue = meta.timerPickerParser(value);
          showInnerPopupAgain({
            valueList: [
              valueList[0],
              {
                label: meta.timeFormat(newValue),
                value: newValue,
              },
              valueList[2],
            ],
          });
        })
          .catch(({ context: popupContext }) => {
            popupContext.closeDialog();
          });
      },
    },
  ];
  if (meta.showTab) {
    const tabList = [
      {
        label: '胜者组',
        value: 'winner',
      }, {
        label: '败者组',
        value: 'loser',
      },
    ];

    cellList.unshift({
      type: 'tab',
      label: '分组',
      active: local.curRoundType,
      tabList,
      click: (args) => {
        const { tabItem, item } = args;
        if (!tabItem) return;
        if (tabItem.value === item.active) return;
        cellList[0].active = tabItem.value;
        local.curRoundType = tabItem.value;
        const batchRoundList = getBatchRoundList(local.curRoundType);
        const round: Record<string, any> = batchRoundList[0] || {};

        pickerList[0] = getPickerRoundList(batchRoundList);

        valueList[0].label = round.round_name;
        valueList[0].value = round.round_id;
        cellList[1].value =  round.round_name;
        if (meta.type === BATCH_SET_MAP.LAST_READY_TIME) {
          const time = local.fixLatestReadyTime || getDefaultLatestReadyTime();
          valueList[1].label = latestReadyTimeFormat(time);
          valueList[1].value =  time;
          cellList[2].value = latestReadyTimeFormat(time);
        } else {
          const time = local.fixStartTime;
          valueList[1].label =  onTimeStartTimeFormat(time);
          valueList[1].value = time;
          cellList[2].value = onTimeStartTimeFormat(time);
        }
      },
    });
  }
  if (valueList[1].value) {
    cellList.push({
      label: '后续轮次间隔时间',
      value: valueList[2].label,
      click: ({ context: popupContext }) => {
        popupContext.closeDialog();
        showPicker({
          context,
          title: '后续轮次间隔时间',
          button: '确定',
          closeIcon: true,
          list: getIntervalTimePickerList(),
          current: {
            value: valueList[2].value,
          },
        }).then(({ item }: any) => {
          showInnerPopupAgain({
            valueList: [
              ...valueList.slice(0, 2),
              item,
            ],
          });
        })
          .catch(() => {
          });
      },
    });
  }


  showPopupCell2({
    context,
    title: meta.title,
    closeIcon: true,
    button: '确定',
    cellList,
  }).then(({ context: popupContext }: any) => {
    popupContext.closeDialog();
    if (typeof success === 'function') {
      success();
    }
  })
    .catch((err) => {
      console.log('[showBatchSetInnerPopup] err', err);
      const { context: popupContext } = err;
      popupContext.closeDialog();
    });
}

export function batchSet(context) {
  const batchRoundList = getBatchRoundList(local.curRoundType);
  const roundList = getPickerRoundList(batchRoundList);
  const round: Record<string, any> = batchRoundList[0];
  const success = () => {
    context.onGTip('设置成功');
  };

  showPopupCell({
    context,
    bottomButton: '取消',
    showTitle: false,
    arrowIcon: true,
    cellList: [
      {
        label: '批量设置定时开赛',
        type: 'button',
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();

          const time = local.fixStartTime;

          showBatchSetInnerPopup({
            meta: {
              showTab: true,
              title: '批量设置定时开赛',
              timeLabel: '开赛时间',
              timePickerTitle: '定时开赛时间',
              timeFormat: onTimeStartTimeFormat,

              minDate: DATE_TIME_PICKER_MAX_MIN_DATE.ON_TIME_START.MIN,
              maxDate: DATE_TIME_PICKER_MAX_MIN_DATE.ON_TIME_START.MAX,
              timePickerFormatter: addPostfixDateTimeFormatter,
              timePickerFilter: fiveMinutesDateTimeFilter,
              timerPickerParser: value => parseInt(`${value / 1000}`, 10),
              type: BATCH_SET_MAP.ON_TIME_START,
            },
            success,
            valueList: [
              {
                label: round.round_name,
                value: round.round_id,
              },
              {
                label: onTimeStartTimeFormat(time),
                value: time,
              },
              {
                label: '60分钟',
                value: 60,
              },
            ],
            pickerList: [
              roundList,
            ],
            context,
          });
        },
      },
      {
        label: '批量设置截止上场时间',
        type: 'button',
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          const time = local.fixLatestReadyTime || getDefaultLatestReadyTime();

          showBatchSetInnerPopup({
            meta: {
              showTab: true,
              title: '批量设置截止上场时间',
              timeLabel: '选手截止上场时间',
              timePickerTitle: '自动弃权设置',
              timeFormat: latestReadyTimeFormat,

              minDate: DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MIN,
              maxDate: DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MAX,
              timePickerFormatter: (type, value, currentDate) => otherOptionDateTimeFormatter({
                type,
                value,
                minDate: DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MIN,
                currentDate,
              }),
              timePickerFilter: (type, options, currentDate) => otherOptionDateTimePickerFilter({
                type,
                options,
                currentDate,
              }),
              timerPickerParser: (value) => {
                const firstDate = timeStampFormat(DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MIN, 'yyyy');
                const formattedDate = timeStampFormat(value, 'yyyy');
                const isZero = formattedDate === firstDate;

                return isZero ? 0 : parseInt(`${new Date(value).getTime() / 1000}`, 10);
              },
              type: BATCH_SET_MAP.LAST_READY_TIME,
            },
            success,
            valueList: [
              {
                label: round.round_name,
                value: round.round_id,
              },
              {
                label: latestReadyTimeFormat(time),
                value: time,
              },
              {
                label: '60分钟',
                value: 60,
              },
            ],
            pickerList: [
              roundList,
            ],
            context,
          });
        },
      },
    ],
  }).then(() => {})
    .catch(({ context: popupContext }) => {
      popupContext.closeDialog();
    });
}
