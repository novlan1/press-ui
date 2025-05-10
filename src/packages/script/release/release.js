const { execSync } = require('child_process');


const PRE_RELEASE_VERSION = /\d+\.\d+\.\d+-(\w+).\d+/;


function getPreReleaseTag(version) {
  const match = version.match(PRE_RELEASE_VERSION);
  if (!match || !match[1]) return '';
  return match[1];
}

function release({
  version,
  targetPackages,
}) {
  const publishTag = getPreReleaseTag(version);
  let publishScript = 'npm publish';
  if (publishTag) {
    publishScript = `npm publish --tag ${publishTag}`;
  }

  execSync(`cd ${targetPackages} && ${publishScript}`, {
    stdio: 'inherit',
  });
}


module.exports = {
  release,
};
