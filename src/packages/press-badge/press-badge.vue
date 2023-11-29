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
<style scoped lang="scss">
@import "../common/style/press/index.scss";
@import "../common/style/press/var.scss";

.press-badge {
  position: relative;
  display: inline-block;

  &--fixed {
    .press-badge__info {
      position: absolute;
      top: 0;
      right: 0;

      transform: translate(50%, -50%);
      transform-origin: 100%;
    }
  }

  &__info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    white-space: nowrap;

    height: var(--info-size, $info-size);
    min-width: var(--info-size, $info-size);
    padding: var(--info-padding, $info-padding);
    color: var(--info-color, $info-color);
    font-weight: var(--info-font-weight, $info-font-weight);
    font-size: var(--info-font-size, $info-font-size);
    font-family: var(--info-font-family, $info-font-family);

    background-color: var(--info-background-color, $info-background-color);
    border: var(--info-border-width, $info-border-width) solid $white;
    border-radius: var(--info-size, $info-size);

    &--dot {
      min-width: 0;
      border-radius: 100%;
      width: var(--info-dot-size, $info-dot-size);
      height: var(--info-dot-size, $info-dot-size);
      background-color: var(--info-dot-color, $info-dot-color);
    }
  }
}
</style>
