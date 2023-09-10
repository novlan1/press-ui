const { replaceAllPolyfill } = require('t-comm');
const { execSync } = require('child_process');
const fs = require('fs');
const DOC_CHANGE_LOG_PATH = './docs/changelog.md';
const SOURCE_CHANGE_LOG_PATH = './CHANGELOG.md';

replaceAllPolyfill();

function writeToJSON(file, data) {
  fs.writeFileSync(file, data, {
    encoding: 'utf-8',
  });
}

function readFile(file) {
  let res = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  try {
    res = JSON.parse(res);
  } catch (e) {}

  return res;
}

const replaceList = [
  {
    from: '🐛 Bug Fixes \\| Bug 修复',
    to: 'Bug Fixes 🐞',
  }, {
    from: '✨ Features \\| 新功能',
    to: 'Features 🎉',
  },
  {
    from: '✏️ Documentation \\| 文档',
    to: 'Documentation 📖',
  },
  {
    from: '♻️ Code Refactoring \\| 代码重构',
    to: 'Code Refactoring ♻️',
  },
  {
    from: '🚀 Chore \\| 构建/工程依赖/工具',
    to: 'Chore 🚀 ',
  },
  {
    from: '📦‍ Build System \\| 打包构建',
    to: 'Build System 📦‍',
  },
  {
    from: '✅ Tests \\| 测试',
    to: 'Tests ✅',
  },
  {
    from: '💄 Styles \\| 风格',
    to: 'Styles 💄',
  },
];

function replaceChangeLogKeywords(data = '') {
  let newData = data;
  for (const item of replaceList) {
    const { from, to } = item;
    newData = newData.replaceAll(from, to);
  }
  return newData;
}


function insetDocChangeLog() {
  const changeLog = readFile(SOURCE_CHANGE_LOG_PATH);
  const pkg = readFile('./package.json');
  const { version } = pkg;

  // version = '1.0.31';
  console.log('[version] ', version);
  if (!version) return;

  const reg = new RegExp(`(\\n[#]+\\s*\\[${version}\\].*?\\n)(?=[#]+\\s*\\[\\d+\\.\\d+\\.\\d+\\])`, 's');
  console.log('[reg]', reg);

  const match = changeLog.match(reg);
  console.log('[match]', match[1]);

  if (!match?.[1]) return;

  const docChangeLog = readFile(DOC_CHANGE_LOG_PATH);

  let newDocChangeLog = docChangeLog.replace(/(?=([#]{2,}))/, match[1]);
  newDocChangeLog = replaceChangeLogKeywords(newDocChangeLog);

  writeToJSON(DOC_CHANGE_LOG_PATH, newDocChangeLog);

  execSync('git add .', {
    stdio: 'inherit',
  });
}

module.exports = { insetDocChangeLog };


// insetDocChangeLog();
