const { execCommand } = require('t-comm');
const ENV_FILE = '.env.local';

function tExecCommand(command, root, stdio) {
  console.log('[Doing]', command);
  execCommand(command, root, stdio);
}


function main() {
  require('dotenv').config({ path: ENV_FILE });

  const sourceDir = 'docs/.vuepress/dist';
  const targetDir = '/root/html/press-ui';
  const hostName = process.env.HOST_NAME;
  const hostPwd =  process.env.HOST_PWD;

  tExecCommand(`npx t-comm publish -s ${sourceDir} \
  -t ${targetDir} \
  -n ${hostName} \
  -p ${hostPwd}
  `, process.cwd(), 'inherit');
}

main();
