const fs = require('fs');

const { replaceAllPolyfill } = require('t-comm');

replaceAllPolyfill();


const ACT_CSS_PATH = 'src/packages/press-act-select-award/css';
const ACT_VUE_PATH = 'src/packages/press-act-select-award/press-act-select-award.vue';

const PREFIX = 'press__';

const TIP_CLASS_MAP = {
  cover: 'tip-comp-cover',

  dialog: 'tip-comp-dialog',
  'dialog--select': 'tip-comp-dialog-select',

  close: 'tip-comp-dialog--close',

  title: 'tip-comp-dialog--title',
  'title--select': 'tip-comp-dialog--reward-title',

  content: 'tip-comp-dialog--reward-content',

  'award-list': 'tip-comp-select-reword-list',
  'award-item': 'tip-comp-select-reword-item',

  left: 'item-left',
  box: 'tip-comp-select-box',
  image: 'tip-comp-select-image',
  'info-wrap': 'tip-comp-info-container',
  name: 'tip-comp-select-name',
  tip: 'tip-comp-stock-num',
  right: 'item-right',
  'select-button': 'select-button',

  bottom: 'item-bottom',
  buttons: 'tip-comp-dialog--btn-cont',

  btn: 'tip-comp-dialog--btn',
  'btn--close': 'tip-comp-btn-close',
  'btn--maxlarge-primary': 'tip-comp-btn-maxlarge-primary',
  'btn--disabled': 'tip-comp-btn-disabled',
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
