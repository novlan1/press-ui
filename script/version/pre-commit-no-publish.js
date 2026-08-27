/**
 * @description preCommit 的「不发布」版本
 *
 * 与 @plugin-light/cli/script/release/press/pre-commit 的 preCommit 完全一致，
 * 唯一区别：不执行最后的 release()（即 npm publish）。
 *
 * 之所以复制而不是复用：上游 preCommit 把 publish 硬编码在流程末尾，
 * 没有暴露 skip 开关。这里保持步骤 1:1 对齐，便于上游升级时对照。
 */
const { execSync } = require('child_process');

const { insertDocChangeLog } = require('t-comm');

const {
  genPureReleaseDir,
  copyReadme,
} = require('@plugin-light/cli/script/release/press/utils/prepare');
const {
  changeVersion,
} = require('@plugin-light/cli/script/release/press/utils/version');


const REQUIRED_PATH_KEYS = [
  'ROOT_PACKAGE_JSON',
  'PACKAGE_JSON',
  'TARGET_ROOT',
  'TARGET_PACKAGES',
  'SOURCE_PACKAGES',
  'SOURCE_README',
  'TARGET_README',
  'SOURCE_CHANGELOG',
  'TARGET_CHANGELOG',
  'DOC_TARGET_CHANGELOG',
];


function preCommitWithoutPublish(config) {
  const {
    PROJECT_ROOT,
    PATH_MAP,
    TO_DELETE_FILES,
  } = config;

  if (!PROJECT_ROOT || !PATH_MAP || !TO_DELETE_FILES) {
    throw new Error('config is not complete');
  }
  const missing = REQUIRED_PATH_KEYS.filter(key => !PATH_MAP[key]);
  if (missing.length) {
    throw new Error(`config is not complete, missing PATH_MAP: ${missing.join(', ')}`);
  }

  // 1. 把根 package.json 的新版本号同步到 src/packages/package.json
  const version = changeVersion({
    rootPackageJson: PATH_MAP.ROOT_PACKAGE_JSON,
    packageJson: PATH_MAP.PACKAGE_JSON,
  });

  // 2. 生成纯净的发布产物目录 log/press-ui/components
  genPureReleaseDir({
    targetRoot: PATH_MAP.TARGET_ROOT,
    targetPackages: PATH_MAP.TARGET_PACKAGES,
    sourcePackages: PATH_MAP.SOURCE_PACKAGES,
    toDeleteFiles: TO_DELETE_FILES,
  });

  // 3. 拷贝 README / CHANGELOG 到产物目录
  copyReadme({
    sourceReadme: PATH_MAP.SOURCE_README,
    targetReadme: PATH_MAP.TARGET_README,
    sourceChangelog: PATH_MAP.SOURCE_CHANGELOG,
    targetChangelog: PATH_MAP.TARGET_CHANGELOG,
  });

  // 4. 把本次 CHANGELOG 增量写进文档站
  insertDocChangeLog({
    changelogPath: PATH_MAP.SOURCE_CHANGELOG,
    docChangelogPath: PATH_MAP.DOC_TARGET_CHANGELOG,
    packageJsonPath: PATH_MAP.PACKAGE_JSON,
  });

  // 5. git add（standard-version 随后会把这些改动一起 commit + 打 tag）
  execSync('git add .', {
    stdio: 'inherit',
    cwd: PROJECT_ROOT,
  });

  // 6. 【差异点】不执行 release()（npm publish），交由手动步骤完成
  console.log(`\n✅ [Step 1 完成] 版本 ${version} 的产物已就绪，未发布 npm。`);
  console.log('👉 下一步（手动带 OTP 发布）：');
  console.log('   pnpm release:step2 -- <6位OTP验证码>\n');

  return version;
}


module.exports = {
  preCommitWithoutPublish,
};
