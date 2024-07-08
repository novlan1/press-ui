<template>
  <div
    :class="badgeClass"
    :style="customStyle"
  >
    <slot />

    <div
      :class="infoClass"
      :style="infoStyle"
    >
      <slot name="content">
        {{ dot ? '' : innerContent }}
      </slot>
    </div>
  </div>
</template>
<script>
import styleUtil from '../common/utils/style';
import utils from '../common/utils/utils';


export default {
  name: 'PressBadge',
  components: {
  },
  props: {
    dot: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    color: {
      type: String,
      default: '#ee0a24',
    },
    max: {
      type: [String, Number],
      default: '',
    },
    customStyle: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    badgeClass() {
      const { hasChild, customClass } = this;
      return `${customClass} ${utils.bem2('badge', { fixed: hasChild })}`;
    },
    infoClass() {
      const { dot } = this;
      return `${utils.bem2('badge__info', { dot })}`;
    },
    innerContent() {
      const { content, max } = this;
      if (content > max) {
        return `${content}+`;
      }
      return content;
    },
    infoStyle() {
      return styleUtil({
        backgroundColor: this.color,
      });
    },
    hasChild() {
      return !!this.$slots?.default;
    },
  },
  mounted() {
  },
  methods: {
  },
};

</script>
<style scoped lang="scss" src="./css/index.scss">
</style>
