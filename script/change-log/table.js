// 一次性任务，用于整理文档中 table 格式
const fs = require('fs');

const reg = /\|([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|/g;


const filePathList = [
  'src/packages/press-swiper/README.md',
];

// function formatPropsType(type) {
//   if (/(^[-]+$)|[\u4e00-\u9fa5]/.test(type)) {
//     return type;
//   }
//   return type.replace(/^_|_$/g, '').toLowerCase()
//     .replace(/^|$/g, '_');
// }
// function replaceFile(file) {
//   const data = fs.readFileSync(file, {
//     encoding: 'utf-8',
//   });

//   const resultData = data.replace(reg, (...props) => {
//     const strList = [
//       hyphenate(props[1].trim()),
//       props[2].trim(),
//       formatPropsType(props[3].trim()),
//       props[4].trim(),
//     ];
//     return `|${strList.join('|')}|`;
//   });

//   fs.writeFileSync(file, resultData, {
//     encoding: 'utf-8',
//   });
// }

function main() {
  for (const file of filePathList) {
    // replaceFile(file);
    sortMDTable(file, [1, 4, 2, 3]);
  }
}

main();

function sortMDTable(file, sortArray) {
  const data = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  const resultData = data.replace(reg, (...props) => {
    const strList = sortArray.map((sortItem) => {
      const tableItem = props[sortItem] || '';
      return tableItem.trim();
    });
    console.log('strList', strList);
    // const strList = [
    //   hyphenate(props[1].trim()),
    //   props[2].trim(),
    //   formatPropsType(props[3].trim()),
    //   props[4].trim(),
    // ];
    return `|${strList.join('|')}|`;
  });
  fs.writeFileSync(file, resultData, {
    encoding: 'utf-8',
  });
}
