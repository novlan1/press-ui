
import { selectComponent } from '../functional-component';
import { setData } from './set-data';
// #ifdef H5
import { initH5Instance } from './h5-handler';
// #endif


function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}


export function initFunctionalDialog({
  options,
  currentOptions,
  dialogComponent,
  id,
}) {
  options = Object.assign(Object.assign({}, currentOptions), options);
  const context = options.context || getContext();
  let dialog = selectComponent(context, options.selector);

  delete options.context;
  delete options.selector;


  // #ifdef H5
  if (!dialog && dialogComponent) {
    dialog = initH5Instance(dialogComponent, id);
  }
  // #endif

  if (dialog) {
    const newOptions = {
      ...options,
    };


    setData(dialog, newOptions);
    const promise = setData(dialog, newOptions, 'showDialog');

    return promise.then(val => Promise.resolve(val))
      .catch(err => Promise.reject(err));
  }
  console.warn('The press-dialog node is not found, please confirm whether the selector and context are correct');
}
