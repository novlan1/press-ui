export function setData(dialog: any, data: any, func = 'setData') {
  if (!dialog) return;

  const setData = dialog.$vm?.[func] || dialog[func];
  if (typeof setData === 'function') {
    return setData(data);
  }
}

export function vmSet(dialog: any, ...args: Array<any>) {
  const vm = dialog.$vm || dialog;
  vm.$set(vm, ...args);
}
