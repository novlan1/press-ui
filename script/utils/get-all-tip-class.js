const fs = require('fs');

const VUE_PATH = 'src/packages/press-q-r-code-popup/press-q-r-code-popup.vue';
// const VUE_PATH = 'src/packages/press-hor-schedule-manage/right-bar.vue';
// const reg = /(?!class=")(?=tip)([^"]+)/g;
const reg = /(?<=class=")([^"=/?).]+?)(?=")/g;

function main() {
  const content = fs.readFileSync(VUE_PATH, {
    encoding: 'utf-8',
  });

  let res = content.match(reg);
  res = Array.from(new Set(res));
  console.log('[res]', res);
}

main();
