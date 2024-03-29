const path = require('path');
const { writeEnvFromRainbow, execCommand } = require('t-comm');

const { DEPLOY_CONFIG } = require('../../config/deploy-config');

const envPath = require('./env-file')();
const curEnvPath = path.resolve(__dirname, '../../.env.local');

async function main() {
  await writeEnvFromRainbow({
    envPath,
    rainbowKey: DEPLOY_CONFIG.ENV_RAINBOW_KEY,
    envName: 'Default',
    groupName: 'devops',
  });

  execCommand(`cp ${envPath} ${curEnvPath}`, __dirname, 'inherit');
}

main();
