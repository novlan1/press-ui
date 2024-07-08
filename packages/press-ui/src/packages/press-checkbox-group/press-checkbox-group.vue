<template>
  <div class="press-checkbox-group-index">
    <div :class="groupClass">
      <slot />
    </div>
  </div>
</template>
<script>
import utils from '../common/utils/utils';
import { ParentMixin } from '../mixins/relation';
import { PARENT_CHECKBOX_GROUP as PARENT } from '../common/constant/parent-map';

export default {
  name: 'PressCheckboxGroup',
  mixins: [
    ParentMixin(PARENT),
  ],
  props: {
    max: { type: Number, default: 0 },
    value: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: 'vertical',
    },
  },
  emits: [],
  data() {
    return {};
  },
  computed: {
    groupClass() {
      const { direction } = this;
      return utils.bem2('checkbox-group', [{ horizontal: direction === 'horizontal' }]);
    },
  },
  watch: {
    disabled: {
      handler() {
        this.updateChildren();
      },
    },
    value: {
      handler() {
        this.updateChildren();
      },
    },
  },
  created() {
    this.children = [];
  },
  methods: {
    updateChildren() {
      this.children.forEach(child => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled, direction } = this;
      child.setData({
        dataValue: value.indexOf(child.name) !== -1,
        parentDisabled: disabled,
        direction,
      });
    },
  },
};
</script>
<style lang="scss" scoped src="./css/index.scss">
</style>
