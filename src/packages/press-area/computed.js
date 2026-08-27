import { fetchData } from 'press-ui/common/utils/fetch-data';

const AREA_DATA_URL = 'https://tip-components-1251917893.file.myqcloud.com/rb/front-open-config__match__default__area_data.json';

function displayColumns(columns, columnsNum) {
  return columns.slice(0, +columnsNum);
}

export default {
  displayColumns,
};

export function getAreaData() {
  return fetchData(AREA_DATA_URL);
}
