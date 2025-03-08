<template>
  <div class="demo-wrap">
    <!-- #ifdef APP-PLUS -->
    <PressNoticeBar
      mode="closeable"
      text="Sticky 组件暂不支持 App"
    />
    <!-- #endif -->

    <demo-block
      :title="t('basicUsage')"
      section-style="margin: 0;"
    >
      <PressSticky>
        <div class="btn1">
          {{ t('basicUsage') }}
        </div>
      </PressSticky>
    </demo-block>

    <demo-block
      :title="t('offsetTop')"
      section-style="margin: 0;"
    >
      <PressSticky
        :offset-top="50"
      >
        <div
          class="btn2"
        >
          {{ t('offsetTop') }}
        </div>
      </PressSticky>
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
        <PressSticky :container="container">
          <div class="btn3">
            {{ t('setContainer') }}
          </div>
        </PressSticky>
      </div>
    </demo-block>

    <!-- #ifdef H5 -->
    <PressButton
      type="e-sport-primary"
      custom-style="position:relative;margin: 10px;padding: 0;"
      @click="onToggleShowHeader"
    >
      {{ showHeader ? t('hide') : t('show') }}
    </PressButton>
    <!-- #endif -->
  </div>
</template>
<script>
import PressSticky from 'press-ui/press-sticky/press-sticky.vue';
import PressButton from 'press-ui/press-button/press-button.vue';
import PressNoticeBar from 'press-ui/press-notice-bar/press-notice-bar.vue';
import { requestAnimationFrame } from 'press-ui/common/utils/system';
import { getHideHeaderMixin } from 'press-ui/mixins/hide-header/index';


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
  components: {
    PressSticky,
    PressButton,
    PressNoticeBar,
  },
  mixins: [getHideHeaderMixin()],
  data() {
    const that = this;
    return {
      container() {
        const res = that.$refs?.container;
        return res;
      },
      // showHeader: true,
    };
  },
  mounted() {
    requestAnimationFrame(() => {
      this.container = () => this.$refs.container;
    });
  },
  methods: {
    // onToggleShowHeader() {
    //   this.showHeader = !this.showHeader;
    //   let style = 'none';
    //   if (this.showHeader) {
    //     style = 'block';
    //   }

    //   const header = document.querySelector('uni-page-head')
    //   || document.querySelector('.uni-page-head-wrap');
    //   if (header) {
    //     header.style.display = style;
    //   }
    // },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  height: 200vh;

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

<style lang="scss">
page {
  height: 100%;
  overflow: auto;
}
</style>
