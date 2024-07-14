import { isUrl, errorTip } from '../common/utils/validator';
import { timeStampFormat } from '../common/format/time';
import { priceFormat } from '../common/format/prize';

export default {
  computed: {
    // 经处理后需要显示的值
    value() {
      const {
        text,
        mode,
        format,
        href,
      } = this;
      // 价格类型
      if (mode === 'price') {
        // 如果text不为金额进行提示
        if (!/^\d+(\.\d+)?$/.test(text)) {
          errorTip('金额模式下，text参数需要为金额格式');
        }
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
        if (typeof format === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
        return priceFormat(text, 2);
      }
      if (mode === 'date') {
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
        if (typeof format === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format) {
          // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
          return timeStampFormat(text, format);
        }
        // 如果没有设置format，则设置为默认的时间格式化形式
        return timeStampFormat(text, 'yyyy-MM-dd');
      }
      if (mode === 'phone') {
        if (typeof format === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果 format 为 encrypt，则将手机号进行星号加密处理
          return `${text.substr(0, 3)}****${text.substr(7)}`;
        }
        return text;
      }
      if (mode === 'name') {
        // 判断是否合法的字符粗
        !(typeof (text) === 'string') && errorTip('姓名模式下，text参数需要为字符串格式');
        if (typeof format === 'function') {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果format为encrypt，则将姓名进行星号加密处理
          return this.formatName(text);
        }
        return text;
      }
      if (mode === 'link') {
        // 判断是否合法的字符粗
        !isUrl(href) && errorTip('超链接模式下，href参数需要为URL格式');
        return text;
      }
      return text;
    },
  },
  methods: {
    // 默认的姓名脱敏规则
    formatName(name) {
      let value = '';
      if (name.length === 2) {
        value = `${name.substr(0, 1)}*`;
      } else if (name.length > 2) {
        let char = '';
        for (let i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        value = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        value = name;
      }
      return value;
    },
  },
};
