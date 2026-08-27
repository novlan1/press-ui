import { selectComponent } from '../functional-component';

// #ifdef H5
import { initH5Instance } from './h5-handler';
// #endif

import { setData } from './set-data';


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

  const message = `The ${options.selector} node is not found, please confirm whether the selector and context are correct`;
  console.warn(message);

  return Promise.reject(message);
}
