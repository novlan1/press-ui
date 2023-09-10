<template>
  <span
    :style="{ color: color, 'font-size': iconSize }"
    class="iconfont"
    :class="['icon-'+type, customClass, customPrefix, customPrefix ? type : '']"
    @click="onClick"
  />
</template>

<script>
const getVal = (val) => {
  const reg = /^[0-9]*$/g;
  return (typeof val === 'number' || reg.test(val)) ? `${val}px` : val;
};

/**
 * Icons 图标
 * @description 用于展示 icons 图标
 * @tutorial https://ext.dcloud.net.cn/plugin?id=28
 * @property {Number} size 图标大小
 * @property {String} type 图标图案，参考示例
 * @property {String} color 图标颜色
 * @property {String} customPrefix 自定义图标
 * @event {Function} click 点击 Icon 触发事件
 */
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
    customClass: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  data() {
    return {
    };
  },
  computed: {
    iconSize() {
      return getVal(this.size);
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import "./uniicons.css";
@font-face {
  font-family: "iconfont";
  src: url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.eot?t=13a02cbb9e9c634e54e36069099a2d1e");
  /* IE9 */
  src: url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.eot?t=13a02cbb9e9c634e54e36069099a2d1e#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.woff?t=13a02cbb9e9c634e54e36069099a2d1e")
      format("woff2"),
    url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.woff?t=13a02cbb9e9c634e54e36069099a2d1e")
      format("woff"),
    /* chrome、firefox */
      url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.ttf?t=13a02cbb9e9c634e54e36069099a2d1e")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("https://image-1251917893.file.myqcloud.com/Esports/iconfont/iconfont.svg?t=13a02cbb9e9c634e54e36069099a2d1e#iconfont")
      format("svg");
  /* iOS 4.1- */
}
/* #endif */
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
