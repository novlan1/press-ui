import axios from 'axios';

const SIG_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__tim_demo_user_sig.json';


export function getUserSig(userId) {
  return new Promise((resolve, reject) => {
    axios.get(SIG_URL).then((resp) => {
      console.log('[getWhiteList] resp: ', resp.data);
      resolve(resp.data?.[userId] || '');
    })
      .catch((err) => {
        console.log('[getWhiteList] err: ', err);
        reject(err);
      });
  });
}
