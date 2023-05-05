const TLSSigAPIv2 = require('tls-sig-api-v2');
require('../utils/local-env')();

const APP_ID = 1400800161;
const EXPIRE_TIME = 12 * 30 * 24 * 60 *  60;

function genSig(account) {
  const api = new TLSSigAPIv2.Api(APP_ID, process.env.TIM_SECRET_KEY);
  const sig = api.genSig(account, EXPIRE_TIME);
  return sig;
}


function getAccountList() {
  return Array.from({ length: 20 }).map((item, index) => `Little ${index + 1}`);
}


/**
 * 生成tim的userSig，可复制结果到七彩石上
 */
function main() {
  const res = getAccountList().reduce((acc, account) => {
    const sig = genSig(account);
    acc[account] = sig;
    return acc;
  }, {});
  console.log('[main] res: \n', JSON.stringify(res));
}


main();
