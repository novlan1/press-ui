<template>
  <div class="wrap">
    <demo-block :title="t('buttonMode')">
      <div
        class="primary-btn"
        style="position:relative;margin-left: 10px;"
        @click.stop="onShowLoading('btn')"
      >
        {{ options.btn.show ? '' : t('click') }}
        <press-loading
          v-if="options.btn.show"
          loading-scenes="btn"
        />
      </div>
    </demo-block>

    <demo-block :title="t('pageMode')">
      <div
        class="primary-btn"
        style="position:relative;margin-left: 10px;"
        @click.stop="onShowLoading('page')"
      >
        {{ t('check') }}
      </div>
    </demo-block>

    <demo-block :title="t('customBackground')">
      <div
        class="primary-btn"
        style="position:relative;margin-left: 10px;"
        @click.stop="onShowLoading('bg')"
      >
        {{ t('disappear') }}
      </div>
    </demo-block>

    <press-loading
      v-if="options.page.show"
    />
    <press-loading
      v-if="options.bg.show"
      loading-bg="#eee"
    />
  </div>
</template>
<script>
export default {
  i18n: {
    'zh-CN': {
      buttonMode: '按钮模式',
      pageMode: '页面模式',
      customBackground: '指定背景色',
      click: '点击加载',
      disappear: '三秒后消失',
    },
    'en-US': {
      buttonMode: 'Button Mode',
      pageMode: 'Page Mode',
      customBackground: 'Custom Background',
      click: 'Check',
      disappear: 'Check',
    },
  },

  data() {
    return {
      options: {
        btn: {
          show: false,
        },
        page: {
          show: false,
        },
        bg: {
          show: false,
        },
      },
    };
  },
  methods: {
    onShowLoading(type) {
      this.options[type].show = true;
      setTimeout(() => {
        this.options[type].show = false;
      }, 3000);
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";

.wrap {
  width: 100%;
  height: 100%;
}

.section-content {
  margin: 0 10px;
}

.primary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  @include primary-btn(2rem, 0.72rem, 0.32rem);
  @include btn-default-bg;
}

.secondary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  @include secondary-btn(2rem, 0.72rem, 0.32rem);
}
</style>
