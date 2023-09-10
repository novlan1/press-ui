<template>
  <span
    :style="{ color: color, 'font-size': iconSize }"
    class="uni-icons"
    :class="['uniui-'+type,customPrefix,customPrefix?type:'']"
    @click="_onClick"
  />
</template>

<script>
import icons from './icons.js';
import iconUrl from './uniicons.ttf';

const getVal = (val) => {
  const reg = /^[0-9]*$/g;
  return (typeof val === 'number' || reg.test(val)) ? `${val}px` : val;
};


// #ifdef APP-NVUE
const domModule = weex.requireModule('dom');
domModule.addRule('fontFace', {
  fontFamily: 'uniicons',
  src: `url('${iconUrl}')`,
});
// #endif


export default {
  name: 'UniIcons',
  props: {
    type: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#333333',
    },
    size: {
      type: [Number, String],
      default: 16,
    },
    customPrefix: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  data() {
    return {
      icons: icons.glyphs,
    };
  },
  computed: {
    unicode() {
      const code = this.icons.find(v => v.font_class === this.type);
      if (code) {
        return unescape(`%u${code.unicode}`);
      }
      return '';
    },
    iconSize() {
      return getVal(this.size);
    },
  },
  methods: {
    _onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import "./uniicons.css";
@font-face {
  font-family: uniicons;
  src: url("./uniicons.ttf") format("truetype");
}

/* #endif */
.uni-icons {
  font-family: uniicons;
  text-decoration: none;
  text-align: center;
}
</style>
