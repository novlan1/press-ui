const { hyphenate } = require('t-comm');

const COMP_PREFIX = 'press-';


// function hyphenate(str) {
//   const hyphenateRE = /\B([A-Z])/g;
//   return str.replace(hyphenateRE, '-$1').toLowerCase();
// }


function getFullCompName(name) {
  name = hyphenate(name);
  if (!name.startsWith(COMP_PREFIX)) {
    return `${COMP_PREFIX}${name}`;
  }
  return name;
}


function getPureCompName(name) {
  name = hyphenate(name);
  return name.replace(new RegExp(`^${COMP_PREFIX}`), '');
}


module.exports = {
  hyphenate,
  getFullCompName,
  getPureCompName,
};
