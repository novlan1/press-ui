<template>
  <div
    class="press-sche-tab"
  >
    <div
      class="press-sche-tab__box"
    >
      <div
        v-for="item in list"
        :key="item.key"
        class="press-sche-tab__item"
        :class="current == item.key ?'press-sche-tab__item--active':''"
        @click.stop="clickTab(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  options: {
    virtualHost: true,
  },
  components: {
  },
  props: {
    current: {
      type: [Number, String],
      default: '',
      required: false,
    },
    list: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    clickTab(item) {
      this.$emit('change', item.key, item);
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
