const PRESETS = ['error', 'search', 'default', 'network'];

function imageUrl(image) {
  if (PRESETS.indexOf(image) !== -1) {
    return `https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fempty-image-${image}.png`;
  }

  return image;
}
export default { imageUrl };

