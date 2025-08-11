<template>
  <div class="press-password-input">
    <span
      class="press-password-input__security"
      :class="{'press-hairline--surround': !gutter}"
      @click.stop.passive="onTouchStart"
    >
      <span
        v-for="(item, index) of points"
        :key="index"
        class="press-password-input__item"
        :class="{'press-hairline--left': item.showBorder}"
        :style="item.style"
      >
        <span
          v-if="mask"
          class="press-password-input__mask"
          :style="item.maskStyle"
        />
        <template v-else>{{ item.char }}</template>
        <div
          v-if="item.showCursor"
          class="press-password-input__cursor"
        />
      </span>
    </span>
    <div
      v-if="errorInfo || info"
      :class="{
        'press-password-input__error-info': !!errorInfo,
        'press-password-input__info': !errorInfo,
      }"
    >
      {{ errorInfo || info }}
    </div>
  </div>
</template>
<script>
import { addUnit } from '../common/utils/add-unit';
import styles from '../common/utils/style';


export default {
  name: 'PressPasswordInput',
  props: {
    value: {
      type: String,
      default: '',
    },

    info: {
      type: String,
      default: '',
    },
    errorInfo: {
      type: String,
      default: '',
    },

    mask: {
      type: Boolean,
      default: true,
    },
    focused: {
      type: Boolean,
      default: false,
    },

    gutter: {
      type: [Number, String],
      default: 0,
    },
    length: {
      type: [Number, String],
      default: 6,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    points() {
      const { value, gutter, focused, length } = this;
      const result = [];

      for (let i = 0;i < length;i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;

        let style = '';
        if (i !== 0 && gutter) {
          style = styles({ marginLeft: addUnit(gutter) });
        }

        result.push({
          char,
          showBorder,
          showCursor,
          style,
          maskStyle: `visibility: ${char ? 'visible' : 'hidden'}`,
        });
      }
      return result;
    },
  },
  mounted() {
  },
  methods: {
    onTouchStart(event) {
      event.stopPropagation();
      this.$emit('focus', event);
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
