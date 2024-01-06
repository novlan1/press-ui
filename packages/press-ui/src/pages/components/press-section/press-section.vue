<template>
  <div class="press-section">
    <div
      class="press-section-header"
      :style="headerStyle"
      @click="onClick"
    >
      <div
        v-if="type"
        class="press-section-header__decoration"
        :class="type"
      />
      <slot
        v-else
        name="decoration"
      />

      <div class="press-section-header__content">
        <span
          :style="{'font-size':titleFontSize,'color':titleColor}"
          class="press-section__content-title"
          :class="{'distraction':!subTitle}"
        >
          {{ title }}
        </span>
        <span
          v-if="subTitle"
          :style="{'font-size':subTitleFontSize,'color':subTitleColor}"
          class="press-section-header__content-sub"
        >
          {{ subTitle }}
        </span>
      </div>

      <div class="press-section-header__slot-right">
        <slot name="right" />
      </div>
    </div>

    <div
      class="press-section-content"
      :style="{padding: innerPadding}"
    >
      <slot />
    </div>
  </div>
</template>

<script>


export default {
  name: 'PressSection',
  props: {
    type: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    titleFontSize: {
      type: String,
      default: '14px',
    },
    titleColor: {
      type: String,
      default: '#333',
    },
    subTitle: {
      type: String,
      default: '',
    },
    subTitleFontSize: {
      type: String,
      default: '12px',
    },
    subTitleColor: {
      type: String,
      default: '#999',
    },
    padding: {
      type: [Boolean, String],
      default: false,
    },
    headerStyle: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  computed: {
    innerPadding() {
      if (typeof this.padding === 'string') {
        return this.padding;
      }

      return this.padding ? '10px' : '';
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss">
$press-primary: #2979ff !default;

.press-section {
  background-color: #fff;
  .press-section-header {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    // 取消垂向居中，当文字多行时，并不美观
    // align-items: center;
    padding: 12px 10px;
    font-weight: normal;

    &__decoration {
      margin-right: 6px;
      background-color: $press-primary;
      &.line {
        width: 4px;
        height: 12px;
        border-radius: 10px;
        margin-top: 4px;
      }

      &.circle {
        width: 8px;
        height: 8px;
        border-top-right-radius: 50px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
      }

      &.square {
        width: 8px;
        height: 8px;
      }
    }

    &__content {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      flex: 1;
      color: #333;

      .distraction {
        flex-direction: row;
        align-items: center;
      }
      &-sub {
        margin-top: 2px;
      }
    }

    &__slot-right {
      font-size: 14px;
    }
  }

  .press-section-content {
    font-size: 14px;
  }
}
</style>
