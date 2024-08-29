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
