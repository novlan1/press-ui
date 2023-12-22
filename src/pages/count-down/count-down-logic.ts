import { storageUtil } from '../../utils/index';
import { timeStampFormat } from 'src/packages/common/format/time';

function getId() {
  return `${parseInt(`${Math.random() * 10000000000}`, 10)}`;
}

const STORAGE_EKY = {
  PRESS_COUNT_DOWN_LIST: 'PRESS_COUNT_DOWN_LIST',
  PRESS_UID: 'PRESS_UID',
};

let curUId = '';
getCurUId();

function getCurUId() {
  curUId =  storageUtil.get(STORAGE_EKY.PRESS_UID) || '';

  if (!curUId) {
    curUId = getId();
    storageUtil.set(STORAGE_EKY.PRESS_UID, curUId);
  }
  return curUId;
}


function getLocalList() {
  let list = storageUtil.get(STORAGE_EKY.PRESS_COUNT_DOWN_LIST) || '[]';
  try {
    list = JSON.parse(list);
  } catch (err) {}
  return list;
}

function setLocalList(list: Array<any>) {
  storageUtil.set(
    STORAGE_EKY.PRESS_COUNT_DOWN_LIST,
    JSON.stringify(list),
  );
}

export function addCountDown({
  name,
  time,
}: {
  name: string;
  time: any;
}) {
  const list = getLocalList();

  const id = getId();
  list.push({ name, time, id });

  storageUtil.set(
    STORAGE_EKY.PRESS_COUNT_DOWN_LIST,
    JSON.stringify(list),
  );
  return Promise.resolve();
}

const getZeroTimeStamp = (timeStamp: number) => new Date(timeStampFormat(timeStamp, 'yyyy-MM-dd')).getTime();

function getLeftDay(timeStamp: number) {
  const res = (getZeroTimeStamp(timeStamp) - getZeroTimeStamp(Date.now()))
   / (24 * 60 * 60 * 1000);
  return Math.floor(res);
}

export function getCountDownList() {
  const list = getLocalList();
  const parsed = list.map((item: {name: string; time: number}) => {
    const { name, time } = item;

    const value = getLeftDay(time);
    return {

      ...item,
      title: name,
      label: timeStampFormat(time, 'yyyy.MM.dd'),
      value: `还有 ${value} 天`,
    };
  });

  return parsed;
}

export function deleteCountDown(id: string) {
  const list = getLocalList();
  const newList = list.filter((item: { id: string }) => item.id != id);

  setLocalList(newList);
  return Promise.resolve();
}

export function getCountDownDetail(id: string) {
  const list = getLocalList();

  const found = list.find((item: { id: string }) => item.id == id) || {};

  return Promise.resolve(found);
}

export function modifyCountDown(id: string, form: Record<string, any>) {
  const list = getLocalList();

  const newList = list.map((item: {id: string}) => {
    if (item.id == id) {
      return {
        ...item,
        ...form,
      };
    }
    return item;
  });

  setLocalList(newList);
  return Promise.resolve();
}

