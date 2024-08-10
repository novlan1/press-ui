<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        :title="t('number')"
        is-link
        @click="onShowKeyboard('number')"
      />
      <press-cell
        :title="t('accounting')"
        is-link
        @click="onShowKeyboard('accounting')"
      />
      <press-cell
        :title="t('card')"
        is-link
        @click="onShowKeyboard('card')"
      />
    </demo-block>

    <demo-block :title="t('custom')">
      <press-cell
        :title="t('withToolbar')"
        is-link
        @click="onShowKeyboard('toolbar')"
      />
      <press-cell
        :title="t('withTitle')"
        is-link
        @click="onShowKeyboard('title')"
      />
      <press-cell
        :title="t('decimalMark')"
        is-link
        @click="onShowKeyboard('decimalMark')"
      />
      <press-cell
        :title="t('random')"
        is-link
        @click="onShowKeyboard('random')"
      />
    </demo-block>

    <demo-block :title="t('bindValue')">
      <press-field
        :label="t('bindLabel')"
        :value="bindValue"
        :model-value="bindValue"
        readonly
        :clickable="true"
        :placeholder="t('input')"
        :always-embed="true"
        @click="onShowKeyboard('bindValue')"
        @click-input="onShowKeyboard('bindValue')"
      />
    </demo-block>

    <demo-block :title="t('codeValue')">
      <press-cell
        @click="onShowKeyboard('codeValue')"
      >
        <press-code-input
          :max-length="6"
          :value="codeValue"
          :disabled-keyboard="true"
        />
      </press-cell>
    </demo-block>

    <press-number-keyboard
      :mode="mode"
      :show="show"
      :toolbar="toolbar"
      :title="title"
      :decimal-mark="decimalMark"
      :random="random"
      @change="onChange"
      @backspace="onBackspace"
      @cancel="onCancel"
      @confirm="onConfirm"
      @close="onClose"
    />

    <press-number-keyboard
      v-model="bindValue"
      :mode="mode"
      :show="showBindDemo"
      :toolbar="toolbar"
      :title="title"
      :decimal-mark="decimalMark"
      :random="random"
      :max-length="6"
      @cancel="onCloseBindDemo"
      @confirm="onCloseBindDemo"
      @close="onCloseBindDemo"
    />

    <press-number-keyboard
      v-model="codeValue"
      :mode="mode"
      :show="showCodeDemo"
      :toolbar="toolbar"
      :title="title"
      :decimal-mark="decimalMark"
      :random="random"
      :max-length="6"
      @cancel="onCloseCodeDemo"
      @confirm="onCloseCodeDemo"
      @close="onCloseCodeDemo"
      @change="onChangeCode"
    />
  </div>
</template>
<script>
import PressField from 'press-ui/press-field/press-field';
import PressCodeInput from 'press-ui/press-code-input/press-code-input';
import PressNumberKeyboard from 'press-ui/press-number-keyboard/press-number-keyboard';


export default {
  i18n: {
    'zh-CN': {
      number: '数字键盘',
      accounting: '带小数点的数字键盘',
      card: '身份证键盘',

      custom: '自定义',
      withToolbar: '展示顶部栏',
      withTitle: '展示标题',
      decimalMark: '自定义小数点',
      random: '打乱顺序',

      bindValue: '配合输入框使用',
      bindLabel: '双向绑定',
      input: '点此输入',

      codeValue: '配合验证码输入使用',
    },
    'en-US': {
      number: 'Number Keyboard',
      accounting: 'Number Keyboard with Decimal Mark',
      card: 'Identity Number Keyboard',

      custom: 'Custom',
      withToolbar: 'Show Toolbar',
      withTitle: 'Show Title',
      decimalMark: 'Custom Separator Mark',
      random: 'Randomized',

      bindValue: 'Use with Field',
      bindLabel: 'Bind Value',
      input: 'Click to Input',

      codeValue: 'Use with CodeInput',
    },
  },
  components: {
    PressField,
    PressCodeInput,
    PressNumberKeyboard,
  },
  data() {
    return {
      mode: 'number',
      show: false,
      showBindDemo: false,
      showCodeDemo: false,
      toolbar: false,
      title: '',
      decimalMark: '.',
      random: false,
      bindValue: '',
      codeValue: '',
    };
  },
  methods: {
    onShowKeyboard(type) {
      let mode = 'number';
      let show = true;
      let showBindDemo = false;
      let showCodeDemo = false;
      let toolbar = false;
      let title = '';
      let decimalMark = '.';
      let random = false;
      switch (type) {
        case 'number':
          break;
        case 'accounting':
          mode = 'accounting';
          break;
        case 'card':
          mode = 'card';
          break;
        case 'toolbar':
          toolbar = true;
          break;
        case 'title':
          toolbar = true;
          title = '数字键盘';
          break;
        case 'decimalMark':
          mode = 'accounting';
          decimalMark = ',';
          break;
        case 'random':
          random = true;
          break;
        case 'bindValue':
          show = false;
          showBindDemo = true;
          break;
        case 'codeValue':
          show = false;
          showCodeDemo = true;
          break;
      }
      this.mode = mode;
      this.show = show;
      this.showBindDemo = showBindDemo;
      this.showCodeDemo = showCodeDemo;
      this.toolbar = toolbar;
      this.title = title;
      this.decimalMark = decimalMark;
      this.random = random;
    },
    onChange(val) {
      console.log(`[onChange] ${val}`);
      this.onGTip(`${val}`);
    },
    onBackspace() {
      console.log('[onBackspace]');
      this.onGTip('backspace');
    },
    onClose() {
      console.log('[onClose]');
      this.show = false;
    },
    onCancel() {
      console.log('[onCancel]');
      this.show = false;
    },
    onConfirm() {
      console.log('[onConfirm]');
      this.show = false;
    },
    onCloseBindDemo() {
      this.showBindDemo = false;
    },
    onCloseCodeDemo() {
      this.showCodeDemo = false;
    },
    onChangeCode(value) {
      console.log('[onChange] value: ', value);
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  padding-bottom: 300px;
}
</style>
