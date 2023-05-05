const path = require('path');
// const childProcess = require('child_process');
const fs = require('fs');

/**
 * Css样式处理
 */
function CssHandler() {
}


CssHandler.prototype.run = function run(src, dst) {
  const root = process.env.ROOT_DIR;
  console.log('root', root);
  console.log('dst', dst);
  const cssPaths = listAllCssFilesInDir(dst);
  console.log(`found ${cssPaths.length} css files`);

  for (const cssPath of cssPaths) {
    const fileContent = fs.readFileSync(cssPath, { encoding: 'utf-8' }).toString();

    let result = handleRem(fileContent);

    result = handleLabelNames(result);

    fs.writeFileSync(cssPath, result, { encoding: 'utf-8' });
  }

  return true;
};


function handleRem(content) {
  if (content == null) {
    return content;
  }
  const pattern = new RegExp('([0-9.]*[0-9]+)([\\s]*)(rem)', 'g');
  // const subStrs = content.match(pattern);
  // console.log('subStrs', subStrs)
  let match = undefined;
  // const output = '';
  // const hasMatch = false;

  const records = [];

  // eslint-disable-next-line no-cond-assign
  while (match = pattern.exec(content)) {
    // console.log('match', match);
    const keyword = match[0];
    const number = parseFloat(match[1]);
    records.push({
      index: match.index,
      length: keyword.length,
      keyword,
      number,
    });
    // const prefix = content.substr(0, match.index);
    // const suffix = content.substr(match.index + keyword.length);
    // output += prefix + (number * 100) + 'rpx' + suffix;
  }

  if (records.length > 0) {
    let buffer = `${content}`;
    for (const record of records) {
      let number = (record.number * 100).toFixed(2);
      if (number == parseInt(number)) {
        // 去掉无效的小数点，比如：28.00
        number = parseInt(number);
      }
      buffer = buffer.replace(record.keyword, `${number}rpx`);
    }
    return buffer;
  }

  return content;
}

/* 标签名转换 */
function handleLabelNames(content) {
  const labelNames = ['div', 'p', 'img', 'li', 'ul', 'ol', 'span', 'a', 'input'];
  let result = '';
  for (const label of labelNames) {
    result = replaceKeyword(content, label, `._${label}`);
  }
  return result;
}

function replaceKeyword(content, search, replace) {
  const pattern = new RegExp(`([\\s,:])(${search})([\\s,:])`, 'g');

  const subStrs = content.split(pattern);
  // console.log('subStrs', subStrs)
  let result = '';
  if (subStrs) {
    for (const tmp of subStrs) {
      // console.log(`tmp='${tmp}', search='${search}',  tmp===search: ${tmp===search}`);
      if (tmp === search) {
        // console.log('result1=', result)
        // console.log('append', replace);
        result += replace;
        // console.log('result2=', result)
      } else {
        result += tmp;
      }
    }
    return result;
  }
  return content;
}

function listAllCssFilesInDir(dir) {
  const result = [];
  const files = fs.readdirSync(dir);
  for (const item of files) {
    if (item === 'node_modules') {
      continue;
    }
    const tmpPath = path.join(dir, item);
    if (fs.statSync(tmpPath).isDirectory()) {
      const tmpFiles = listAllCssFilesInDir(tmpPath);
      result.push(...tmpFiles);
    } else if (item.endsWith('.css')
            || item.endsWith('.scss')
            || item.endsWith('.less')) {
      result.push(tmpPath);
    }
  }
  return result;
}

CssHandler.handleRem = handleRem;
CssHandler.handleLabelNames = handleLabelNames;

module.exports = CssHandler;
