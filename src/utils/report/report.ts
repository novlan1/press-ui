// #ifndef H5
import Aegis from 'aegis-mp-sdk';
// #endif


let reportAegis = () => {};


// #ifndef H5
reportAegis = () => {
  new Aegis({
    id: '8lay6FojYWb0GGEV2n', // 项目ID，即上报id
    uin: '', // 用户唯一 ID（可选）
    reportApiSpeed: true, // 接口测速
    hostUrl: 'https://rumt-zh.com'
  });
};
// #endif


export { reportAegis };
