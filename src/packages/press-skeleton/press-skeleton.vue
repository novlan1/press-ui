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

<style platform="mp-weixin" lang="scss">
@import "../common/style/index.scss";
@import "../common/style/var.scss";

.press-skeleton {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: var(--skeleton-padding, $skeleton-padding);

  &__avatar {
    flex-shrink: 0;
    margin-right: var(--padding-md, $padding-md);
    background-color: var(
      --skeleton-avatar-background-color,
      $skeleton-avatar-background-color
    );

    &--round {
      border-radius: 100%;
    }
  }

  &__content {
    flex: 1;
  }

  &__avatar + &__content {
    padding-top: var(--padding-xs, $padding-xs);
  }

  &__row,
  &__title {
    height: var(--skeleton-row-height, $skeleton-row-height);
    background-color: var(
      --skeleton-row-background-color,
      $skeleton-row-background-color
    );
  }

  &__title {
    margin: 0;
  }

  &__row {
    &:not(:first-child) {
      margin-top: var(--skeleton-row-margin-top, $skeleton-row-margin-top);
    }
  }

  &__title + &__row {
    margin-top: 20px;
  }

  &--animate {
    animation: press-skeleton-blink $skeleton-animation-duration ease-in-out
      infinite;
  }
}

@keyframes press-skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
