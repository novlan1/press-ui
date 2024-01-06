set -ex

SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)
cd $SHELL_FOLDER/../..
pwd


mkdir log || true
pnpm i || pnpm install --no-frozen-lockfile

# npm run release
npx husky install || true


if [[ $versionType == "patch" ]];then
 npx standard-version --release-as patch -a 
elif [[ $versionType == "minor" ]]; then
 npx standard-version --release-as minor -a 
elif [[ $versionType == "alpha" ]]; then
 npx standard-version --prerelease alpha -a 
elif [[ $versionType == "beta" ]]; then
 npx standard-version --prerelease beta -a 
fi;


if [[ -z $versionType ]];then
  echo empty;
else
  npm run version:tip
  # npx standard-version --release-as v1.0.28 -a 

  git remote remove origin
  git remote add origin git@git.a.com:${repo}.git
  git push origin ${branch}
  git push origin --tags
fi;


