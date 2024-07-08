<template>
  <press-popup
    round
    class="press-share-sheet"
    :show="show"
    position="bottom"
    :overlay="overlay"
    :duration="duration"
    :z-index="zIndex"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area-inset-bottom="safeAreaInsetBottom"
    @close="onClose"
    @click-overlay="onClickOverlay"
  >
    <div class="press-share-sheet__header">
      <div class="press-share-sheet__title">
        <slot name="title" />
      </div>
      <div
        v-if="title"
        class="press-share-sheet__title"
      >
        {{ title }}
      </div>

      <div class="press-share-sheet__description">
        <slot name="description" />
      </div>
      <div
        v-if="description"
        class="press-share-sheet__description"
      >
        {{ description }}
      </div>
    </div>

    <template v-if="computed.isMulti(options)">
      <options
        v-for="(item,index) in (options)"
        :key="index"
        :show-border="index !== 0"
        :options="item"
        @select="onSelect"
      />
    </template>

    <options
      v-else
      :options="options"
      @select="onSelect"
    />

    <button
      type="button"
      class="press-share-sheet__cancel"
      @click="onCancel"
    >
      {{ cancelText }}
    </button>
  </press-popup>
</template>
<script>
import PressPopup from '../press-popup-plus/press-popup-plus.vue';
import Options from './options.vue';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import computed from './computed';

export default {
  name: 'PressShareSheet',
  options: {
    ...defaultOptions,
  },
  components: {
    PressPopup,
    Options,
  },
  props: {
    show: Boolean,
    overlayStyle: { type: String, default: '' },
    zIndex: {
      type: Number,
      default: 100,
    },
    title: { type: String, default: '' },
    cancelText: {
      type: String,
      default: '取消',
    },
    description: { type: String, default: '' },
    options: {
      type: Array,
      default: () => [],
    },
    overlay: {
      type: Boolean,
      default: true,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 300,
    },
    ...defaultProps,
  },
  emits: ['click-overlay', 'cancel', 'select', 'close'],
  data() {
    return {
      computed,
    };
  },
  methods: {
    onClickOverlay() {
      this.$emit('click-overlay');
    },
    onCancel() {
      this.onClose();
      this.$emit('cancel');
    },
    onSelect(event) {
      this.$emit('select', event);
    },
    onClose() {
      this.$emit('close');
    },
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
