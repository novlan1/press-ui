<template>
  <div
    class="press-icon-music"
    :style="rootStyle"
  >
    <div
      v-for="(item, index) of barList"
      :key="index"
      :style="barStyle"
      :class="['press-icon-music__bar', `press-icon-music__bar-${index}`]"
    />
  </div>
</template>
<script>
import { style } from '../common/utils/style';

import { PROPS } from './computed';

export default {
  name: 'PressIconMusic',
  props: {
    ...PROPS,
  },
  emits: [],
  data() {
    return {
    };
  },
  computed: {
    barList() {
      return Array.from({ length: this.number });
    },
    rootStyle() {
      return style([
        {
          width: this.width,
          height: this.height,
        },
      ]);
    },
    barStyle() {
      const { width, number, color } = this;
      return style([
        {
          backgroundColor: color,
          width: `calc(${width} / ${+number + 1})`,
        },
      ]);
    },
  },
  methods: {

  },
};
</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
