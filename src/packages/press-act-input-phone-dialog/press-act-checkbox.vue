<template>
  <div
    :class="[
      getActClass('act-checkbox', {
        [getActClass('act-checkbox--checked')]: value
      }),
      customClass,
    ]"
    @click.stop="$emit('input', !value)"
  />
</template>

<script>
import { getActClass } from './utils';


export default {
  name: 'PressActCheckbox',
  options: {
    styleIsolation: 'shared',
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    useTipClass: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    getActClass(...args) {
      return getActClass(this.useTipClass, args);
    },
  },
};
</script>
<style scoped lang="scss">
.press-act:not(.press-act--hidden-tip) {
  .press__act-checkbox {
    display: inline-block;
    width: 0.3rem;
    height: 0.3rem;
    background: url(https://image-1251917893.file.myqcloud.com/UI/page/college/unchecked-blue.png)
      50%/100% 100% no-repeat;
    margin: 0 0.12rem;
    cursor: pointer;
  }

  .press__act-checkbox.press__act-checkbox--checked {
    background: url(https://image-1251917893.file.myqcloud.com/UI/page/college/checked-blue.png)
      50%/100% 100% no-repeat;
  }
}
</style>

