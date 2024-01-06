/**
 * @module tools/XSSFilter
 * @description 特殊字符转义
 */

const XSSFilter = {
  HtmlAttributeEncode: (str: string) => str,
};

/**
 * 过滤xss相关字符，包括`<`,`>`,`&`,`"`,`'`,`=`,`\``
 * @param {string} sStr
 * @returns 过滤后的文本
 * @example
 * import { XSSFilter } from 'src/common;
 * const res =  XSSFilter('<script>alert("msg")</script>') // &lt;script&gt;alert(&quot;msg&quot;)&lt;/script&gt;
 */
//  html属性编码：对需要出现在HTML属性里的不信任输入进行编码
//  注意:
//  (1)该函数不适用于属性为一个URL地址的编码.这些标记包括:a/img/frame/iframe/script/xml/embed/object...
//  属性包括:href/src/lowsrc/dynsrc/background/...
//  (2)该函数不适用于属性名为 style="[Un-trusted input]" 的编码
XSSFilter.HtmlAttributeEncode = function (sStr) {
  let str = sStr;
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  str = str.replace(/=/g, '&#61;');
  str = str.replace(/`/g, '&#96;');
  return str;
};

export default XSSFilter;
