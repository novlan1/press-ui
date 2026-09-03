const PRESETS = ['error', 'search', 'default', 'network'];

function imageUrl(image) {
  if (PRESETS.indexOf(image) !== -1) {
    return `https://cdn.uwayfly.com/press/img/empty-image-${image}.png`;
  }

  return image;
}
export default { imageUrl };

