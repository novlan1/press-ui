import { showFunctionalComponent } from 'src/packages/common/functional-component/index';

export function imagePreview(options) {
  return showFunctionalComponent({
    ...options,
    show: true,
    showFunction: 'showImagePreview',
  });
}
