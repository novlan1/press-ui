/**
 * 将 1 列匹配赛，格式化为 2 列
 * @param scheList 赛程列表
 * @returns 新的赛程列表
 */
export function formatMatchAllScheList(scheList) {
  const anotherLine: Array<any> = [];
  const firstLine: Array<any> = [];

  if (!scheList.length) return [];

  scheList[0].forEach((item, index) => {
    if (index % 2 === 1) {
      anotherLine.push(item);
    } else {
      firstLine.push(item);
    }
  });

  if (firstLine.length !== anotherLine.length) {
    anotherLine.push({
      battleList: [{}],
      upScheGroup: {},
      hidden: true,
    });
  }

  const res = [firstLine, anotherLine];
  return res;
}
