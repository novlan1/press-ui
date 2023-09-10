import { showFunctionalComponent } from 'src/packages/common/functional-component/index';
import { timeStampFormat } from 'src/packages/common/format/time';


export const ONE_YEAR_MIL_SECONDS = 1000 * 60 * 60 * 24 * 365;
export const QUARTER_BUFFER = 15 * 60 * 1000;

export const FUNCTIONAL_ID_MAP = {
  POPUP_CELL: 'press-popup-cell-functional',
  POPUP_CELL_2: 'press-popup-cell-functional-2',
  PICKER: 'press-picker-functional',
  DATE_TIME_PICKER: 'press-datetime-picker-popup-functional',
};

export const BATCH_SET_MAP = {
  ON_TIME_START: 'ON_TIME_START',
  LAST_READY_TIME: 'LAST_READY_TIME',
};

export const DATE_TIME_PICKER_MAX_MIN_DATE = {
  ON_TIME_START: {
    MIN: Date.now(),
    MAX: Date.now() + ONE_YEAR_MIL_SECONDS,
  },
  LATEST_READY: {
    MIN: Date.now() - ONE_YEAR_MIL_SECONDS,
    MAX: Date.now() + ONE_YEAR_MIL_SECONDS,
  },
};


export function showPopupCell(options): Promise<any> {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL}`,
    ...options,
  });
}


export function showPopupCellAndClose(options) {
  showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL}`,
    ...options,
  }).then((resp: any) => {
    const { context: popupContext = {} } = resp || {};
    popupContext.closeDialog();
  })
    .catch((err) => {
      const { context: popupContext = {} } = err || {};
      popupContext.closeDialog();
    });
}


export function showPopupCell2(options): Promise<any> {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.POPUP_CELL_2}`,
    ...options,
  });
}


export function showPicker(options) {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.PICKER}`,
    ...options,
  });
}


export function showDateTimePicker(options) {
  return showFunctionalComponent({
    selector: `#${FUNCTIONAL_ID_MAP.DATE_TIME_PICKER}`,
    ...options,
  });
}


function getMinute(time) {
  return parseInt(`${time / 1000 / 60}`, 10);
}

export function getDefaultLatestReadyTime() {
  let time = Date.now() + QUARTER_BUFFER;
  while (getMinute(time) % 5 !== 0) {
    time +=  60 * 1000 ;
  }
  return  parseInt(`${time / 1000}`, 10);
}

export function getStartWayDesc(startBattleType, startTime) {
  let startWay = '';

  if (startBattleType == 1) {
    startWay = '人满开赛';
  } else if (startBattleType == 2) {
    startWay = '手动开赛';
  } else {
    startWay = timeStampFormat(startTime, 'M/d hh:mm开赛');
  }
  return startWay;
}


export function getAutoQuitDesc(latestReadyTime) {
  let res = '';

  if (!latestReadyTime) {
    res = '不启用';
  } else {
    res = timeStampFormat(latestReadyTime, 'M/d hh:mm');
  }
  return res;
}

export function getIntervalTimePickerList() {
  return Array.from({ length: 13 }).map((cur, index) => {
    if (index < 2) {
      return null;
    }
    return index * 5;
  })
    .filter(cur => cur)
    .map(cur => ({
      value: cur,
      label: `${cur}分钟`,
    }));
}


export const PICKER_BO_LIST = [
  { label: '一局胜负', value: 1 },
  { label: '三局两胜', value: 3 },
  { label: '五局三胜', value: 5 },
  { label: '七局四胜', value: 7 },
];
export const BO_STR_LIST = [
  '',
  '一局胜负',
  '',
  '三局两胜',
  '',
  '五局三胜',
  '',
  '七局四胜',
];

export const PICKER_BAN_LIST = [
  '各禁4英雄',
  '不禁用英雄',
  '',
  '各禁2英雄',
  '各禁3英雄',
];

export const SELECT_BAN_LIST = [
  { label: '不禁用英雄', value: 1 },
  { label: '各禁2英雄', value: 3 },
  { label: '各禁3英雄', value: 4 },
  { label: '各禁4英雄', value: 0 },
];

export function latestReadyTimeFormat(value) {
  if (!value) return '不启用';
  return timeStampFormat(value, 'M/d hh:mm 截止上场');
}

export function onTimeStartTimeFormat(value) {
  return timeStampFormat(value, 'M/d hh:mm');
}

