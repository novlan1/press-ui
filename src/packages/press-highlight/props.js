export const HIGHLIGHT_PROPS = {
  sourceString: {
    type: String,
    default: '',
  },
  keywords: {
    type: [String, Array],
    default: '',
  },

  autoEscape: {
    type: Boolean,
    default: true,
  },
  caseSensitive: {
    type: Boolean,
    default: false,
  },

  tag: {
    type: String,
    default: 'div',
  },
  highlightTag: {
    type: String,
    default: 'span',
  },
  unhighlightTag: {
    type: String,
    default: 'span',
  },

  highlightClass: {
    type: String,
    default: '',
  },
  unhighlightClass: {
    type: String,
    default: '',
  },
};
