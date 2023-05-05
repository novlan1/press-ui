<template>
  <uni-shadow-root class="press-share-sheet-options">
    <div :class="optionsClass">
      <div
        v-for="(item,index) in (options)"
        :key="item.index"
        class="press-share-sheet__option"
        :data-index="index"
        @click="onSelect"
      >
        <button
          class="press-share-sheet__button"
          :open-type="item.openType"
        >
          <image
            :src="computed.getIconURL(item.icon)"
            class="press-share-sheet__icon"
          />
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
  </uni-shadow-root>
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
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";
@import "../common/style/mixins/hairline.scss";

.press-share-sheet {
  &__options {
    position: relative;
    display: flex;
    padding: $padding-md 0 $padding-md $padding-xs;
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;

    &--border::before {
      @include hairline-top($cell-border-color, $padding-md);
    }

    &::-webkit-scrollbar {
      height: 0;
    }
  }

  &__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;

    &:active {
      opacity: $active-opacity;
    }
  }

  &__button {
    height: auto;
    padding: 0;
    line-height: inherit;
    background-color: transparent;
    border: 0;

    &::after {
      border: 0;
    }
  }

  &__icon {
    width: $share-sheet-icon-size;
    height: $share-sheet-icon-size;
    margin: 0 $padding-md;
  }

  &__name {
    margin-top: $padding-xs;
    padding: 0 $padding-base;
    color: $share-sheet-option-name-color;
    font-size: $share-sheet-option-name-font-size;
  }

  &__option-description {
    padding: 0 $padding-base;
    color: $share-sheet-option-description-color;
    font-size: $share-sheet-option-description-font-size;
  }
}
</style>
