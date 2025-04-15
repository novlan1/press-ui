export const commonProps = {
  // value: {
  //   type: String,
  //   default: '',
  // },
  placeholder: { type: String, default: '' },
  placeholderStyle: { type: String, default: '' },
  placeholderClass: { type: String, default: '' },
  disabled: Boolean,
  maxlength: {
    type: Number,
    default: -1,
  },
  cursorSpacing: {
    type: Number,
    default: 50,
  },
  autoFocus: Boolean,
  focus: Boolean,
  cursor: {
    type: Number,
    default: -1,
  },
  selectionStart: {
    type: Number,
    default: -1,
  },
  selectionEnd: {
    type: Number,
    default: -1,
  },
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  holdKeyboard: Boolean,
};

export const inputProps = {
  type: {
    type: String,
    default: 'text',
  },
  password: Boolean,
  confirmType: { type: String, default: '' },
  confirmHold: Boolean,
  alwaysEmbed: Boolean,
};

export const textareaProps = {
  autoHeight: Boolean,
  fixed: Boolean,
  showConfirmBar: {
    type: Boolean,
    default: true,
  },
  disableDefaultPadding: {
    type: Boolean,
    default: true,
  },
};
