// #ifdef H5
import { isNotInUni } from '../utils/utils';
import { chooseFile } from './choose-file';
import { chooseImage } from './choose-image';
import { chooseVideo } from './choose-video';
// #endif


export function uniChooseFile({
  count,
  // sourceType,
  success,
  fail,
  type,
}) {
  // #ifdef H5
  if (isNotInUni()) {
    return chooseFile({
      count,
      sourceType: [],
      type,
      extension: ['*'],
      success,
    });
  }
  // #endif

  uni.chooseFile({
    count,
    type,
    success,
    fail,
  });
}


export function uniChooseImage({
  count,
  sourceType,
  sizeType,
  // type,
  success,
  fail,
}) {
  // #ifdef H5
  if (isNotInUni()) {
    return chooseImage({
      count,
      sourceType,
      extension: ['*'],
      success,
    });
  }
  // #endif

  uni.chooseImage({
    count,
    sourceType,
    sizeType,
    // type,
    success,
    fail,
  });
}


export function uniChooseVideo({
  sourceType,
  success,
  fail,

  compressed,
  maxDuration,
  camera,
}) {
  // #ifdef H5
  if (isNotInUni()) {
    return chooseVideo({
      sourceType,
      extension: ['*'],
      success,
    });
  }
  // #endif

  uni.chooseVideo({
    sourceType,
    // sizeType,
    // type,
    success,
    fail,

    compressed,
    maxDuration,
    camera,
  });
}
