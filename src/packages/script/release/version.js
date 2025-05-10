const { readFileSync, writeFileSync } = require('t-comm');


function getNewVersion({
  rootPackageJson,
}) {
  const pkg = readFileSync(rootPackageJson, true);
  return pkg.version;
}

function changeVersion({
  rootPackageJson,
  packageJson,
}) {
  const newVersion = getNewVersion({ rootPackageJson });

  const pkg = readFileSync(packageJson, true);
  console.log(`[VERSION] The new version is ${newVersion}`);
  pkg.version = newVersion;

  writeFileSync(packageJson, pkg, true);
  return newVersion;
}


function changeRootVersion({
  version,
  rootPackageJson,
}) {
  const content = readFileSync(rootPackageJson, true);
  content.version = version;
  writeFileSync(rootPackageJson, content, true);
}


module.exports = {
  changeVersion,
  changeRootVersion,
};
