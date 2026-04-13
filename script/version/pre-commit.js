/**
 * @description 发版前预提交检查脚本
 */
const {
  preCommit,
} = require('@plugin-light/cli/script/release/press/pre-commit');


function main() {
  preCommit(require('./config'));
}


main();

