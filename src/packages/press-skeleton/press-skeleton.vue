<template>
  <div>
    <div
      v-if="loading"
      :class="`${customClass} `+(utils.bem2('skeleton', [{animate}]))"
    >
      <div
        v-if="avatar"
        :class="`${avatarClass} `+(utils.bem2('skeleton__avatar', [avatarShape]))"
        :style="'width:' + avatarSize + ';height:' + avatarSize"
      />
      <div :class="true ? utils.bem2('skeleton__content'): ''">
        <div
          v-if="title"
          :class="`${titleClass} `+(utils.bem2('skeleton__title'))"
          :style="'width:' + titleWidth"
        />
        <div
          v-for="(item,index) in (rowArray)"
          :key="index"
          :class="`${rowClass} `+(utils.bem2('skeleton__row'))"
          :style="'width:' + (isArray ? rowWidth[index] : rowWidth)"
        />
      </div>
    </div>
    <div
      v-else
      :class="true ? utils.bem2('skeleton__content') : ''"
    >
      <slot />
    </div>
  </div>
</template>
<script>
import utils from '../common/utils/utils';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';

export default {
  name: 'PressSkeleton',
  options: {
    defaultOptions,
  },
  props: {
    row: {
      type: Number,
      default: 0,
    },
    title: Boolean,
    avatar: Boolean,
    loading: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: Boolean,
      default: true,
    },
    avatarSize: {
      type: String,
      default: '32px',
    },
    avatarShape: {
      type: String,
      default: 'round',
    },
    titleWidth: {
      type: String,
      default: '40%',
    },
    rowWidth: {
      type: null,
      default: '100%',
    },
    avatarClass: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: '',
    },
    rowClass: {
      type: String,
      default: '',
    },
    ...defaultProps,
  },
  emits: [],
  data() {
    return {
      utils,
      isArray: false,
      rowArray: [],
    };
  },
  computed: {

  },
  watch: {
    row: {
      handler(val) {
        this.rowArray = Array.from({ length: val });
      },
      immediate: true,
    },
    rowWidth: {
      handler(val) {
        this.isArray = val instanceof Array;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss" src="./css/index.scss">
</style>
