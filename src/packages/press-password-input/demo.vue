<template>
  <div class="demo-wrap demo-wrap--gray">
    <scroll-view
      scroll-y
      enhanced
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <demo-block
        ref="basicUsage"
        :title="t('basicUsage')"
        :section-style="sectionStyle"
        :header-style="headerStyle"
      >
        <PressPasswordInput
          :value="values.basicUsage"
          :focused="current === 'basicUsage'"
          @focus="() => onFocus('basicUsage')"
        />
      </demo-block>

      <demo-block
        ref="customLength"
        :title="t('customLength')"
        :section-style="sectionStyle"
        :header-style="headerStyle"
      >
        <PressPasswordInput
          :value="values.customLength"
          :length="4"
          :focused="current === 'customLength'"
          @focus="() => onFocus('customLength')"
        />
      </demo-block>

      <demo-block
        ref="addGutter"
        :title="t('addGutter')"
        :section-style="sectionStyle"
        :header-style="headerStyle"
      >
        <PressPasswordInput
          :value="values.addGutter"
          :gutter="10"
          :focused="current === 'addGutter'"
          @focus="() => onFocus('addGutter')"
        />
      </demo-block>

      <demo-block
        ref="removeMask"
        :title="t('removeMask')"
        :section-style="sectionStyle"
        :header-style="headerStyle"
      >
        <PressPasswordInput
          :mask="false"
          :value="values.removeMask"
          :focused="current === 'removeMask'"
          @focus="() => onFocus('removeMask')"
        />
      </demo-block>

      <demo-block
        ref="showInfo"
        :title="t('showInfo')"
        :section-style="sectionStyle"
        :header-style="headerStyle"
      >
        <PressPasswordInput
          :info="t('info')"
          :value="values.showInfo"
          :error-info="errorInfo"
          :focused="current === 'showInfo'"
          @focus="() => onFocus('showInfo')"
        />
      </demo-block>

      <div class="grid-padding" />
    </scroll-view>
    <PressNumberKeyboard
      :show="!!current"
      @close="current = null"
      @input="onInput"
      @backspace="onDelete"
    />
  </div>
</template>
<script>
import PressNumberKeyboard from 'press-ui/press-number-keyboard/press-number-keyboard.vue';

import PressPasswordInput from 'press-ui/press-password-input/press-password-input.vue';


export default {
  i18n: {
    'zh-CN': {
      info: '密码为 6 位数字',
      showInfo: '提示信息',
      addGutter: '格子间距',
      errorInfo: '密码错误',
      removeMask: '明文展示',
      customLength: '自定义长度',
    },
    'en-US': {
      info: 'Some tips',
      showInfo: 'Show Info',
      addGutter: 'Add Gutter',
      errorInfo: 'Password Mistake',
      removeMask: 'Remove Mask',
      customLength: 'Custom Length',
    },
  },
  components: {
    PressPasswordInput,
    PressNumberKeyboard,
  },
  data() {
    const img = 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png';
    return {
      current: '',
      values: {
        showInfo: '123',
        addGutter: '123',
        basicUsage: '123',
        removeMask: '123',
        customLength: '123',
      },
      errorInfo: '',

      sectionStyle: 'margin: 0;background: #f7f8fa;',
      headerStyle: 'background: #f7f8fa;',

      scrollTop: 0,
      originScrollTop: 0,

      watermark: `<h5>我是h5标签我是h5标签我是h5标签我是h5标签</h5><p style="color:#f00">我是p标签</p><br><img style="width:30px" src="${img}" />`,

    };
  },
  methods: {
    onInput(key) {
      if (!this.current) {
        return;
      }

      const maxlength = this.current === 'customLength' ? 4 : 6;
      const newValue = (this.values[this.current] + key).slice(0, maxlength);

      this.values[this.current] = newValue;

      if (
        this.current === 'showInfo'
        && newValue.length === 6
        && newValue !== '123456'
      ) {
        this.errorInfo = this.t('errorInfo');
      }
    },
    onDelete() {
      if (!this.current) {
        return;
      }

      this.values[this.current] = this.values[this.current].slice(
        0,
        this.values[this.current].length - 1,
      );

      if (this.current === 'showInfo') {
        this.errorInfo = '';
      }
    },
    onScroll(e) {
      // 直接赋值给 scrollTop 会造成微信小程序抖动
      this.originScrollTop = e.detail.scrollTop;
    },
    onFocus(value) {
      this.current = value;
      const scrollTop = this.current === 'showInfo' ? 1000 : 0;

      if (scrollTop) {
        this.scrollTop = this.originScrollTop;
        setTimeout(() => {
          this.scrollTop = scrollTop;
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
scroll-view {
  height: 100%;
}
.grid-padding {
  width: 100px;
  height: 300px;
}
</style>
