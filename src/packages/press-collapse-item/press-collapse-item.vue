<template>
  <div :class="'press-collapse-item custom-class '+(index !== 0 ? 'press-hairline--top' : '')">
    <!-- 【修改点】cell增加center，垂直居中 -->
    <press-cell
      :size="size"
      :title="title"
      title-class="title-class"
      :icon="icon"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :class="collapseItemClass"
      right-icon-class="press-cell__right-icon"
      hover-class="press-cell--hover"
      center
      @click="onClick"
    >
      <!-- #ifndef H5 -->
      <template
        #title
      >
        <slot
          slot="title"
          name="title"
        />
      </template>
      <!-- #endif -->
      <!-- #ifdef H5 -->
      <slot
        slot="title"
        name="title"
      />
      <!-- #endif -->

      <!-- <slot
          slot="icon"
          name="icon"
        /> -->

      <slot name="value" />

      <slot
        slot="right-icon"
        name="right-icon"
      />
    </press-cell>

    <div
      :class="wrapperClass"
      :style="animationStyle"
    >
      <div class="press-collapse-item__content content-class">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import PressCell from '../press-cell/press-cell.vue';
import { setContentAnimate } from './animate';
import { defaultProps, defaultOptions } from '../common/component-handler/press-component';
import utils from '../common/utils/utils';
import { ChildrenMixin } from '../mixins/relation';
import { PARENT_COLLAPSE as PARENT } from '../common/constant/parent-map';


export default {
  options: {
    ...defaultOptions,
    styleIsolation: 'shared',
  },
  components: {
    PressCell,
  },
  mixins: [
    ChildrenMixin(PARENT),
  ],

  classes: ['title-class', 'content-class'],
  props: {
    size: { type: String, default: '' },
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    value: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    disabled: Boolean,
    clickable: Boolean,
    border: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: true,
    },
    ...defaultProps,
  },
  data() {
    return {
      expanded: false,
      animation: {},
      mounted: false,

      animationStyle: 'height: 0;',
    };
  },
  computed: {
    collapseItemClass() {
      const { disabled, expanded } = this;
      return utils.bem2('collapse-item__title', { disabled, expanded });
    },
    wrapperClass() {
      return utils.bem2('collapse-item__wrapper');
    },
  },
  mounted() {
    this.updateExpanded();
    this.mounted = true;
  },
  methods: {
    updateExpanded() {
      if (!this[PARENT]) {
        return;
      }
      const { value, accordion } = this[PARENT];
      const { children = [] } = this[PARENT];
      const { name } = this;
      const index = children.indexOf(this);
      const currentName = name == null ? index : name;
      const expanded = accordion
        ? value === currentName
        : (value || []).some(name => name === currentName);
      if (expanded !== this.expanded) {
        setContentAnimate(this, expanded, this.mounted);
      }
      // this.index = index;
      this.expanded = expanded;
    },
    onClick() {
      if (this.disabled) {
        return;
      }
      const { name, expanded } = this;
      const index = this[PARENT].children.indexOf(this);
      const currentName = name == null ? index : name;
      this[PARENT].switch(currentName, !expanded);
    },
  },
};

</script>
<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-collapse-item {
  &__title {
    .press-cell__right-icon {
      transform: rotate(90deg);
      transition: transform
        var(
          --collapse-item-transition-duration,
          $collapse-item-transition-duration
        );
    }

    &--expanded {
      .press-cell__right-icon {
        transform: rotate(-90deg);
      }
    }

    &--disabled {
      // 【修改点】改变disabled状态下的title颜色
      .press-cell__title,
      .press-cell__right-icon {
        color: var(
          --collapse-item-title-disabled-color,
          $collapse-item-title-disabled-color
        ) !important;
      }

      .press-cell--hover {
        background-color: $white !important;
      }
    }
  }

  &__wrapper {
    overflow: hidden;
  }

  &__content {
    padding: var(
      --collapse-item-content-padding,
      $collapse-item-content-padding
    );
    color: var(
      --collapse-item-content-text-color,
      $collapse-item-content-text-color
    );
    font-size: var(
      --collapse-item-content-font-size,
      $collapse-item-content-font-size
    );
    line-height: var(
      --collapse-item-content-line-height,
      $collapse-item-content-line-height
    );
    background-color: var(
      --collapse-item-content-background-color,
      $collapse-item-content-background-color
    );
  }
}
</style>
