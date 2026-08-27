export const makeImageToBase64 = (url: string) => new Promise((resolve) => {
  const canvas = document.createElement('canvas');
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.referrerPolicy = 'no-referrer';
  image.onload = () => {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);

    console.log('canvas.width', canvas.width);
    console.log('canvas.height', canvas.height);

    resolve(canvas.toDataURL());
  };
  image.src = url;
});


export const makeSvgToBlobUrl = (svgStr: string) => {
  // svg MIME type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const svgBlob = new Blob([svgStr], {
    type: 'image/svg+xml',
  });
  return URL.createObjectURL(svgBlob);
};
