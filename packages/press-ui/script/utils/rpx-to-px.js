const glob = require('glob');
const { writeFileSync, readFileSync } = require('t-comm');
const pattern = new RegExp('([0-9.]*[0-9]+)([\\s]*)(rpx)', 'g');

const factor = .5;
const unit = 'px';

function replaceContent(content) {
  if (!pattern.test(content)) {
    return;
  }
  let match = pattern.exec(content);
  const records = []; // eslint-disable-next-line no-cond-assign

  while (match) {
    const keyword = match[0];
    const number = parseFloat(match[1]);
    records.push({
      index: match.index,
      length: keyword.length,
      keyword,
      number,
    });
    match = pattern.exec(content);
  }

  if (records.length > 0) {
    let buffer = ''.concat(content);

    for (let i = 0, records1 = records; i < records1.length; i++) {
      const record = records1[i];
      let number = (record.number * factor).toFixed(2);

      if (+number == parseInt(number, 10)) {
        // 去掉无效的小数点，比如：28.00
        number = ''.concat(parseInt(number, 10));
      }

      buffer = buffer.replace(record.keyword, ''.concat(number).concat(unit));
    }

    return buffer;
  }

  return content;
}

function main() {
  const list = glob.sync('packages/press-ui/src/packages/**/*.?(vue|scss)');
  console.log('list', list);


  list.forEach((item) => {
    const content = readFileSync(item);
    const newContent = replaceContent(content);
    if (newContent) {
      console.log('Replace File', item);
      writeFileSync(item, newContent);
    }
  });
}

main();
