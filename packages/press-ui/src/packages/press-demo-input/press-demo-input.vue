<template>
  <PressDemoBlock
    :title="t('mockData')"
    :section-style="sectionStyle"
    :header-style="headerStyle"
  >
    <div class="input__wrap">
      <PressField
        v-model="inputValue"
        type="textarea"
        :autosize="autosize"
        placeholder="请输入数据"
      />
      <div class="input__buttons">
        <PressButton
          size="small"
          custom-style="margin-left: 0; margin-right: 8px"
          @click="onClearInput"
        >
          清空
        </PressButton>
        <PressButton
          type="primary"
          custom-style="margin: 0;"
          size="small"
          @click="onConfirmInput"
        >
          确定
        </PressButton>
      </div>
    </div>
  </PressDemoBlock>
</template>
<script>
import PressButton from '../press-button/press-button.vue';
import PressField from '../press-field/press-field.vue';
import PressDemoBlock from '../press-demo-block/press-demo-block.vue';


export default {
  name: 'PressDemoInput',
  i18n: {
    'zh-CN': {
      custom: '自定义',
      mockData: '自定义数据',
    },
    'en-US': {
      custom: 'Custom',
      mockData: 'Custom Data',
    },
  },
  components: {
    PressField,
    PressButton,
    PressDemoBlock,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    sectionStyle: {
      type: String,
      default: 'margin: 0;background: #f7f8fa;',
    },
    headerStyle: {
      type: String,
      default: 'background: #f7f8fa;',
    },
    autosize: {
      type: [Boolean, Object],
      default: () => ({ maxHeight: 600, minHeight: 50 }),
    },
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.inputValue = val;
      },
    },
  },
  mounted() {

  },
  methods: {
    onClearInput() {
      this.inputValue = '';
    },
    onConfirmInput() {
      this.$emit('confirm', this.inputValue);
    },
  },
};
</script>
<style scoped lang="scss">
.input__wrap {
  padding: 0 10px 20px;
}
.input__buttons {
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
}
</style>
