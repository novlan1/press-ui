const { spawnSync } = require('child_process');
const os = require('os');
const platform = os.platform();

// 执行真实的命令
const realArgv = process.argv.slice(2);
let command = 'npm';
if (platform === 'win32') {
  command = 'npm.cmd';
}
spawnSync(command, ['run', ...realArgv], { stdio: 'inherit' });
