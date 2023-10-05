import {
  showPopupCellAndClose,
  showPicker,
} from 'src/packages/press-popup-cell/demo-helper/helper';


export const getStepList = ({
  length = 9,
  playingIndex,
  curIndex = 2,
  isStage = false,
}) => Array.from({
  length,
}).map((_, index) => {
  const title = isStage ? `阶段${index + 1}` : `第${index + 1}局`;
  const time = isStage ? `1.${index * 2 + 1}-2.${index * 2 + 2}` : `7.${index + 1} 12:00`;

  return {
    time,
    title,
    isCurrent: curIndex === index,
    playing: playingIndex === index,
  };
});


export const getTeamList = ({
  length = 6,
  readyList = [],
}: {
  length?: number;
  readyList?: Array<number>;
}) => {
  const result = Array.from({ length }).map((_, index) => {
    let readyDesc = '';
    if (index !== length - 1) {
      if (readyList.indexOf(index) > -1) {
        readyDesc = '已准备';
      } else {
        readyDesc = '未准备';
      }
    }
    return {
      head: 'https://thirdqq.qlogo.cn/g?b=oidb&k=HFh953g22kPgQny1h7KITQ&kti=ZJJzkQAAAAE&s=640&t=1556998035',
      nick: '杨',
      readyType: readyList.indexOf(index) > -1 ? 1 : 2,
      readyDesc,
    };
  });

  return result;
};


export const getScoreList = () => [
  { score: 36, title: '第一局', isWinner: 1 },
  { score: 52, title: '第二局', isWinner: 2 },
  { score: '--', title: '第三局', isWinner: 3 },
  { score: '--', title: '第四局', isWinner: 3 },
  { score: '--', title: '第五局', isWinner: 3 },
  { score: 36, title: '第六局', isWinner: 1 },
];


export const getResultList = () => [
  {
    name: '总积分排名',
    num: '222',
    isWinner: 1,
  },
  {
    name: '单局积分(一/二/三)',
    num: '15/22/27',
    isWinner: 2,
  },
];


function getPickerOptions({
  label = '当前状态',
  value,
  context,
  statusList,
  current,
  callback,
  paramKey,
}) {
  return {
    label,
    value,
    click: ({ context: popupContext }) => {
      popupContext.closeDialog();

      showPicker({
        context,
        title: '当前状态',
        closeIcon: true,
        list: statusList,
        current: {
          value: current,
        },
      }).then(({ item }: any) => {
        context.onGTip('设置成功');

        if (typeof callback === 'function') {
          callback.call(context, {
            [paramKey]: item.value,
          });
        }
      })
        .catch(() => {});
    },
  };
}

export function showCustomPopup({
  context,
  callback,
  cardStateMap,
  cardState,
  resultTypeMap,
  resultType,
  isNotSignUp,
}) {
  const statusList = Object.keys(cardStateMap).map(item => ({
    label: item,
    value: item,
  }));

  const resultTypeList = Object.keys(resultTypeMap).map(item => ({
    label: item,
    value: item,
  }));

  showPopupCellAndClose({
    context,
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '是否未报名',
        type: 'switch',
        open: isNotSignUp,
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          context.onGTip('设置成功');

          if (typeof callback.changeParams === 'function') {
            callback.changeParams.call(context, {
              isNotSignUp: !isNotSignUp,
            });
          }
        },
      },
      getPickerOptions({
        label: '卡片状态',
        value: cardStateMap[cardState],
        context,
        statusList,
        current: cardState,
        callback: callback.changeParams,
        paramKey: 'cardState',
      }),
      getPickerOptions({
        label: '结果状态',
        value: resultTypeMap[resultType],
        context,
        statusList: resultTypeList,
        current: resultType,
        callback: callback.changeParams,
        paramKey: 'resultType',
      }),
    ],
  });
}
