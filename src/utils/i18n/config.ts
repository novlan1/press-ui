export const LOCALE_NUMBER_MAP = {
  0: 'zh-CN',
  1: 'en-US',
};

export const LOCALE_STORAGE_KEY = 'LOCALE';

export const DEFAULT_LOCALE_NUMBER = 0;

export const NUMBER_LOCALE_MAP = reverseMap(LOCALE_NUMBER_MAP);

function reverseMap(map) {
  return Object.keys(map).reduce((acc, item) => {
    acc[map[item]] = item;
    return acc;
  }, {});
}
