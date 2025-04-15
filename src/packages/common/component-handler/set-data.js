export function setData(dialog, data, func = 'setData') {
  if (!dialog) return;

  const setData = dialog.$vm?.[func] || dialog[func];
  if (typeof setData === 'function') {
    return setData(data);
  }
}

export function vmSet(dialog, ...args) {
  const vm = dialog.$vm || dialog;
  if (typeof vm.$set === 'function') {
    vm.$set(vm, ...args);
  } else {
    vm[args[0]] = args[1];
  }
}


export function getVMInVue3(context) {
  if (!context) return;

  let result;
  // #ifdef H5
  result = context;
  // #endif
  // #ifndef H5
  result = context.$vm;
  // #endif
  return result;
}
