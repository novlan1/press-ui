const { execCommand, localPublish } = require('t-comm');

const ENV_FILE = require('../env/env-file')();

const PUBLISH_OPTIONS =  {
  port: '3005',
  method: 'POST',
  path: '/web-publish/publish',
};


function tExecCommand(command, root, stdio) {
  console.log('[Doing]', command);
  execCommand(command, root, stdio);
}


function main() {
  require('dotenv').config({ path: ENV_FILE });
  tExecCommand('npx cross-env PUBLISH_PATH=/tip/press-ui/press-ui/ vuepress build docs', process.cwd(), 'inherit');
  tExecCommand('tar -cvf press-ui-docs.tar ./*', 'docs/.vuepress/dist', 'inherit');

  const host = process.env.LOCAL_PUBLISH_HOST;
  console.log('[host]', host);

  localPublish({
    ...PUBLISH_OPTIONS,
    host,

    fileTar: 'docs/.vuepress/dist/press-ui-docs.tar',
    fileDir: 'docs/.vuepress/dist',
  });
}

main();
