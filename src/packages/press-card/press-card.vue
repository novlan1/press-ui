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
        <img
          class="press-card__cover-image"
          mode="widthFix"
          :src="cover"
          @click="onClick('cover')"
        >
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
            <img
              class="press-card__header-avatar-image"
              :src="thumbnail"
              mode="aspectFit"
            >
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

<style lang="scss" scoped src="./css/index.scss">
</style>
