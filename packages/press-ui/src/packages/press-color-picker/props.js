import { DEFAULT_SYSTEM_SWATCH_COLORS } from './constants';

const props = {
  /** 是否开启透明通道 */
  enableAlpha: {
    type: Boolean,
    default: false,
  },
  /** 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效 */
  format: {
    type: String,
    default: 'RGB',
  },
  /** 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色 */
  swatchColors: {
    type: Array,
    default: () => (DEFAULT_SYSTEM_SWATCH_COLORS),
  },
  /** 颜色选择器类型。（base 表示仅展示系统预设内容; multiple 表示展示色板和系统预设内容。 */
  type: {
    type: String,
    default: 'base',
  },
  /** 色值 */
  value: {
    type: String,
    default: null,
  },
  /** 色值，非受控属性 */
  defaultValue: {
    type: String,
    default: '',
  },
  /** 是否展示颜色选择条右侧的颜色预览区域 */
  showPreview: {
    type: Boolean,
    default: false,
  },
};

export default props;
