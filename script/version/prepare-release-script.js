/**
 * @description 准备发版脚本，执行发版前的预处理
 */
const {
  prepareRelease,
} = require('@plugin-light/cli/script/release/press/prepare-release');


function main() {
  prepareRelease(require('./config'));
}


main();

