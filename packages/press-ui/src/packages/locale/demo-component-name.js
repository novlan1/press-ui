export const getComponentNameFromUrl = (url = '', route = '') => {
  if (!url.includes('comp=')) {
    const list = route.split('/');
    return list[list.length - 1];
  }
  const reg = /comp=([^&?]+)/;
  const match = url.match(reg);
  return match?.[1] || '';
};
