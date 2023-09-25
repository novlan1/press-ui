export function getHighLightHtml(name = '', searchInput = '', highlightColor = '#1181d7') {
  if (!searchInput) {
    return name;
  }
  const inputStr = searchInput
    .replace(/([|+*?[\](){}^$|])/g, '\\$1');

  const nameHtml = name.replace(new RegExp(`(${inputStr}+)`, 'g'), (a, b) => `<span style="color: ${highlightColor};">${b}</span>`);
  return nameHtml;
}
