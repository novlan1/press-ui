function getServiceAddress() {
  return `${window.location.protocol}//${window.location.host}`;
}

export function getImageInfo({
  src,
  success,
}) {
  const img = new Image();
  const realPath = src;
  img.onload = function () {
    success({
      errMsg: 'getImageInfo:ok',
      width: img.naturalWidth,
      height: img.naturalHeight,
      path: realPath.indexOf('/') === 0 ? getServiceAddress() + realPath : realPath,
    });
  };

  img.onerror = function () {
    success({
      errMsg: 'getImageInfo:fail',
    });
  };
  img.src = src;
}
