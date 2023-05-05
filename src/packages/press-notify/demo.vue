<template>
  <div class="wrap">
    <!-- #ifndef H5 -->
    <PressNotify
      id="press-notify"
    />
    <!-- #endif -->


    <demo-block :title="t('basicUsage')">
      <press-button
        type="e-sport-primary"
        custom-style="width: auto;"
        @click="showNotify(t('content'))"
      >
        {{ t('basicUsage') }}
      </press-button>
    </demo-block>

    <demo-block :title="t('notifyType')">
      <div style="margin-bottom: 12px;">
        <press-button
          type="e-sport-primary"
          custom-style="margin: 0 12px 0 0;width: auto;"
          @click="showNotify({ type: 'primary', message: t('content') })"
        >
          {{ t('primary') }}
        </press-button>

        <press-button
          type="e-sport-primary"
          custom-style="width: auto;"
          @click="showNotify({ type: 'success', message: t('content') })"
        >
          {{ t('success') }}
        </press-button>
      </div>
      <div>
        <press-button
          type="e-sport-primary"
          custom-style="margin: 0 12px 0 0;width: auto;"
          @click="showNotify({ type: 'danger', message:t('content') })"
        >
          {{ t('danger') }}
        </press-button>

        <press-button
          type="e-sport-primary"
          custom-style="width: auto;"
          @click="showNotify({ type: 'warning', message: t('content')})"
        >
          {{ t('warning') }}
        </press-button>
      </div>
    </demo-block>

    <demo-block :title="t('customNotify')">
      <press-button
        type="e-sport-primary"
        custom-style="margin: 0 12px 0 0;width: auto;"
        @click="showNotify({
          message: t('customColor'),
          color: '#ad0000',
          background: '#ffe1e1',
        })"
      >
        {{ t('customColor') }}
      </press-button>

      <press-button
        type="e-sport-primary"
        custom-style="width: auto;"
        @click="showNotify({
          message: t('customDuration'),
          duration: 1000,
        })"
      >
        {{ t('customDuration') }}
      </press-button>
    </demo-block>
  </div>
</template>
<script>
import PressNotify from 'src/packages/press-notify/press-notify.vue';
import PressNotifyHandler from 'src/packages/press-notify/';


export default {
  i18n: {
    'zh-CN': {
      primary: '主要通知',
      success: '成功通知',
      danger: '危险通知',
      warning: '警告通知',
      content: '通知内容',
      notifyType: '通知类型',
      customColor: '自定义颜色',
      customNotify: '自定义配置',
      componentCall: '组件调用',
      customDuration: '自定义时长',
    },
    'en-US': {
      primary: 'Primary',
      success: 'Success',
      danger: 'Danger',
      warning: 'Warning',
      content: 'Notify Message',
      notifyType: 'Notify Type',
      customColor: 'Custom Color',
      customNotify: 'Custom Notify',
      componentCall: 'Component Call',
      customDuration: 'Custom Duration',
    },
  },

  components: {
    PressNotify,
  },
  data() {
    return {

    };
  },
  mounted() {
  },
  methods: {
    showNotify(options) {
      if (process.env.UNI_PLATFORM !== 'h5') {
        PressNotifyHandler(options);
        return;
      }
      let cOptions = options;
      if (typeof options !== 'object') {
        cOptions = { message: options };
      }
      PressNotifyHandler({
        ...cOptions,
        top: 44,
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
</style>
