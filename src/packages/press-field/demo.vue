<template>
  <div class="wrap">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :value="value"
        :placeholder="t('placeholder')"
        :border="false"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('customType')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :value="text"
        required
        clearable
        :label="t('label')"
        icon="question-o"
        :placeholder="t('placeholder')"
        @click-icon="onClickIcon"
      />

      <press-field
        :value="tel"
        :placeholder="t('phonePlaceholder')"
        :label="t('phone')"
        required
        clearable
        type="tel"
        :border="false"
        @change="onChange"
      />


      <press-field
        :value="digit"
        :placeholder="t('digitPlaceholder')"
        :label="t('digit')"
        required
        clearable
        type="digit"
        :border="false"
        @change="onChange"
      />

      <press-field
        :value="number"
        :placeholder="t('numberPlaceholder')"
        :label="t('number')"
        required
        clearable
        type="digit"
        :border="false"
        @change="onChange"
      />

      <press-field
        :value="password"
        :placeholder="t('passwordPlaceholder')"
        :label="t('password')"
        required
        clearable
        type="password"
        :border="false"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('disabled')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :label="t('label')"
        left-icon="contact"
        disabled
        :placeholder="t('inputDisabled')"
        :border="false"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('errorInfo')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :value="username"
        :label="t('username')"
        :placeholder="t('usernamePlaceholder')"
        error
        :border="false"
        @change="onChange"
      />
      <press-field
        :value="username"
        :label="t('phone')"
        :placeholder="t('phonePlaceholder')"
        :error-message="t('phoneError')"
        :border="false"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('inputAlign')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :label="t('username')"
        :placeholder="t('usernamePlaceholder')"
        :border="false"
        input-align="right"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('autosize')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :label="t('message')"
        type="textarea"
        :placeholder="t('placeholderAutoSize')"
        :border="false"
        autosize
        @change="onChange"
      />
    </demo-block>

    <demo-block
      :title="t('insertButton')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        center
        clearable
        :label="t('sms')"
        :placeholder="t('smsPlaceholder')"
        :border="false"
        autosize
        @change="onChange"
      >
        <press-button
          slot="button"
          size="small"
          type="primary"
        >
          {{ t('sendSMS') }}
        </press-button>
      </press-field>
    </demo-block>
  </div>
</template>
<script>
import PressField from 'src/packages/press-field/press-field.vue';

export default {
  i18n: {
    'zh-CN': {
      label: '文本',
      placeholder: '请输入文本',

      message: '留言',
      autosize: '高度自适应',
      placeholderAutoSize: '请输入留言',

      text: '文本',
      digit: '整数',
      phone: '手机号',
      number: '数字',
      customType: '自定义类型',
      smsPlaceholder: '请输入短信验证码',
      textPlaceholder: '请输入文本',
      digitPlaceholder: '请输入整数',
      phonePlaceholder: '请输入手机号',
      numberPlaceholder: '请输入数字（支持小数）',

      disabled: '禁用输入框',
      inputReadonly: '输入框只读',
      inputDisabled: '输入框已禁用',

      errorInfo: '错误提示',
      phoneError: '手机号格式错误',

      inputAlign: '输入框内容对齐',
      alignPlaceHolder: '输入框内容右对齐',

      sms: '短信验证码',
      sendSMS: '发送验证码',
      insertButton: '插入按钮',
    },
    'en-US': {
      label: 'Label',
      placeholder: 'Text',

      message: 'SMS',
      autosize: 'Auto Resize',
      placeholderAutoSize: 'Message',

      text: 'Text',
      digit: 'Digit',
      phone: 'Phone',
      number: 'Number',
      customType: 'Custom Type',
      smsPlaceholder: 'SMS',
      textPlaceholder: 'Text',
      digitPlaceholder: 'Digit',
      phonePlaceholder: 'Phone',
      numberPlaceholder: 'Number',

      inputReadonly: 'Input Readonly',
      inputDisabled: 'Input Disabled',

      errorInfo: 'Error Info',
      phoneError: 'Invalid phone',

      inputAlign: 'Input Align',
      alignPlaceHolder: 'Input Align Right',

      sms: 'SMS',
      sendSMS: 'Send SMS',
      insertButton: 'Insert Button',
    },
  },
  components: {
    PressField,
  },
  data() {
    return {
      value: '',
      username: '',
      text: '',
      password: '',
      number: '',
      digit: '',
      tel: '',

      headerStyle: 'background: #f7f8fa;',
      sectionStyle: 'background: #f7f8fa;margin: 0;padding: 0;',
    };
  },
  methods: {
    onChange(val) {
      console.log('onChange.val', val);
    },
    onClickIcon() {
      console.log('onClickIcon');
    },
  },
};
</script>
<style scoped lang="scss">
@import "src/packages/base/mixin.scss";
page,
.wrap {
  background: #f7f8fa !important;
  min-height: 100%;
  padding-bottom: 20px;
}
</style>
