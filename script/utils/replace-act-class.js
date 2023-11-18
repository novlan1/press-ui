const fs = require('fs');
const { replaceAllPolyfill } = require('t-comm');

replaceAllPolyfill();


const ACT_CSS_PATH = 'src/packages/press-q-r-code-popup/css';
const ACT_VUE_PATH = 'src/packages/press-q-r-code-popup/press-q-r-code-popup.vue';

const PREFIX = 'press__';

const TIP_CLASS_MAP = {
  popup: 'tip-match-bottom-popup-wrap',
  mask: 'tip-match-mask',
  'mask--fade-in': 'tip-match-fade-in',
  'mask--fade-out': 'tip-match-fade-out',

  content: 'tip-match-popup-content',
  'content--bottom-enter': 'tip-match-bottom-enter',
  'content--bottom-leave': 'tip-match-bottom-leave',

  'title-wrap': 'tip-match-popup-title-wrap',
  'title-line': 'tip-match-popup-title-line',
  back: 'tip-match-popup-back',
  title: 'tip-match-popup-title',
  close: 'tip-match-popup-close',
  'qr-code': 'tip-match-wx-code',
  save: 'tip-match-code-save',
  tip: 'tip-match-code-tip',
};


const reversedTipClass = Object.keys(TIP_CLASS_MAP).reduce((acc, key) => {
  acc[TIP_CLASS_MAP[key]] = key;
  return acc;
}, {});


function main() {
  const dir = fs.readdirSync(ACT_CSS_PATH, {
    encoding: 'utf-8',
  });
  // console.log('dir', dir);

  dir.forEach((item) => {
    replaceScss(`${ACT_CSS_PATH}/${item}`);
  });
  replaceVue(ACT_VUE_PATH);
}


function replaceScss(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  // if (!content.includes('.tip')) return;
  let newContent = content;

  Object.keys(TIP_CLASS_MAP).forEach((key) => {
    const tipClass = `${TIP_CLASS_MAP[key]}`;
    const pressClass = `${PREFIX}${key}`;

    newContent = newContent
      .replaceAll(`\\.${tipClass} `, `.${pressClass} `)
      .replaceAll(`\\.${tipClass},`, `.${pressClass},`)
      .replaceAll(`\\.${tipClass}:`, `.${pressClass}:`)
      .replaceAll(`\\.${tipClass}\\>`, `.${pressClass}>`)
      .replaceAll(`\\.${tipClass}\\.`, `.${pressClass}.`);
  });


  fs.writeFileSync(filePath, newContent, {
    encoding: 'utf-8',
  });
}

function replaceVue(filePath) {
  const content = fs.readFileSync(filePath, {
    encoding: 'utf-8',
  });
  // if (!content.includes('tip')) return;
  let newContent = content;
  const reg = /(class=")([^"]+)/g;

  newContent = newContent.replace(reg, (a, b, target) => {
    console.log('target', target);
    const classList = target.split(' ');
    console.log('classList', classList);
    const pressClass = classList.map(item => reversedTipClass[item]).filter(item => item)
      .map(item => `'${item}'`)
      .join();
    console.log('pressClass', pressClass);
    if (pressClass) {
      return `:class="[getActClass(${pressClass})]`;
    }
    return a;
  });

  // VUE_TIP_CLASS_LIST.forEach((key) => {
  //   if (!Array.isArray(key)) {
  //     key = [key];
  //   }
  //   const tipClass = key.join(' ');
  //   const pressClass = key
  //     .map(item => reversedTipClass[item])
  //     .map(item => `'${item}'`)
  //     .join();

  //   const tipClasses = `class="${tipClass}"`;

  //   const pressClasses = `:class="[getActClass(${pressClass})]"`;
  //   newContent = newContent.replaceAll(tipClasses, pressClasses);
  // });

  fs.writeFileSync(filePath, newContent, {
    encoding: 'utf-8',
  });
}

main();
