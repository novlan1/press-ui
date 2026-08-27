<template>
  <span
    :style="{'font-size': iconSize }"
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


export default {
  name: 'PressIconPlus',
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

<style lang="scss" src="./css/index.scss" scoped>
</style>
