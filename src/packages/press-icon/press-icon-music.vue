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

export default {
  props: {
    width: {
      type: String,
      default: '40px',
    },
    height: {
      type: String,
      default: '50px',
    },
    number: {
      type: Number,
      default: 3,
    },
    color: {
      type: String,
      default: '#2979ff',
    },
  },
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
<style scoped lang="scss">
.press-icon-music {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &__bar {
    &-0 {
      animation: playing1 0.3s linear infinite alternate;
    }
    &-1 {
      animation: playing2 0.3s linear infinite alternate;
    }
    &-2 {
      animation: playing1 0.3s 0.15s linear infinite alternate;
    }
    &-3 {
      animation: playing1 0.3s linear infinite alternate;
    }
    &-4 {
      animation: playing2 0.3s linear infinite alternate;
    }
  }
}

@keyframes playing1 {
  0% {
    height: 25%;
  }
  100% {
    height: 80%;
  }
}
@keyframes playing2 {
  0% {
    height: 80%;
  }
  100% {
    height: 25%;
  }
}
</style>
