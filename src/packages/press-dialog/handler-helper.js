export function addFunctionForDialog({
  Dialog,
  queue,
  currentOptions,
  defaultOptions,
  updateQueue,
  updateCurrentOptions,
}) {
  Dialog.alert = options => Dialog(options);
  Dialog.confirm = options => Dialog(Object.assign({ showCancelButton: true }, options));
  Dialog.close = () => {
    queue.forEach((dialog) => {
      dialog.close();
    });
    updateQueue?.([]);
  };
  Dialog.stopLoading = () => {
    queue.forEach((dialog) => {
      dialog.stopLoading();
    });
  };
  Dialog.currentOptions = currentOptions;
  Dialog.defaultOptions = defaultOptions;
  Dialog.setDefaultOptions = (options) => {
    const newCurrentOptions = Object.assign(Object.assign({}, currentOptions), options);
    updateCurrentOptions?.(newCurrentOptions);
    Dialog.currentOptions = newCurrentOptions;
  };
  Dialog.resetDefaultOptions = () => {
    const newCurrentOptions = Object.assign({}, defaultOptions);
    updateCurrentOptions?.(newCurrentOptions);
    Dialog.currentOptions = newCurrentOptions;
  };
  Dialog.resetDefaultOptions();
  return Dialog;
}
