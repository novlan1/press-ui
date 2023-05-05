<template>
  <div class="wrap">
    <demo-block
      :title="t('basicUsage')"
      section-style="margin: 0;"
    >
      <press-sticky>
        <div class="btn1">
          {{ t('basicUsage') }}
        </div>
      </press-sticky>
    </demo-block>

    <demo-block
      :title="t('offsetTop')"
      section-style="margin: 0;"
    >
      <press-sticky
        :offset-top="50"
      >
        <div
          class="btn2"
        >
          {{ t('offsetTop') }}
        </div>
      </press-sticky>
    </demo-block>

    <demo-block
      :title="t('setContainer')"
      section-style="margin: 0;"
    >
      <div
        id="container"
        ref="container"
        style="height: 150px;background: #eee;"
      >
        <press-sticky :container="container">
          <div class="btn3">
            {{ t('setContainer') }}
          </div>
        </press-sticky>
      </div>
    </demo-block>

    <!-- #ifdef H5 -->
    <press-button
      type="e-sport-primary"
      custom-style="position:relative;margin: 10px;padding: 0;"
      @click="onToggleShowHeader"
    >
      {{ showHeader ? t('hide') : t('show') }}
    </press-button>
    <!-- #endif -->
  </div>
</template>
<script>

export default {
  i18n: {
    'zh-CN': {
      offsetTop: '吸顶距离',
      setContainer: '指定容器',
      hide: '隐藏头部',
      show: '显示头部',
    },
    'en-US': {
      offsetTop: 'Offset Top',
      setContainer: 'Set Container',
      hide: 'Hide Head',
      show: 'Show Head',
    },
  },

  data() {
    const that = this;
    return {
      container() {
        let res;

        // #ifdef H5
        res = that.$refs.container;
        // #endif

        // #ifndef H5
        res = uni.createSelectorQuery().select('#container');
        // #endif

        return res;
      },
      showHeader: true,
    };
  },
  mounted() {
  },
  methods: {
    onToggleShowHeader() {
      this.showHeader = !this.showHeader;
      let style = 'none';
      if (this.showHeader) {
        style = 'block';
      }
      const header = document.querySelector('uni-page-head');
      header.style.display = style;
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
.wrap {
  font-size: 16px;
  height: 1000px;
  background: #fff;
  overflow-y: auto;

  .btn1 {
    margin-left: 10px;
  }
  .btn2 {
    margin-left: 80px;
  }
  .btn3 {
    margin-left: 160px;
  }
}
</style>
