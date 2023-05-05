const { execSync } = require('child_process');
const ENV_FILE = '.env.local';


require('dotenv').config({ path: ENV_FILE });

const sourceDir = 'docs/.vuepress/dist';
// const targetDir = '/usr/share/nginx/html/press-ui';
const targetDir = '/root/html/press-ui';
const hostName = process.env.HOST_NAME;
const hostPwd =  process.env.HOST_PWD;

execSync(`sh script/publish.sh ${sourceDir} ${targetDir} ${hostName} ${hostPwd}`, {
  stdio: 'inherit',
});
