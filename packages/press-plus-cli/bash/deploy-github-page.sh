#!/bin/sh

set -x


# repoName=press-ui-demo
# userName=novlan1
token=$1
repoName=$2
userName=$3
email=$4
targetDir=$5
commitMessage=$6


if [[ -z "$commitMessage" ]];then
 commitMessage="docs: build docs"
fi;

echo $commitMessage;
# # npm run build:h5
cd $targetDir
git init


git config user.email "$email"
git config user.name "$userName"

git remote remove origin
git remote add origin https://${token}@github.com/${userName}/${repoName}

git add .
git commit -m"$commitMessage"
git checkout -b docs
git push origin docs --force