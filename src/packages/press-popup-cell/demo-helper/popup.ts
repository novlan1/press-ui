
import {
  addPostfixDateTimeFormatter,
  otherOptionDateTimeFormatter,
  fiveMinutesDateTimeFilter,
  otherOptionDateTimePickerFilter,
} from 'src/packages/press-datetime-picker/utils';
import { timeStampFormat } from 'src/packages/common/format/time';
import {
  showPopupCell,
  getStartWayDesc,
  showPopupCell2,
  showDateTimePicker,
  DATE_TIME_PICKER_MAX_MIN_DATE,
  getAutoQuitDesc,
  showPicker,
  BO_STR_LIST,
  PICKER_BO_LIST,
  PICKER_BAN_LIST,
  SELECT_BAN_LIST,
} from './helper';

const local = {
  startBattleType: 1,
  fixStartTime: parseInt(`${Date.now() / 1000}`, 10),
  fixLatestReadyTime: 0,
  boType: 1,
  bpType: 0,
};


const clickStartBattleType = ({ context, type }) => {
  local.startBattleType = type;
  context.onGTip('设置成功');
};


export function startMatchSet(context) {
  showPopupCell({
    context,
    title: '开赛设置',
    closeIcon: true,
    cellList: [
      {
        label: '开赛方式',
        value: getStartWayDesc(local.startBattleType, local.fixStartTime),
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();


          showPopupCell2({
            context,
            title: '开赛方式',
            closeIcon: true,
            cellList: [
              {
                label: '人满开赛',
                description: '参赛双方满10人准备就绪即可比赛。',
                type: 'checkbox',
                checked: local.startBattleType === 1,
                click: ({ context: popupContext }) => {
                  popupContext.closeDialog();
                  clickStartBattleType({ type: 1, context });
                },
              },
              {
                label: '手动开赛',
                description: '管理员手动点击开赛，选手才能进行比赛。',
                type: 'checkbox',
                checked: local.startBattleType === 2,
                click: ({ context: popupContext }) => {
                  popupContext.closeDialog();
                  clickStartBattleType({ type: 2, context });
                },
              },
              {
                label: '定时开赛',
                description: [
                  {
                    content: '本轮「32进16」将于',
                  }, {
                    content: timeStampFormat(local.fixStartTime, 'M月d日 hh:mm'),
                    light: true,
                    click: (err) => {
                      const { context: popupContext } = err;
                      console.log('err', err);
                      popupContext.closeDialog();

                      showDateTimePicker({
                        context,
                        title: '定时开赛时间',
                        button: '确认',
                        closeIcon: true,
                        datetimePicker: {
                          minDate: DATE_TIME_PICKER_MAX_MIN_DATE.ON_TIME_START.MIN,
                          maxDate: DATE_TIME_PICKER_MAX_MIN_DATE.ON_TIME_START.MAX,
                          value: local.fixStartTime * 1000,
                          immediateCheck: true,
                          formatter: addPostfixDateTimeFormatter,
                          filter: fiveMinutesDateTimeFilter,
                        },
                      })
                        .then(({ value, context: popupContext }: any) => {
                          popupContext.closeDialog();
                          local.fixStartTime = parseInt(`${value / 1000}`, 10);
                          clickStartBattleType({ type: 3, context });

                          const showTIme = timeStampFormat(value, 'yyyy-MM-dd hh:mm:ss');
                          console.log('[confirm] value', value, new Date(value));
                          context.onGTip(`设置成功 ${showTIme}`, 3000);
                        })
                        .catch((err) => {
                          const { context: popupContext } = err;
                          console.log('err', err);
                          popupContext.closeDialog();
                        });
                    },
                  },
                  {
                    content: '定时开赛。',
                  },
                ],
                type: 'checkbox',
                checked: local.startBattleType === 3,
                click: ({ context: popupContext }) => {
                  popupContext.closeDialog();
                  clickStartBattleType({ type: 3, context });
                },
              },
            ],
            tip: '创建比赛后，可按比赛轮次精确设置。',
          }).then(() => {})
            .catch((err) => {
              console.log('err', err);
              const { context: popupContext } = err;
              popupContext.closeDialog();
            });
        },
      },
      {
        label: '选手截止上场时间',
        value: getAutoQuitDesc(local.fixLatestReadyTime),
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          const currentDate = local.fixLatestReadyTime === 0
            ? new Date() : new Date(local.fixLatestReadyTime * 1000);
          const minDate = DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MIN;
          const maxDate =  DATE_TIME_PICKER_MAX_MIN_DATE.LATEST_READY.MAX;

          showDateTimePicker({
            context,
            title: '自动弃权设置',
            button: '确认',
            closeIcon: true,
            datetimePicker: {
              minDate,
              maxDate,
              value: currentDate.getTime(),
              immediateCheck: true,

              filter: (type, options, currentDate) => otherOptionDateTimePickerFilter({
                type,
                options,
                currentDate,
              }),
              formatter: (type, value, currentDate) => otherOptionDateTimeFormatter({
                type,
                value,
                currentDate,
                minDate,
              }),

              input: () => {},
            },
          }).then(({ value, context: popupContext }: any) => {
            popupContext.closeDialog();

            const firstDate = timeStampFormat(new Date(minDate).getTime(), 'yyyy');
            const formattedDate = timeStampFormat(value, 'yyyy');
            const isZero = formattedDate === firstDate;
            const showTIme = timeStampFormat(value, 'yyyy-MM-dd hh:mm:ss');

            local.fixLatestReadyTime = isZero ? 0 : parseInt(`${new Date(value).getTime() / 1000}`, 10);

            console.log('[confirm] value', value, new Date(value));
            context.onGTip(`设置成功 ${showTIme}`, 3000);
          })
            .catch((err) => {
              const { context: popupContext } = err;
              console.log('[showDateTimePicker] err', err);
              popupContext.closeDialog();
            });
        },
      },
    ],
  }).then(() => {})
    .catch((err) => {
      const { context: popupContext = {} } = err || {};
      console.log('[startMatchSet] err', err);
      popupContext.closeDialog();
    });
}

export function battleSet(context) {
  showPopupCell({
    context,
    title: '对局设置',
    closeIcon: true,
    cellList: [
      {
        label: '决胜方式',
        value: BO_STR_LIST[local.boType],
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          showPicker({
            context,
            title: '决胜方式',
            closeIcon: true,
            list: PICKER_BO_LIST,
            current: {
              label: BO_STR_LIST[local.boType],
              value: local.boType,
            },
          }).then(({ item }: any) => {
            local.boType  = item.value;
            context.onGTip('设置成功');
          })
            .catch(() => {

            });
        },
      },
      {
        label: 'Ban位',
        value: PICKER_BAN_LIST[local.bpType],
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();

          showPicker({
            context,
            title: 'Ban位设置',
            closeIcon: true,
            list: SELECT_BAN_LIST,
            current: {
              value: local.bpType,
            },
          }).then(({ item: bpItem }: any) => {
            local.bpType = bpItem.value;
            context.onGTip('设置成功');
          })
            .catch(() => {

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
      console.log('[battleSet] err', err);
      popupContext.closeDialog();
    });
}

