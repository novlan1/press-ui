<template>
  <div class="press-share-sheet-options">
    <div :class="optionsClass">
      <div
        v-for="(item,index) in (options)"
        :key="index"
        class="press-share-sheet__option"
        :data-index="index"
        @click="onSelect"
      >
        <button
          class="press-share-sheet__button"
          :open-type="item.openType"
        >
          <img
            :src="computed.getIconURL(item.icon)"
            class="press-share-sheet__icon"
          >
          <div
            v-if="item.name"
            class="press-share-sheet__name"
          >
            {{ item.name }}
          </div>
          <div
            v-if="item.description"
            class="press-share-sheet__option-description"
          >
            {{ item.description }}
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import computed from './options-computed';

export default {
  options: {
    ...defaultOptions,
  },
  components: {},
  props: {
    options: { type: Array, default: () => [] },
    showBorder: Boolean,
    ...defaultProps,
  },
  emits: ['select'],
  data() {
    return {
      computed,
    };
  },
  computed: {
    optionsClass() {
      const { showBorder } = this;
      return utils.bem2('share-sheet__options', { border: showBorder });
    },
  },
  methods: {
    onSelect(event) {
      const { index } = event.currentTarget.dataset;
      const option = this.options[index];
      this.$emit('select', Object.assign(Object.assign({}, option), { index }));
    },
  },
};

</script>
<style scoped lang="scss" src="./css/options.scss">
</style>
