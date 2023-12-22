const { insertDocChangeLog: commInsertDocChangeLog } = require('t-comm');

const DOC_CHANGE_LOG_PATH = './docs/changelog.md';
const SOURCE_CHANGE_LOG_PATH = './CHANGELOG.md';


function insertDocChangeLog() {
  commInsertDocChangeLog({
    changelogPath: SOURCE_CHANGE_LOG_PATH,
    docChangelogPath: DOC_CHANGE_LOG_PATH,
    packageJsonPath: './package.json',
  });
}

module.exports = { insertDocChangeLog };
