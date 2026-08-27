/**
 * 验证电子邮箱格式
 */
declare function email(value: string): boolean;
/**
* 验证手机格式
*/
declare function mobile(value: string): boolean;
/**
* 验证URL格式
*/
declare function url(value: string): boolean;
/**
* 验证日期格式
*/
declare function date(value: any): boolean;
/**
* 验证ISO类型的日期格式
*/
declare function dateISO(value: string): boolean;
/**
* 验证十进制数字
*/
declare function number(value: string): boolean;
/**
* 验证字符串
*/
declare function string(value: any): boolean;
/**
* 验证整数
*/
declare function digits(value: any): boolean;
/**
* 验证身份证号码
*/
declare function idCard(value: any): boolean;
/**
* 是否车牌号
*/
declare function carNo(value: any): boolean;
/**
* 金额,只允许2位小数
*/
declare function amount(value: any): boolean;
/**
* 中文
*/
declare function chinese(value: any): boolean;
/**
* 只能输入字母
*/
declare function letter(value: any): boolean;
/**
* 只能是字母或者数字
*/
declare function enOrNum(value: any): boolean;
/**
* 验证是否包含某个值
*/
declare function contains(value: string, param: string): boolean;
/**
* 验证一个值范围[min, max]
*/
declare function range(value: number, param: Array<number>): boolean;
/**
* 验证一个长度范围[min, max]
*/
declare function rangeLength(value: string, param: Array<number>): boolean;
/**
* 是否固定电话
*/
declare function landline(value: string): boolean;
/**
* 判断是否为空
*/
declare function empty(value: any): boolean;
/**
* 是否json字符串
*/
declare function jsonString(value: any): boolean;
/**
* 是否数组
*/
declare function array(value: any): boolean;
/**
* 是否对象
*/
declare function object(value: any): boolean;
/**
* 是否短信验证码
*/
declare function code(value: any, len?: number): boolean;
/**
* 是否函数方法
* @param {Object} value
*/
declare function func(value: any): boolean;
/**
* 是否promise对象
* @param {Object} value
*/
declare function promise(value: any): boolean;
/** 是否图片格式
* @param {Object} value
*/
declare function image(value: string): boolean;
/**
* 是否视频格式
* @param {Object} value
*/
declare function video(value: string): boolean;
/**
* 是否为正则对象
* @param {Object}
* @return {Boolean}
*/
declare function regExp(o: any): any;
export { email, mobile, url, date, dateISO, number, digits, idCard, carNo, amount,
  chinese, letter, enOrNum, contains, range, rangeLength, empty, jsonString, landline, object,
  array, code, func, promise, video, image, regExp, string };
