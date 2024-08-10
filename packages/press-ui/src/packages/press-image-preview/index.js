import { showFunctionalComponent } from '../common/functional-component/index';
// #ifdef H5
import { initH5Instance } from '../common/component-handler/h5-handler';
import PressImageView from './press-image-preview.vue';
// #endif
const DIALOG_ID = 'pressImagePreview';


export function imagePreview(options) {
  let dialog;
  // #ifdef H5
  if (!options.selector) {
    dialog = initH5Instance(PressImageView, DIALOG_ID);
    dialog.mode = 'functional';
  }
  // #endif

  return showFunctionalComponent({
    ...options,
    dialog,
    show: true,
    showFunction: 'showImagePreview',
  });
}

export const imagePreviewHandler = imagePreview;
