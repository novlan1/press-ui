<template>
  <div class="wrap">
    <demo-block :title="t('basicUsage')">
      <button
        type="primary"
        @click="onClickShow('normal')"
      >
        {{ t('showOverlay') }}
      </button>
    </demo-block>

    <demo-block :title="t('embeddedContent')">
      <button
        type="primary"
        @click="onClickShow('content')"
      >
        {{ t('embeddedContent') }}
      </button>
    </demo-block>

    <press-overlay
      :show="options.normal"
      @click="onClickHide('normal')"
    />

    <press-overlay
      :show="options.content"
      @click="onClickHide('content')"
    >
      <div class="wrapper">
        <div
          class="block"
          catch:tap="noop"
        />
      </div>
    </press-overlay>
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      showOverlay: '显示遮罩层',
      embeddedContent: '嵌入内容',
    },
    'en-US': {
      showOverlay: 'Show Overlay',
      embeddedContent: 'Embedded Content',
    },
  },

  data() {
    return {
      options: {
        normal: false,
        content: false,
      },
    };
  },
  onLoad() {
    // #ifdef MP-QQ
    qq.showShareMenu({
      showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment'],
    });
    // #endif
  },
  methods: {
    onClickShow(type) {
      this.options[type] = true;
    },
    onClickHide(type) {
      this.options[type] = false;
    },
    noop() {},
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>

