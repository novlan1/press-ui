export function parseData(data: Record<string, any>) {
  const { province_list: provObj = {}, city_list: cityObj = {} } = data || {};

  const res: Record<string, any> = {};
  const SPECIAL_NUMBER_MAP = {
    ALL: {
      value: '07',
      label: '全部',
    },
    OFFLINE: {
      value: '08',
      label: '线下',
    },
    ONLINE: {
      value: '09',
      label: '线上',
    },
  };
  const offlineNumber = SPECIAL_NUMBER_MAP.OFFLINE.value;

  res.city_list = Object.keys(provObj)
    .reduce((acc: Record<string, any>, item) => {
      const key = offlineNumber + item.slice(0, 4);
      acc[key] = provObj[item];
      return acc;
    }, {});

  res.province_list = Object.keys(SPECIAL_NUMBER_MAP)
    .reduce((acc: Record<string, any>, item) => {
      const value = SPECIAL_NUMBER_MAP[item as keyof typeof SPECIAL_NUMBER_MAP];
      acc[`${value.value}0000`] = value.label;
      return acc;
    }, {});

  res.county_list = Object.keys(cityObj)
    .reduce((acc: Record<string, any>, item) => {
      const key = offlineNumber + item.slice(0, 4);
      acc[key] = cityObj[item];
      return acc;
    }, {});

  return  res;
}
