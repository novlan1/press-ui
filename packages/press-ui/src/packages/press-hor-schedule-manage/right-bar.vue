<template>
  <div :class="[getActClass('bar')]">
    <div
      :class="[getActClass('close')]"
      @click="clickBarClose()"
    />
    <div
      v-for="(item,index) in origBarList"
      :key="index"
      :class="[
        getActClass('bar-item', {
          'bar-item--active': tabIndex == index
        })]"
      @click="changeTab(item, index)"
    >
      {{ item.value || item }}
    </div>
  </div>
</template>

<script>
import { getActClass } from './utils';

export default {
  name: 'PressRightBar',
  components: {

  },
  props: {
    origBarList: {
      type: Array,
      default: () => [

      ],
      require: false,
    },
    tabIndex: {
      type: [String, Number],
      default: 0,
      require: false,
    },
  },
  emits: [
    'changeTab',
    'close',
  ],
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {

  },
  updated() {
  },
  methods: {
    getActClass,
    changeTab(item, index) {
      this.$emit('changeTab', index);
    },
    // 关闭按钮
    clickBarClose() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" src="./css/right-bar.scss" scoped></style>
