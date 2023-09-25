<template>
  <div class="demo-wrap">
    <press-cell :title="t('basicUsage')">
      <press-stepper
        :value="value"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('step')">
      <press-stepper
        :value="value"
        :step="2"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('range')">
      <press-stepper
        :value="value"
        :min="5"
        :max="8"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('integer')">
      <press-stepper
        :value="value"
        integer
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('disabled')">
      <press-stepper
        disabled
        :value="value"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('closeLongPress')">
      <press-stepper
        :long-press="false"
        :value="value"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('decimalLength')">
      <press-stepper
        :step="0.2"
        :decimal-length="1"
        :value="value"
        @change="onChange"
      />
    </press-cell>

    <press-cell :title="t('asyncChange')">
      <press-stepper
        async-change
        :value="asyncValue"
        @change="onSyncChange"
      />
    </press-cell>

    <press-cell :title="t('customSize')">
      <press-stepper
        input-width="40px"
        button-size="32px"
        :value="value"
        @change="onChange"
      />
    </press-cell>


    <!-- #ifndef H5 -->
    <PressToast
      id="press-toast"
      ref="press-toast"
    />
    <!-- #endif -->
  </div>
</template>
<script>
import PressStepper from 'src/packages/press-stepper/press-stepper.vue';
import PressToast from 'src/packages/press-toast/press-toast.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';


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
