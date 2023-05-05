const { execSync } = require('child_process');
const ENV_FILE = '.env.local';


require('dotenv').config({ path: ENV_FILE });

const token = process.env.GITHUB_TOKEN;

execSync(`sh script/publish-h5-demo.sh ${token}`, {
  stdio: 'inherit',
});

