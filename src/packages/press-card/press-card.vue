<template>
  <div
    class="press-card"
    :class="{ 'press-card--full': isFull, 'press-card--shadow': isShadow,'press-card--border':border}"
    :style="{'margin':isFull?0:margin,'padding':spacing,'box-shadow':isShadow?shadow:''}"
  >
    <!-- 封面 -->
    <slot name="cover">
      <div
        v-if="cover"
        class="press-card__cover"
      >
        <image
          class="press-card__cover-image"
          mode="widthFix"
          :src="cover"
          @click="onClick('cover')"
        />
      </div>
    </slot>

    <slot name="title">
      <div
        v-if="title || extra"
        class="press-card__header"
      >
        <!-- 卡片标题 -->
        <div
          class="press-card__header-box"
          @click="onClick('title')"
        >
          <div
            v-if="thumbnail"
            class="press-card__header-avatar"
          >
            <image
              class="press-card__header-avatar-image"
              :src="thumbnail"
              mode="aspectFit"
            />
          </div>
          <div class="press-card__header-content">
            <span class="press-card__header-content-title press-ellipsis">
              {{ title }}
            </span>
            <span
              v-if="title&&subTitle"
              class="press-card__header-content-subtitle press-ellipsis"
            >
              {{ subTitle }}
            </span>
          </div>
        </div>
        <div
          class="press-card__header-extra"
          @click="onClick('extra')"
        >
          <span class="press-card__header-extra-text">
            {{ extra }}
          </span>
        </div>
      </div>
    </slot>

    <!-- 卡片内容 -->
    <div
      class="press-card__content"
      :style="{padding:padding}"
      @click="onClick('content')"
    >
      <slot />
    </div>

    <div
      class="press-card__actions"
      @click="onClick('actions')"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PressCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    cover: {
      type: String,
      default: '',
    },
    isFull: {
      // 内容区域是否通栏
      type: Boolean,
      default: false,
    },
    isShadow: {
      // 是否开启阴影
      type: Boolean,
      default: true,
    },
    shadow: {
      type: String,
      default: '0px 0px 3px 1px rgba(0, 0, 0, 0.08)',
    },
    border: {
      type: Boolean,
      default: true,
    },
    margin: {
      type: String,
      default: '15px',
    },
    spacing: {
      type: String,
      default: '0 10px',
    },
    padding: {
      type: String,
      default: '10px',
    },
  },
  emits: ['click'],
  methods: {
    onClick(type) {
      this.$emit('click', type);
    },
  },
};
</script>

<style lang="scss">
$press-border-3: #ebeef5 !default;
$press-shadow-base: 0 0px 6px 1px
  rgba(
    $color: #a5a5a5,
    $alpha: 0.2,
  ) !default;
$press-main-color: #3a3a3a !default;
$press-base-color: #6a6a6a !default;
$press-secondary-color: #909399 !default;
$press-spacing-sm: 8px !default;
$press-border-color: $press-border-3;
$press-shadow: $press-shadow-base;
$press-card-title: 15px;
$press-cart-title-color: $press-main-color;
$press-card-subtitle: 12px;
$press-cart-subtitle-color: $press-secondary-color;
$press-card-spacing: 10px;
$press-card-content-color: $press-base-color;

.press-card {
  margin: $press-card-spacing;
  padding: 0 $press-spacing-sm;
  border-radius: 4px;
  overflow: hidden;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  background-color: #fff;
  flex: 1;

  .press-card__cover {
    position: relative;
    margin-top: $press-card-spacing;
    flex-direction: row;
    overflow: hidden;
    border-radius: 4px;
    .press-card__cover-image {
      flex: 1;
      // width: 100%;
      /* #ifndef APP-PLUS */
      vertical-align: middle;
      /* #endif */
    }
  }

  .press-card__header {
    display: flex;
    border-bottom: 1px $press-border-color solid;
    flex-direction: row;
    align-items: center;
    padding: $press-card-spacing;
    overflow: hidden;

    .press-card__header-box {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex: 1;
      flex-direction: row;
      align-items: center;
      overflow: hidden;
    }

    .press-card__header-avatar {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 5px;
      margin-right: $press-card-spacing;
      .press-card__header-avatar-image {
        flex: 1;
        width: 40px;
        height: 40px;
      }
    }

    .press-card__header-content {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      justify-content: center;
      flex: 1;
      // height: 40px;
      overflow: hidden;

      .press-card__header-content-title {
        font-size: $press-card-title;
        color: $press-cart-title-color;
        // line-height: 22px;
      }

      .press-card__header-content-subtitle {
        font-size: $press-card-subtitle;
        margin-top: 5px;
        color: $press-cart-subtitle-color;
      }
    }

    .press-card__header-extra {
      line-height: 12px;

      .press-card__header-extra-text {
        font-size: 12px;
        color: $press-cart-subtitle-color;
      }
    }
  }

  .press-card__content {
    padding: $press-card-spacing;
    font-size: 14px;
    color: $press-card-content-color;
    line-height: 22px;
  }

  .press-card__actions {
    font-size: 12px;
  }
}

.press-card--border {
  border: 1px solid $press-border-color;
}

.press-card--shadow {
  position: relative;
  /* #ifndef APP-NVUE */
  box-shadow: $press-shadow;
  /* #endif */
}

.press-card--full {
  margin: 0;
  border-left-width: 0;
  border-left-width: 0;
  border-radius: 0;
}

/* #ifndef APP-NVUE */
.press-card--full:after {
  border-radius: 0;
}

/* #endif */
.press-ellipsis {
  /* #ifndef APP-NVUE */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* #endif */
  /* #ifdef APP-NVUE */
  lines: 1;
  /* #endif */
}
</style>
