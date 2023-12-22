export function addFunctionForDialog({
  Dialog,
  queue,
  currentOptions,
  defaultOptions,
  updateQueue,
  updateCurrentOptions,
}: any) {
  Dialog.alert = (options: any) => Dialog(options);
  Dialog.confirm = (options: any) => Dialog(Object.assign({ showCancelButton: true }, options));
  Dialog.close = () => {
    queue.forEach((dialog: any) => {
      dialog.close();
    });
    updateQueue?.([]);
  };
  Dialog.stopLoading = () => {
    queue.forEach((dialog: any) => {
      dialog.stopLoading();
    });
  };
  Dialog.currentOptions = currentOptions;
  Dialog.defaultOptions = defaultOptions;
  Dialog.setDefaultOptions = (options: any) => {
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
