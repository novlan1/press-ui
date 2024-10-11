// 流水线发布时执行的脚本
const { execCommand, getPreReleaseVersion } = require('t-comm');
const { MANUAL_REVIEW_RESULT, versionType, repo, branch } = process.env;


function validate() {
  console.log('[MANUAL_REVIEW_RESULT]', MANUAL_REVIEW_RESULT);
  if (MANUAL_REVIEW_RESULT !== 'PROCESS') {
    console.error('[Error] Not Review');
    process.exit(1);
  }

  if (!versionType) {
    console.error('[Error] No Version Type');
    process.exit(1);
  }
}

function doCommand(command) {
  execCommand(command, process.cwd(), 'inherit');
}

function getVersionCommand(rawVersion) {
  if (['alpha', 'beta'].includes(rawVersion)) {
    const nextVersion = getPreReleaseVersion(rawVersion);
    return nextVersion;
  }
  if (['patch', 'minor', 'major'].includes(rawVersion)) {
    return rawVersion;
  }
  return rawVersion;
}


function main() {
  validate();

  doCommand('mkdir log || true');
  doCommand('pnpm i || pnpm install --no-frozen-lockfile');
  doCommand('npx husky install || true');

  const nextVersion = getVersionCommand(versionType);
  console.log('[nextVersion] ', nextVersion);

  doCommand(`npx standard-version --release-as ${nextVersion} -a --no-verify`);

  doCommand('git remote remove origin');
  doCommand(`git remote add origin git@git.a.com:${repo}.git`);
  doCommand(`git push origin ${branch}`);
  doCommand('git push origin --tags');

  console.log('nextVersion', nextVersion);
}


main();
