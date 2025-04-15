// #ifdef H5
import { isNotInUni } from '../../common/utils/utils';
import { setCustomElements } from '../../common/vue3/adapter.js';
// #endif

// #ifdef H5
if (isNotInUni()) {
  setCustomElements([
    'uni-image',
  ], app);
}
// #endif
