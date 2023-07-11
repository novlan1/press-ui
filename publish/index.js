#!/usr/bin/env node

const rootDir = process.cwd();
const fs = require('fs');
const path = require('path');
const { getIPAddress, getIPAddressStr } = require('./helper/ip-address');
const landunPublish = require('./helper/publish-landun.js');

const PUBLISH_BASH_FILE = path.resolve(__dirname, './publish.sh');
const ENV_DEV_HOST_NAME = 'DEV_HOST_NAME';
const ENV_DEV_HOST_PWD = 'DEV_HOST_PWD';

function getKeyValue(key, sourceline) {
  let result;
  let ma;
  const re = new RegExp(`${key}\\s*=\\s*(.*?)(\\s|$)`);
  for (const line of sourceline) {
    if (line.startsWith('#')) {
      // 忽略注释行
      continue;
    }
    ma = line.match(re);
    if (ma) {
      result = ma[1] || '';
      break;
    }
  }
  return result;
}

// 获取模块名称
function getAppConfigFromFilePath(key, filepath) {
  if (!fs.lstatSync(filepath)) {
    console.log('文件不存在:', filepath, '，请先创建文件');
    process.exit(1);
  }
  try {
    const sourceStr = fs.readFileSync(filepath, 'utf-8');
    const sourceLine = sourceStr.split('\n');
    return getKeyValue(key, sourceLine);
  } catch (e) {
    console.log('打开文件失败:', filepath);
    process.exit(1);
  }
}

function getDevPwd() {
  const envPath = path.join(rootDir, '.env.local');
  const devHostName = getAppConfigFromFilePath(ENV_DEV_HOST_NAME, envPath);
  const devHostPwd = getAppConfigFromFilePath(ENV_DEV_HOST_PWD, envPath);
  return {
    devHostName,
    devHostPwd,
  };
}


async function main() {
  const dir =  getAppConfigFromFilePath('VUE_APP_DIR', path.join(rootDir, '.env.local'));
  const author = getAppConfigFromFilePath('VUE_APP_AUTHOR', path.join(rootDir, '.env.local'));
  const publishPathProd = getAppConfigFromFilePath('VUE_APP_PATH_PROD', path.join(rootDir, '.env.local'));
  const publishPathTest = getAppConfigFromFilePath('VUE_APP_PATH_TEST', path.join(rootDir, '.env.local'));
  if (!dir || typeof dir !== 'string') {
    console.log('模块名称不正确，请检查.env.local');
    return 0;
  }
  if (!publishPathProd || typeof publishPathProd !== 'string') {
    console.log('正式环境发布路径不正确，请检查.env');
    return 0;
  }
  if (!publishPathTest || typeof publishPathTest !== 'string') {
    console.log('测试环境发布路径不正确，请检查.env');
    return 0;
  }
  console.log('准备发布模块:', dir);

  const moduleName = dir.split('/')[1];
  let desc = '';
  let env = 'web-test';
  const fileSrc = 'docs/.vuepress/dist/press-ui-docs.tar';
  const fileAll = 'docs/.vuepress/dist';
  const { spawnSync } = require('child_process');

  const args = process.argv.slice(2);
  const publishEnv = args[0];

  console.log('moduleName', moduleName);

  const shell = {};
  shell.runSync = function (cmd, args, options) {
    const shellResult = spawnSync(cmd, args, options);
    if (shellResult.status !== 0) {
      console.log(shellResult.stderr);
    }
    return shellResult;
  };

  // 禁止本机发布
  if ((getIPAddress().indexOf('10.45') === 0 || getIPAddress().indexOf('10.20') === 0) && publishEnv === 'prod') {
    console.log('禁止在本机发布');
    return;
  }

  if (publishEnv === 'prod') {
    desc = `${publishPathProd}/${moduleName}`;
    env = 'web-static';
  } else if (publishEnv === 'devcloud') {
    const {
      devHostName,
      devHostPwd,
    } = getDevPwd();
    if (!devHostName || !devHostPwd) {
      console.log('\x1B[31m%s\x1B[0m', `\nERROR: 没有找到有效的 ${ENV_DEV_HOST_NAME} 或 ${ENV_DEV_HOST_PWD}\n`);
      return;
    }

    if (moduleName === 'mobile-official-web') {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, '', devHostName, devHostPwd]);
    } else {
      shell.runSync('sh', [PUBLISH_BASH_FILE, fileAll, `${moduleName}/`, devHostName, devHostPwd], {
        stdio: 'inherit',
      });
    }
    return;
  } else {
    desc = `${publishPathTest}/${moduleName}`;
    env = 'web-test';
  }

  const fileDataInfo = [
    { urlKey: 'src', urlValue: fileSrc },
    { urlKey: 'des', urlValue: desc },
    { urlKey: 'env', urlValue: env },
    { urlKey: 'author', urlValue: author || '' },
  ];

  console.log({ fileDataInfo });

  const files = [{ urlKey: 'src', urlValue: fileSrc }];
  await landunPublish(fileDataInfo, files)
    .then((data) => {
      if (data.r == 0) {
        console.log(`发布成功........publish ${dir} to ${env} success........\n`);
      } else {
        console.log('发布失败', data);
      }
    })
    .catch((err) => {
      console.log('发布失败', err);
    });
}

module.exports = {
  main,
  getAppConfigFromFilePath,
  getKeyValue,
  getIPAddress,
  getIPAddressStr,
};
if (process.mainModule === module) {
  main();
}
