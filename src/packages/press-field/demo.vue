<template>
  <div class="demo-wrap demo-wrap--gray">
    <demo-block
      :title="t('basicUsage')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :value="value"
        :placeholder="t('placeholder')"
        title-width="0"
        :always-embed="true"
        :border="false"
        @change="onChange"
        @input="onInput"
        @confirm="onConfirm"
        @focus="onFocus"
        @blur="onBlur"
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
        :always-embed="true"
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
        :always-embed="true"
        @change="onChange"
      />


      <press-field
        :value="digit"
        :placeholder="t('digitPlaceholder')"
        :label="t('digit')"
        required
        clearable
        type="digit"
        :always-embed="true"
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
        :always-embed="true"
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
        :always-embed="true"
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
        :always-embed="true"
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
        :always-embed="true"
        error
        :border="false"
        @change="onChange"
      />
      <press-field
        :value="username"
        :label="t('phone')"
        :placeholder="t('phonePlaceholder')"
        :error-message="t('phoneError')"
        :always-embed="true"
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
        :always-embed="true"
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
        :always-embed="true"
        autosize
        @change="onChange"
        @linechange="onLineChange"
      />
    </demo-block>

    <demo-block
      :title="t('wordLimit')"
      :header-style="headerStyle"
      :section-style="sectionStyle"
    >
      <press-field
        :value="username"
        :label="t('username')"
        :placeholder="t('usernamePlaceholder')"
        :always-embed="true"
        :border="false"
        :show-word-limit="true"
        :maxlength="20"
        @change="onChange"
      />
      <press-field
        :label="t('message')"
        type="textarea"
        :placeholder="t('placeholderAutoSize')"
        :border="false"
        :always-embed="true"
        :show-word-limit="true"
        :maxlength="100"
        autosize
        @change="onChange"
        @linechange="onLineChange"
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
        :always-embed="true"
        autosize
        @change="onChange"
      >
        <template #button>
          <press-button
            size="small"
            type="primary"
          >
            {{ t('sendSMS') }}
          </press-button>
        </template>
      </press-field>
    </demo-block>
  </div>
</template>
<script>
import PressField from 'src/packages/press-field/press-field.vue';
import PressButton from 'src/packages/press-button/press-button.vue';

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
      phone: '号码',
      number: '数字',
      customType: '自定义类型',
      smsPlaceholder: '请输入号码',
      textPlaceholder: '请输入文本',
      digitPlaceholder: '请输入整数',
      phonePlaceholder: '请输入号码',
      numberPlaceholder: '请输入数字（支持小数）',

      disabled: '禁用输入框',
      inputReadonly: '输入框只读',
      inputDisabled: '输入框已禁用',

      errorInfo: '错误提示',
      phoneError: '号码格式错误',

      inputAlign: '输入框内容对齐',
      alignPlaceHolder: '输入框内容右对齐',

      sms: '号码',
      sendSMS: '发送号码',
      insertButton: '插入按钮',

      username: '名称',
      usernamePlaceholder: '请输入名称',
      wordLimit: '字数限制',
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
      wordLimit: 'Word Limit',
    },
  },
  components: {
    PressField,
    PressButton,
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
      // Vue3下，payload 可能为Event对象
      if (typeof val === 'string') {
        this.onGTip(`${val}`);
      }
    },
    onInput(...args) {
      console.log('[onInput]', args);
    },
    onConfirm(...args) {
      console.log('[onConfirm]', args);
    },
    onFocus(...args) {
      console.log('[onFocus]', args);
    },
    onBlur(...args) {
      console.log('[onBlur]', args);
    },
    onLineChange(...args) {
      console.log('[onLineChange]', args);
    },
    onClickIcon() {
      this.onGTip('Click Icon');
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep {
  input,
  textarea {
    font-size: 14px;
    color: #09134e;
  }
}
</style>
