export const getComponentNameFromUrl = (url = '') => {
  if (!url.includes('?')) {
    const list = url.split('/');
    return list[list.length - 1];
  }
  const reg = /comp=([^&?]+)/;
  const match = url.match(reg);
  return match?.[1] || '';
};
