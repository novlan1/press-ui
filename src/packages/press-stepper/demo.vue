<template>
  <div class="demo-wrap">
    <PressCell :title="t('basicUsage')">
      <PressStepper
        :value="value"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('step')">
      <PressStepper
        :value="value"
        :step="2"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('range')">
      <PressStepper
        :value="value"
        :min="5"
        :max="8"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('integer')">
      <PressStepper
        :value="value"
        integer
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('disabled')">
      <PressStepper
        disabled
        :value="value"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('closeLongPress')">
      <PressStepper
        :long-press="false"
        :value="value"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('decimalLength')">
      <PressStepper
        :step="0.2"
        :decimal-length="1"
        :value="value"
        @change="onChange"
      />
    </PressCell>

    <PressCell :title="t('asyncChange')">
      <PressStepper
        async-change
        :value="asyncValue"
        @change="onSyncChange"
      />
    </PressCell>

    <PressCell :title="t('customSize')">
      <PressStepper
        input-width="40px"
        button-size="32px"
        :value="value"
        @change="onChange"
      />
    </PressCell>


    <!-- #ifndef H5 -->
    <PressToast
      id="press-toast"
      ref="press-toast"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import PressStepper from 'press-ui/press-stepper/press-stepper.vue';
import PressToast from 'press-ui/press-toast/press-toast.vue';
import PressCell from 'press-ui/press-cell/press-cell.vue';


export default {
  i18n: {
    'zh-CN': {
      step: '步长设置',
      range: '限制输入范围',
      integer: '限制输入整数',
      roundTheme: '圆角风格',
      asyncChange: '异步变更',
      customSize: '自定义大小',
      disableInput: '禁用输入框',
      decimalLength: '固定小数位数',
      closeLongPress: '关闭长按',
    },
    'en-US': {
      step: 'Step',
      range: 'Range',
      integer: 'Integer',
      roundTheme: 'Round Theme',
      asyncChange: 'Async Change',
      customSize: 'Custom Size',
      disableInput: 'Disable Input',
      decimalLength: 'Decimal Length',
      closeLongPress: 'Close Long Press',
    },
  },

  components: {
    PressStepper,
    PressToast,
    PressCell,
  },
  data() {
    return {
      value: 1,
      asyncValue: 1,
    };
  },
  methods: {
    onChange(val) {
      console.log('onChange.val', val);
    },
    onSyncChange(val) {
      this.$toast.loading({
        duration: 1000,
      });
      // QQ小程序不能使用空字符串
      // this.onGShowLoading(' ', {
      //   duration: 1000,
      // });
      setTimeout(() => {
        console.log('onSyncChange.val', val);
        this.asyncValue = val;
      }, 1000);
    },

  },
};
</script>
<style scoped lang="scss">
</style>
