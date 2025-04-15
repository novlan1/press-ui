import { hasOwn } from '../common/utils/object-base';

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;
/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */
export default function template(string, ...args) {
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0];
  }

  if (!args?.hasOwnProperty) {
    args = {};
  }

  return string.replace(RE_NARGS, (match, prefix, i, index) => {
    if (string[index - 1] === '{'
        && string[index + match.length] === '}') {
      return i;
    }
    const result = hasOwn(args, i) ? args[i] : null;
    if (result === null || result === undefined) {
      return '';
    }

    return result;
  });
}

