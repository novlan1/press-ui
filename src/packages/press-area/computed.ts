function displayColumns(columns: Array<any>, columnsNum: number | string) {
  return columns.slice(0, +columnsNum);
}

export default {
  displayColumns,
};
